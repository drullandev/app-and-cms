import LoggerUtils from '../utils/LoggerUtils';
import DebugUtils from '../utils/DebugUtils';

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

/**
 * ServiceWorker Class
 * 
 * This class manages the registration and unregistration of a service worker in a web application.
 * It offers support for production environments with options for custom success and update handling.
 * 
 * **Key Features:**
 * 
 * 1. **Service Worker Registration**: 
 *    - Automatically registers a service worker script in production environments.
 *    - Ensures secure and valid service worker registration.
 * 
 * 2. **Service Worker Update Handling**: 
 *    - Monitors updates to the service worker and provides hooks for custom actions.
 * 
 * 3. **Development and Production Support**:
 *    - Validates service worker scripts in development, simplifying registration in production.
 * 
 * 4. **Offline Support**:
 *    - Ensures offline functionality by caching application resources.
 * 
 * **Usage:**
 * - Instantiate the `ServiceWorker` class with optional configuration.
 * - Call `register` to initiate service worker registration.
 * - Call `unregister` to remove the service worker.
 */
export class ServiceWorker {

  private inNavigator: boolean = 'serviceWorker' in navigator;
  private isProduction: boolean = process.env.NODE_ENV === 'production';
  private swUrl: string = `${process.env.PUBLIC_URL}/service-worker.js`;
  private isLocalhost: boolean = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );
  private logger: LoggerUtils;
  private debug: boolean;

  /**
   * Initializes the ServiceWorker with optional configuration.
   * Sets up logger and debug mode.
   * 
   * @param config - Optional configuration object for success and update callbacks.
   */
  constructor(private config?: Config) {
    this.debug = DebugUtils.setDebug(true); // Adjust debug mode as needed
    this.logger = LoggerUtils.getInstance(this.constructor.name, this.debug, 100);

    if (this.debug) {
      this.logger.info("ServiceWorker initialized", { config });
    }
  }

  /**
   * Registers the service worker if in a production environment and supported by the browser.
   * 
   * - Validates the service worker script by checking its origin.
   * - Attaches event listeners to manage the service worker lifecycle.
   */
  public register(): void {
    if (this.isProduction && this.inNavigator) {
      const publicUrl = new URL(
        (process as { env: { [key: string]: string } }).env.PUBLIC_URL,
        window.location.href
      );

      if (publicUrl.origin !== window.location.origin) {
        return;
      }

      window.addEventListener('load', () => {
        if (this.isLocalhost) {
          this.checkValidServiceWorker();
          navigator.serviceWorker.ready.then(() => {
            this.logger.info(
              'This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA'
            );
          });
        } else {
          this.registerValidSW();
        }
      });
    }
  }

  /**
   * Unregisters the currently active service worker.
   * 
   * - Primarily used for testing or if the service worker functionality is no longer required.
   */
  public unregister(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister();
      }).catch(error => {
        this.logger.error('Service Worker unregistration failed:', error);
      });
    }
  }

  /**
   * Registers a valid service worker and handles its lifecycle events.
   * 
   * - Monitors the `onupdatefound` event to detect when a new service worker is installing.
   * - Handles the `onstatechange` event to manage the service worker's state transitions, such as when new content is available.
   */
  private registerValidSW(): void {
    navigator.serviceWorker
      .register(this.swUrl)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                this.logger.info(
                  'New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA.'
                );
                if (this.config && this.config.onUpdate) {
                  this.config.onUpdate(registration);
                }
              } else {
                this.logger.info('Content is cached for offline use.');
                if (this.config && this.config.onSuccess) {
                  this.config.onSuccess(registration);
                }
              }
            }
          };
        };
      })
      .catch((error) => {
        this.logger.error('Error during service worker registration:', error);
      });
  }

  /**
   * Validates the service worker script by checking if it is accessible and correctly served.
   * 
   * - If the service worker script is not found or not valid, it unregisters the current service worker and reloads the page.
   */
  private checkValidServiceWorker(): void {
    fetch(this.swUrl)
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          }).catch(error => {
            this.logger.error('Service Worker unregistration failed:', error);
          });
        } else {
          this.registerValidSW();
        }
      })
      .catch(() => {
        this.logger.error('No internet connection found. App is running in offline mode.');
      });
  }
}

export default ServiceWorker;
