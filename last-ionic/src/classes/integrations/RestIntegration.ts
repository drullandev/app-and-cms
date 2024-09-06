import RestManager, { IRestManager } from '../managers/RestManager';

/**
 * The base URL for all API requests.
 * - Purpose: This is specifically configured for use with a Strapi backoffice in an Ionic application template.
 * This is configured using an environment variable, with a fallback to a default URL.
 */
const API_BASE_URL = process.env.API_URL || 'http://localhost:1337/';

/**
 * This is the single instance of RestManager that will be used throughout the application.
 * It can optionally include an authorization token if needed.
 * 
 * @param token - Optional Bearer token to be used for authorization.
 * @returns A singleton instance of RestManager.
 */
const AppRest: IRestManager = RestManager.getInstance(API_BASE_URL);

export default AppRest;
