import RestManager, { IRestManager } from "../classes/managers/RestManager";

// Strapi images location
export const apiUploads = process.env.REACT_APP_API_URL + '/uploads/'

/**
 * This is the single instance of RestManager that will be used throughout the application.
 * It can optionally include an authorization token if needed.
 *
 * @param token - Optional Bearer token to be used for authorization.
 * @returns A singleton instance of RestManager.
 */
const useAppRest: RestManager = RestManager.getInstance(
  process.env.REACT_APP_API_URL
);

export default useAppRest;
