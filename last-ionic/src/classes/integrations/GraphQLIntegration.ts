import GraphQLService, { GqlMutationModel, GqlQueryModel } from '../utils/GraphQLUtils';
import RestManager from '../managers/RestManager';
import useAppRest from './RestIntegration';  // Tomamos la instancia de RestManager desde aquí

/**
 * Interface defining the contract for GraphQLManager operations.
 * This interface ensures that the GraphQLManager can perform both GraphQL queries and mutations,
 * as well as application-specific GraphQL operations.
 */
export interface GraphQLManagerInterface {
  performCustomQuery(queryModel: GqlQueryModel): Promise<any>;
  performCustomMutation(mutationModel: GqlMutationModel): Promise<any>;
  getUserProfile(userId: string): Promise<any>;
  updateUserProfile(userId: string, profileData: any): Promise<any>;
}

/**
 * GraphQLManager class uses the instance of RestManager provided by useAppRest
 * to perform GraphQL queries and mutations. It also includes methods for application-specific
 * operations such as retrieving and updating user profiles.
 * 
 * This class leverages RestManager for making API calls, and focuses on GraphQL-specific logic.
 * 
 * @author David Rullán
 * @date September 5, 2024
 */
class GraphQLManager implements GraphQLManagerInterface {
  private restManager: RestManager;
  private graphqlService: GraphQLService;

  /**
   * Constructs an instance of GraphQLManager with the provided RestManager.
   * 
   * @param restManager - An instance of RestManager to be used for API calls.
   */
  constructor(restManager: RestManager) {
    this.restManager = restManager;
    this.graphqlService = GraphQLService.getInstance(this.restManager);
  }

  /**
   * Performs a custom GraphQL query based on the provided query model.
   * 
   * @param queryModel - The GraphQL query model containing the query details.
   * @returns A promise resolving to the result of the query.
   */
  public async performCustomQuery(queryModel: GqlQueryModel): Promise<any> {
    try {
      const response = await this.graphqlService.setQuery(queryModel);
      console.log('Custom GraphQL Query successful:', response);
      return response.data;
    } catch (error) {
      console.error('Error performing custom GraphQL query:', error);
      throw error;
    }
  }

  /**
   * Performs a custom GraphQL mutation based on the provided mutation model.
   * 
   * @param mutationModel - The GraphQL mutation model containing the mutation details.
   * @returns A promise resolving to the result of the mutation.
   */
  public async performCustomMutation(mutationModel: GqlMutationModel): Promise<any> {
    try {
      const response = await this.graphqlService.getMutation(mutationModel);
      console.log('Custom GraphQL Mutation successful:', response);
      return response.data;
    } catch (error) {
      console.error('Error performing custom GraphQL mutation:', error);
      throw error;
    }
  }

  /**
   * Retrieves the user profile using a GraphQL query for a given user ID.
   * 
   * @param userId - The ID of the user whose profile needs to be fetched.
   * @returns A promise resolving to the user's profile data.
   */
  public async getUserProfile(userId: string): Promise<any> {
    const queryModel: GqlQueryModel = {
      model: 'User',
      paginator: { limit: 1, start: 0 },
      where: [{ type: 'string', key: 'id', action: 'eq', value: userId }],
      filter: {},
      struct: { id: true, username: true, email: true, profile: true },
      sort: 'createdAt',
      searchString: '',
      orderField: 'createdAt',
      searchOrder: 'ASC',
      filterField: '',
      filterCondition: '',
      direction: 'ASC'
    };
    return this.performCustomQuery(queryModel);
  }

  /**
   * Updates the user profile using a GraphQL mutation for a given user ID.
   * 
   * @param userId - The ID of the user whose profile needs to be updated.
   * @param profileData - The new profile data to update for the user.
   * @returns A promise resolving to the updated user profile data.
   */
  public async updateUserProfile(userId: string, profileData: any): Promise<any> {
    const mutationModel: GqlMutationModel = {
      model: 'User',
      action: 'update',
      data: {
        input: { id: userId, ...profileData },
        output: { id: true, username: true, email: true, profile: true }
      }
    };
    return this.performCustomMutation(mutationModel);
  }
}

/**
 * Function to create an instance of GraphQLManager with optional authorization token.
 * 
 * @param token - Optional. The Bearer token to be used for authorization.
 * @returns An instance of GraphQLManager configured for GraphQL operations.
 */
// TODO: Revisar
//export const AppGraphQLManager = (token?: string): GraphQLManager => {
  //const restManager = useAppRest; // Reutilizamos la instancia de RestManager desde useAppRest
  //return new GraphQLManager();
//};

//export default AppGraphQLManager;


