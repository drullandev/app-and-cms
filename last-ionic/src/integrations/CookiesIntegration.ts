import CookieManager from "../classes/managers/CookieManager";

/**
 * Interface defining the contract for CookieManager operations.
 * This interface ensures that the CookieManager can handle cookie management consistently.
 */
export interface CookieManagerInterface {
  // Define methods if any are needed, e.g., getCookie, setCookie, deleteCookie
}

/**
 * The domain and path settings for cookie management.
 * - Purpose: These settings specify where cookies should be managed. 
 * - The domain is set to '.example.com' and the path is set to '/app'.
 */
const COOKIE_DOMAIN =  process.env.API_URL || 'http://localhost:1337/';
const COOKIE_PATH = process.env.COOKIE_PATH || '/';

/**
 * Creates and exports an instance of CookieManager configured with the specified domain and path.
 * 
 * @returns An instance of CookieManager configured with the domain and path settings.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date August 30, 2024
 */
export const cookies = new CookieManager(COOKIE_DOMAIN, COOKIE_PATH);

export default cookies;