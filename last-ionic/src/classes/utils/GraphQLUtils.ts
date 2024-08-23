import RestUtils from '../utils/RestUtils';
import { AxiosRequestConfig } from 'axios';
import StringUtil from '../StringUtil';
import { useTranslation } from 'react-i18next';
import DebugUtil from './DebugUtils';

const debug = DebugUtil.setDebug(false);

export interface WhereProps {
  type: string;
  key: string;
  action: string;
  value: string;
}

export interface PaginatorProps {
  limit: number;
  start: number;
}

export interface GqlMutationModel {
  model?: string;
  action?: string;
  data?: {
    input?: {
      identifier?: string;
      password?: string;
    };
    output?: any;
  };
}

export interface GqlQueryModel {
  model: string;
  paginator: PaginatorProps;
  where: WhereProps[];
  filter: any;
  struct: any;
  sort: string;
  searchString: string;
  orderField: string;
  searchOrder: string;
  filterField: string;
  filterCondition: string;
  direction: string;
}

export interface CallProps {
  req: AxiosRequestConfig;
  onSuccess: Function;
  onError: Function;
  onFinally?: Function;
}

export class GraphQLService {

  // Generates a GraphQL mutation query string and performs the mutation
  public getMutation = (p: GqlMutationModel): any => {
    return this.graphqlCall(this.setMutation(p));
  };

  // Asynchronously generates a GraphQL mutation query string and performs the mutation
  public getMutationAsync = async (p: GqlMutationModel): Promise<any> => {
    return await this.graphqlCallAsync(this.setMutation(p));
  };

  // Constructs the GraphQL mutation query string based on the provided mutation model
  private setMutation = (p: GqlMutationModel): string => {
    let qs = `mutation {\t`;

    // Determine the mutation action and model
    if (p.model !== undefined && p.action !== undefined) {
      qs += StringUtil.camelCase(p.action + ' ' + p.model);
    } else if (p.action) {
      qs += StringUtil.camelCase(p.action);
    } else if (p.model) {
      qs += p.model;
    }

    // Add input data if provided
    if (p.data?.input !== undefined) {
      let inputString = '';
      qs += '(input:';
      Object.entries(p.data?.input).forEach(([key, value]) => {
        inputString += ` ${key}: `;
        inputString += typeof value === 'boolean' ? `${value},` : `"${value}",`;
      });
      qs += '{ ' + inputString.replace(/,+$/, '') + ' }';
      qs += ')';
    }

    // Add output fields if provided
    if (p.data?.output !== undefined) {
      if (p.data.output) {
        qs += JSON.stringify(p.data?.output, null, ' ')
          .replace(/number|string|date|true|,/g, '')
          .replace(/[":]/g, '');
      }
    }

    qs += `}`;
    return qs;
  };

  // Generates a GraphQL query string and performs the query
  public setQuery = (p: GqlQueryModel): any => {
    return this.graphqlCall(this.getQuery(p));
  };

  // Constructs the GraphQL query string based on the provided query model
  private getQuery = (p: GqlQueryModel): string => {
    let qs = `query `;

    qs += p.model + ` {\n\t` + p.model;
    qs += `( `;

    // Add pagination if provided
    if (p.paginator) {
      qs += JSON.stringify(p.paginator, null, '')
        .replace(',', ', ')
        .replace(/["{}]/g, '');
    }

    // Add where conditions if provided
    const where: string[] = [];
    if (!StringUtil.empty(p.where)) {
      p.where.map((row: any) => {
        if (row.value !== undefined && row.value !== '') {
          let whereType = row.value;
          switch (row.type) {
            case 'string':
              whereType = '["' + whereType + '"]';
              where.push(row.key + '_' + row.action + ' : ' + whereType);
              break;
            case 'array':
              // Assuming row.value is an array
              const stringedWhere = (row.value as string[]).join(',');
              whereType = '["' + stringedWhere + '"]';
              where.push(row.key + '_' + row.action + ' : ' + whereType);
              break;
            default:
              whereType = '["' + whereType + '"]';
              where.push(row.key + '_' + row.action + ' : ' + whereType);
              break;
          }
        }
      });
    }

    // Add filter conditions if provided
    if (p.filterField !== undefined) {
      if (p.filterCondition !== undefined && typeof p.searchString !== undefined) {
        where.push(p.filterField + '_' + p.filterCondition + ' : ' + p.searchString);
      }
    }

    // Include where clause if any conditions are present
    if (!StringUtil.empty(where)) qs += ', where: { ' + where.join(',') + ' }';

    // Add sorting details
    qs += `, sort: "` + p.orderField + `:` + (p.searchOrder ? p.searchOrder : p.direction) + `"`;

    qs += ` )`;

    // Add the structure of the query result
    if (p.struct) {
      qs += JSON.stringify(p.struct, null, '\t')
        .replace(/number|string|date/g, '')
        .replace(/[":]/g, '')
        .replace(',', ',');
    }

    qs += `\n}`;
    return qs;
  };

  // Performs a synchronous GraphQL call for both mutations and queries
  private graphqlCall = (call: string): any => {
    return RestUtils.restCall({
      req: {
        method: 'POST',
        url: 'graphql',
        data: { query: `${call}` }
      },
      onSuccess: {
        default: () => { }
      },
      onError: {
        default: () => { }
      }
    });
  };

  // Performs an asynchronous GraphQL call for both mutations and queries
  private graphqlCallAsync = async (call: string): Promise<any> => {
    return await RestUtils.restCallAsync({
      req: {
        method: 'POST',
        url: 'graphql',
        data: { query: `${call}` }
      },
      onSuccess: {
        default: () => { }
      },
      onError: {
        default: () => { }
      }
    });
  };
}

// Example usage of the GraphQLService class
const gqlService = new GraphQLService();

const mutationModel: GqlMutationModel = {
  model: 'User',
  action: 'create',
  data: {
    input: {
      identifier: 'exampleUser',
      password: 'password123'
    }
  }
};

// Execute a mutation asynchronously and handle the response
gqlService.getMutationAsync(mutationModel).then(response => {
  console.log(response);
}).catch(error => {
  console.error(error);
});

const queryModel: GqlQueryModel = {
  model: 'User',
  paginator: { limit: 10, start: 0 },
  where: [],
  filter: {},
  struct: {},
  sort: 'createdAt',
  searchString: '',
  orderField: 'createdAt',
  searchOrder: 'ASC',
  filterField: '',
  filterCondition: '',
  direction: 'ASC'
};

// Execute a query and handle the response
gqlService.setQuery(queryModel);
