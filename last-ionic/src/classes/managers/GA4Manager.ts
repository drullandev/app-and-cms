import LoggerClass from "../utils/LoggerUtils";

/**
 * GA4Manager is a utility class for managing Google Analytics 4 (GA4) tracking.
 * It provides methods to send events and pageviews to GA4.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 30, 2024
 */
class GA4Manager {
  private trackingId: string;
  private initialized: boolean = false;
  private logger: LoggerClass;

  /**
   * Constructs a new GA4Manager instance with the specified tracking ID.
   *
   * @param trackingId - The GA4 tracking ID to be used for sending data.
   */
  constructor(trackingId: string) {
    if (!trackingId) {
      throw new Error("Tracking ID must be provided.");
    }
    this.trackingId = trackingId;
    this.logger = LoggerClass.getInstance(this.constructor.name);
    this.initializeGA4();
  }

  /**
   * Initializes GA4 by loading the GA4 script and configuring the global `gtag` function.
   */
  private initializeGA4(): void {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackingId}`;
    script.async = true;
    script.onload = () => {
      // Ensure that gtag is properly set up
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag = function () {
        (window as any).dataLayer.push(arguments);
      };
      (window as any).gtag("js", new Date());
      (window as any).gtag("config", this.trackingId);
      this.initialized = true;
      this.logger.info("GA4 initialized successfully.");
    };
    script.onerror = () => {
      this.logger.error("Failed to load GA4 script.");
    };
    document.head.appendChild(script);
  }

  /**
   * Sends a pageview event to GA4.
   *
   * @param pagePath - The path of the page being viewed.
   * @param pageTitle - Optional. The title of the page being viewed.
   */
  public sendPageView(pagePath: string, pageTitle?: string): void {
    if (this.initialized) {
      (window as any).gtag("event", "page_view", {
        page_path: pagePath,
        page_title: pageTitle,
      });
      this.logger.info(`Pageview sent for ${pagePath} with title ${pageTitle}.`);
    } else {
      this.logger.warn("GA4 is not initialized yet.");
    }
  }

  /**
   * Sends a custom event to GA4.
   *
   * @param eventName - The name of the event.
   * @param eventParams - Optional. An object containing additional parameters for the event.
   */
  public sendEvent(
    eventName: string,
    eventParams: { [key: string]: any } = {}
  ): void {
    if (this.initialized) {
      (window as any).gtag("event", eventName, eventParams);
      this.logger.info(`Event sent: ${eventName}`, eventParams);
    } else {
      this.logger.warn("GA4 is not initialized yet.");
    }
  }
}

export default GA4Manager;
