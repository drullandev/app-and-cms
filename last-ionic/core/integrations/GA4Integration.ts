import GA4Manager from "../classes/managers/GA4Manager";

/**
 * Creates and exports an instance of GA4Manager configured with the specified tracking ID.
 *
 * @returns An instance of GA4Manager configured with the tracking ID settings.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 30, 2024
 */
const useGA4Tracker = (process.env.NODE_ENV === 'production' && process.env.REACT_APP_GA4_TRACKING_ID != '') 
  ? new GA4Manager(process.env.REACT_APP_GA4_TRACKING_ID)
  : new GA4Manager();

export default useGA4Tracker;
