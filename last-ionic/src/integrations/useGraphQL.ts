import GraphQLManager from "../classes/managers/GraphQLManager";
import { RestManager } from '../classes/managers/RestManager';
import { graphqlUrl } from '../app/config/env';
import axios from "axios";

/**
 * Creates a singleton instance of RestManager configured for GraphQL operations.
 * This instance is separated from the global useAppRest to avoid conflicts.
 * 
 * Updates the Authorization header with the JWT token for authenticated requests.
 * 
 * @returns A singleton instance of RestManager for GraphQL operations.
 */
export const useGraphQLRest = (): RestManager => {
  const graphQlIntance = axios.create({
    baseURL: graphqlUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return RestManager.getInstance(graphQlIntance);
};

/**
 * Function to create an instance of GraphQLManager with authorization token.
 *
 * @returns An instance of GraphQLManager configured for GraphQL operations.
 */
export const useGraphQL = (): GraphQLManager => {
  return GraphQLManager.getInstance(useGraphQLRest());
};

export default useGraphQL();
