import RestManager, { CallProps } from '../classes/managers/RestManager';

/**
 * Interface defining the contract for RestManager operations.
 * This interface ensures that the RestManager can perform both synchronous and asynchronous REST API calls.
 */
export interface RestManagerInterface {
  makeAsyncCall(call: CallProps): Promise<void>;
  makeCall(call: CallProps): Promise<void>;
}

/**
 * The base URL for CRM API requests.
 * - Purpose: This URL is specifically configured for use with a CRM system in an Ionic application.
 * It is set using an environment variable, with a fallback to a default local URL.
 */
const CRM_API_BASE_URL = process.env.CRM_API_URL || 'http://localhost:1337/';

/**
 * Retrieves an instance of RestManager configured for CRM operations, with an optional Bearer token for authorization.
 * This function allows for the dynamic inclusion of authorization headers when making CRM-related API requests.
 * 
 * @param token - Optional. The Bearer token to be used for authorization. If provided, 
 *                it will be included in the Authorization header of the requests.
 * @returns An instance of RestManagerInterface configured for CRM operations with the base URL and optional authorization header.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date August 31, 2024
 */
export const mainCrm = (token?: string): RestManagerInterface => {
  // If a token is provided, include it in the Authorization header
  return token
    ? RestManager.getInstance(CRM_API_BASE_URL, {
        'Authorization': `Bearer ${token}`,
      })
    : RestManager.getInstance(CRM_API_BASE_URL);
};

export default mainCrm();
