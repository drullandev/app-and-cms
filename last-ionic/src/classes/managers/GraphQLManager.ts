import { RestManager, IRestManager } from './RestManager';
import { AxiosRequestConfig } from 'axios';
import StringUtil from '../utils/StringUtil';

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

/**
 * Utility class for performing GraphQL operations, including
 * mutations and queries with proper error handling and support for
 * GraphQL variables.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 5, 2024
 */
export class GraphQLManager {
  private static instance: GraphQLManager | null = null;
  private restManager: IRestManager;

  /**
   * Returns the single instance of GraphQLManager.
   * @param restManager - An instance of a class implementing IRestManager.
   * @returns {GraphQLManager} The singleton instance.
   */
  public static getInstance(restManager: RestManager): GraphQLManager {
    if (!this.instance) {
      this.instance = new this(restManager);
    }
    return this.instance;
  }

  // Constructor accepts an IRestManager instance
  constructor(restManager: IRestManager) {
    this.restManager = restManager;
  }

  /**
   * Generates a GraphQL mutation query string and performs the mutation.
   * @param {GqlMutationModel} p - The mutation model.
   * @returns The result of the mutation.
   */
  public getMutation = async (p: GqlMutationModel): Promise<any> => {
    const mutation = this.setMutation(p);
    return await this.graphqlCallAsync(mutation);
  };

  /**
   * Generates a GraphQL mutation query string with variables and performs the mutation.
   * @param {GqlMutationModel} p - The mutation model.
   * @param {any} variables - The variables for the GraphQL mutation.
   * @returns The result of the mutation.
   */
  public getMutationWithVariables = async (p: GqlMutationModel, variables: any): Promise<any> => {
    const mutation = `mutation MyMutation($input: MyInputType!) {
      ${p.action}(input: $input) {
        field1
        field2
      }
    }`;
    return await this.graphqlCallAsync(mutation, variables);
  };

  /**
   * Constructs the GraphQL mutation query string based on the provided mutation model.
   * @param {GqlMutationModel} p - The mutation model.
   * @returns {string} The mutation query string.
   */
  private setMutation = (p: GqlMutationModel): string => {
    let qs = `mutation {`;

    const actionModel = p.model && p.action ? StringUtil.camelCase(`${p.action} ${p.model}`) : p.model || p.action || '';
    qs += actionModel;

    if (p.data?.input) {
      const inputString = Object.entries(p.data.input)
        .map(([key, value]) => `${key}: ${typeof value === 'boolean' ? value : `"${value}"`}`)
        .join(', ');
      qs += `(input: { ${inputString} })`;
    }

    if (p.data?.output) {
      const outputString = JSON.stringify(p.data.output, null, ' ').replace(/number|string|date|true|,/g, '').replace(/[":]/g, '');
      qs += ` { ${outputString} }`;
    }

    return qs + `}`;
  };

  /**
   * Generates a GraphQL query string and performs the query.
   * @param {GqlQueryModel} p - The query model.
   * @returns The result of the query.
   */
  public setQuery = async (p: GqlQueryModel): Promise<any> => {
    const query = this.getQuery(p);
    return await this.graphqlCallAsync(query);
  };

  /**
   * Constructs the GraphQL query string based on the provided query model.
   * @param {GqlQueryModel} p - The query model.
   * @returns {string} The query string.
   */
  private getQuery = (p: GqlQueryModel): string => {
    let qs = `query ${p.model} {\n\t${p.model}(`;

    if (p.paginator) {
      qs += JSON.stringify(p.paginator, null, '')
        .replace(',', ', ')
        .replace(/["{}]/g, '');
    }

    const where: string[] = [];
    if (!StringUtil.empty(p.where)) {
      p.where.forEach((row: any) => {
        if (row.value) {
          let whereType = row.type === 'string' ? `"${row.value}"` : row.value;
          where.push(`${row.key}_${row.action}: ${whereType}`);
        }
      });
    }

    if (p.filterField && p.filterCondition) {
      where.push(`${p.filterField}_${p.filterCondition}: "${p.searchString}"`);
    }

    if (!StringUtil.empty(where)) {
      qs += `, where: { ${where.join(',')} }`;
    }

    qs += `, sort: "${p.orderField}:${p.searchOrder || p.direction}" )`;

    if (p.struct) {
      qs += JSON.stringify(p.struct, null, '\t')
        .replace(/number|string|date/g, '')
        .replace(/[":]/g, '')
        .replace(',', ',');
    }

    qs += `\n}`;
    return qs;
  };

  /**
   * Performs an asynchronous GraphQL call for both mutations and queries.
   * @param {string} call - The GraphQL query or mutation string.
   * @param {any} variables - The variables for the GraphQL call (optional).
   * @returns The result of the GraphQL call.
   */
  private graphqlCallAsync = async (call: string, variables?: any): Promise<any> => {
    try {
      const response = await this.restManager.post('graphql', { query: call, variables })
        .then(()=>{

        });
      return response;
    } catch (error) {
      throw new Error("GraphQL call failed: " + error);
    }
  };
}

export default GraphQLManager;
