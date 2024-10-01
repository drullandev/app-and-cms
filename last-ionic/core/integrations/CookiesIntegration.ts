import CookieManager, { ICookieManager } from "../classes/managers/CookieManager";
import { storageKey } from '../app/config/env'

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
export const useCookies : ICookieManager = CookieManager.getInstance(
  process.env.REACT_APP_HOST_URL,
  process.env.REACT_APP_COOKIE_PATH
);

export default useCookies;
