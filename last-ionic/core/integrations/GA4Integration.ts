import GA4Manager from "../classes/managers/GA4Manager";
import { storageKey } from '../app/config/env'

/**
 * Creates and exports an instance of GA4Manager configured with the specified tracking ID.
 *
 * @returns An instance of GA4Manager configured with the tracking ID settings.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 30, 2024
 */
const useGA4Tracker = (import.meta.env.NODE_ENV === 'production' && import.meta.env.VITE_GA4_TRACKING_ID != '') 
  ? new GA4Manager(import.meta.env.VITE_GA4_TRACKING_ID)
  : new GA4Manager();

export default useGA4Tracker;
