import { GA4Event } from '../interfaces/GA4';
import Logger from './LoggerClass';

class GA4Tracker {
  
  private trackingId: string;

  constructor(trackingId: string) {
    if (!trackingId) {
      throw new Error('A valid tracking ID must be provided.');
    }
    this.trackingId = trackingId;
  }

  /**
   * Send an event to GA4.
   * @param select - The key to select the specific event.
   * @param events - An object containing the event details.
   */
  public trackEvent(select: string, events?: { [key: string]: any }): void {
    if (events) {
      const event = events[select];
      // TODO: Temporary blocked, unblock in advance: was to be able to build ^^
      /*
      if (typeof window !== 'undefined' && event && window.gtag) {
        window.gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          send_to: this.trackingId
        });
        Logger.log(` • Event tracked: ${JSON.stringify(event)}`);
      } else {
        Logger.error(' • GA4 is not initialized or gtag function is not available, or the event is not found.');
      }
      */
    }
  }
}

export default new GA4Tracker('YOUR_GA4_TRACKING_ID');
