import GA4Manager from "../managers/GA4Manager";

/**
 * Creates and exports an instance of GA4Manager configured with the specified tracking ID.
 * 
 * @returns An instance of GA4Manager configured with the tracking ID settings.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date August 30, 2024
 */
export const useGA4Tracker = new GA4Manager(process.env.REACT_APP_GA4_TRACKING_ID);

export default useGA4Tracker;
