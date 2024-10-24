import GA4Manager from "../classes/managers/GA4Manager";
import { ga4TrackingId, nodeEnv } from '../app/config/env'

/**
 * Creates and exports an instance of GA4Manager configured with the specified tracking ID.
 *
 * @returns An instance of GA4Manager configured with the tracking ID settings.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 30, 2024
 */
const useGA4Tracker = (nodeEnv === 'production' && ga4TrackingId != '') 
  ? new GA4Manager(ga4TrackingId)
  : new GA4Manager();

export default useGA4Tracker;
