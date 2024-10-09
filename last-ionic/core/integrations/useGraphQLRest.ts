import RestManager from '../classes/managers/RestManager';
import { apiUrl } from '../app/config/env';
import useUserStore from '../integrations/stores/user.store';

/**
 * Creates a singleton instance of RestManager configured for GraphQL operations.
 * This instance is separated from the global useAppRest to avoid conflicts.
 * 
 * Updates the Authorization header with the JWT token from Zustand store.
 * 
 * @returns A singleton instance of RestManager for GraphQL operations.
 */
export const useGraphQLRest = (): RestManager => {
  // Accede al JWT directamente desde Zustand sin hooks
  const jwt = null;//useUserStore.getState().jwt;

  const graphQLRestInstance = RestManager.getInstance(`${apiUrl}/graphql`);

  // Actualiza los headers con el token JWT
  if (jwt) {
    graphQLRestInstance.updateHeaders({ Authorization: `Bearer ${jwt}` });
  } else {
    graphQLRestInstance.updateHeaders({ Authorization: '' });
  }

  return graphQLRestInstance;
};
