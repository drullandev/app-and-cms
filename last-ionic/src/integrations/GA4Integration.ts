import GA4Manager from "../classes/managers/GA4Manager";

/**
 * Interface defining the contract for GA4Manager operations.
 * This interface ensures that the GA4Manager can handle Google Analytics 4 tracking consistently.
 */
export interface GA4ManagerInterface {
  sendPageview(pagePath: string, pageTitle?: string): void;
  sendEvent(eventName: string, eventParams?: { [key: string]: any }): void;
}

/**
 * The GA4 tracking ID settings for analytics.
 * - Purpose: This setting specifies the GA4 tracking ID to be used for sending data.
 * - The tracking ID is fetched from environment variables for configuration flexibility.
 */
const GA4_TRACKING_ID = process.env.GA4_TRACKING_ID || 'YOUR_DEFAULT_GA4_TRACKING_ID';

/**
 * Creates and exports an instance of GA4Manager configured with the specified tracking ID.
 * 
 * @returns An instance of GA4Manager configured with the tracking ID settings.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date August 30, 2024
 */
export const GA4Tracker = new GA4Manager(GA4_TRACKING_ID);

export default GA4Tracker;
