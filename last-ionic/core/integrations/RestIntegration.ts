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

const apiUrl = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_API_PORT}`;

const useAppRest: RestManager = RestManager.getInstance(apiUrl);

export default useAppRest;
