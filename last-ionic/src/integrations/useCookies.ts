import CookieManager, { ICookieManager } from "../classes/managers/CookieManager";
import {appUrl, cookiePath, homePath,  } from '../app/config/env'

/**
 * Interface defining the contract for CookieManager operations.
 * This interface ensures that the CookieManager can handle cookie management consistently.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 30, 2024
 */
/**
 * Creates and exports an instance of CookieManager configured with the specified domain and path.
 *
 * @returns An instance of CookieManager configured with the domain and path settings.
 */
export const useCookies : ICookieManager = CookieManager.getInstance(homePath?.path, cookiePath);

export default useCookies;
