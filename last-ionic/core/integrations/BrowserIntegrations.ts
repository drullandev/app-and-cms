import BrowserManager from "../classes/managers/BrowserManager";

/**
 * Creates and exports an instance of BrowserManager configured with the specified expiry time and cleanup interval.
 *
 * @returns An instance of BrowserManager configured with the expiry time and cleanup interval settings.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 31, 2024
 */
const useBrowser = BrowserManager.getInstance(process.env.REACT_APP_NAME);

export default useBrowser;
