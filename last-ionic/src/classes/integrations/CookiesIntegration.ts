import CookieManager from "../managers/CookieManager";

/**
 * Interface defining the contract for CookieManager operations.
 * This interface ensures that the CookieManager can handle cookie management consistently.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 30, 2024
 */
export interface CookieManagerInterface {
  // Define methods if any are needed, e.g., getCookie, setCookie, deleteCookie
}

/**
 * Creates and exports an instance of CookieManager configured with the specified domain and path.
 * 
 * @returns An instance of CookieManager configured with the domain and path settings.
 */
export const useCookies = CookieManager.getInstance(process.env.REACT_APP_HOST_URL, process.env.REACT_APP_COOKIE_PATH);

export default useCookies;