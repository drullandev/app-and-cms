//import { GA4Event } from '../interfaces/GA4';
import Logger from '../utils/LoggerUtils';

export interface GA4Event {
  category: string, // Categoría del evento (puede ser cualquier nombre relevante)
  action: string, // Acción realizada (por ejemplo, 'Clic en botón')
  label?: string, // Etiqueta opcional para detalles adicionales
}

export interface GA4Options {
  load?: GA4Event;
  submit?: FormEventsProps
}

export interface FormEventsProps {
  succcess: GA4Event;
  error: GA4Event;
}

class GA4Integration {
  
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

const GA4Tracker = new GA4Integration('YOUR_GA4_TRACKING_ID');

export default GA4Tracker;