import RestManager, { CallProps } from '../managers/RestManager';

/**
 * The base URL for all API requests.
 * - Purpose: This is specifically configured for use with a Strapi backoffice in an Ionic application template.
 * This is configured using an environment variable, with a fallback to a default URL.
 */
const API_BASE_URL = process.env.API_URL || 'http://localhost:1337/';

/**
 * Interface defining the contract for RestManager operations.
 * This interface ensures that the RestManager can perform both synchronous and asynchronous REST API calls.
 */
export interface RestManagerInterface {
  makeAsyncCall(call: CallProps): Promise<void>;
  makeCall(call: CallProps): Promise<void>;
}

/**
 * Retrieves an instance of RestManager with an optional Bearer token for authorization.
 * This function allows for dynamic inclusion of authorization headers when making API requests.
 * 
 * @param token - Optional. The Bearer token to be used for authorization. If provided, 
 *                it will be included in the Authorization header of the requests.
 * @returns An instance of RestManagerInterface configured with the base URL and optional authorization header.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date Agoust 31, 2024
 */
export const AppRest = (token?: string): RestManager => {
  // TODO: Well, get the token from zustand jijij well... In another moment!
  // If a token is provided, include it in the Authorization header
  return token
    ? RestManager.getInstance(API_BASE_URL, {
        'Authorization': `Bearer ${token}`,
      })
    : RestManager.getInstance(API_BASE_URL);
};

export default AppRest;
