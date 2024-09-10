import GraphQLManager from "../managers/GraphQLManager";
import useAppRest from "./RestIntegration"; // Tomamos la instancia de RestManager desde aquí

/**
 * Function to create an instance of GraphQLManager with optional authorization token.
 *
 * @param token - Optional. The Bearer token to be used for authorization.
 * @returns An instance of GraphQLManager configured for GraphQL operations.
 */
export const useGraphQL = (token?: string): GraphQLManager => {
  return GraphQLManager.getInstance(useAppRest);
};

export default useGraphQL;
