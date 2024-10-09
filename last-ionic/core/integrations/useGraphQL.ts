import GraphQLManager from "../classes/managers/GraphQLManager";
import RestManager from '../classes/managers/RestManager';
import { apiUrl } from '../app/config/env';

/**
 * Creates a singleton instance of RestManager configured for GraphQL operations.
 * This instance is separated from the global useAppRest to avoid conflicts.
 * 
 * Updates the Authorization header with the JWT token for authenticated requests.
 * 
 * @returns A singleton instance of RestManager for GraphQL operations.
 */
export const useGraphQLRest = (): RestManager => {
  
  const jwt = null;//useUserStore((state) => state.jwt);  // Obtén el JWT del store

  const graphQLRestInstance = RestManager.getInstance(`${apiUrl}/graphql`);  // Instancia para GraphQL

    if (jwt) {
      graphQLRestInstance.updateHeaders({ Authorization: `Bearer ${jwt}` });  // Actualiza el header con el token
    } else {
      graphQLRestInstance.updateHeaders({ Authorization: '' });  // Limpia el header si no hay token
    }


  return graphQLRestInstance;
};

/**
 * Function to create an instance of GraphQLManager with authorization token.
 *
 * @returns An instance of GraphQLManager configured for GraphQL operations.
 */
export const useGraphQL = (): GraphQLManager => {
  return GraphQLManager.getInstance(useGraphQLRest());
};

export default useGraphQL;