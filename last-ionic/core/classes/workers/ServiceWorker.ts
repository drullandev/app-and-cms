import LoggerUtils from '../utils/LoggerUtils';
import DebugUtils from '../utils/DebugUtils';

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: any) => void;
};

type CacheOptions = {
  cacheName?: string;
  cacheDuration?: number; // In milliseconds
};

/**
 * ServiceWorker Class
 * 
 * This class manages the registration, lifecycle, and updates of service workers in a web application.
 * It supports cache management, push notifications, service worker updates, and offline fallbacks.
 * 
 * **Key Features:**
 * 
 * 1. **Service Worker Registration**:
 *    - Registers and manages the lifecycle of service workers in production environments.
 * 
 * 2. **Cache Management**:
 *    - Supports advanced cache strategies and clears old caches upon service worker updates.
 * 
 * 3. **Push Notifications**:
 *    - Enables the service worker to handle push notifications with support for public keys.
 * 
 * 4. **Service Worker Updates**:
 *    - Allows forcing immediate updates to service workers without waiting for page refreshes.
 * 
 * 5. **Offline Fallbacks**:
 *    - Provides an offline fallback mechanism if the service worker fails to install or load.
 * 
 * 6. **Error Handling**:
 *    - Customizable error handling through provided callbacks.
 * 
 * **Usage:**
 * - Instantiate the `ServiceWorker` class with optional configuration and URL.
 * - Use methods like `register`, `unregister`, `cacheResources`, and `registerForPushNotifications`.
 * 
 * @author
 * David Rullán - https://github.com/drullandev
 * @date September 2024
 */
export class ServiceWorker {
  private inNavigator: boolean = 'serviceWorker' in navigator;
  private isProduction: boolean = import.meta.env.NODE_ENV === 'production';
  private swUrl: string;
  private isLocalhost: boolean = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );
  private logger: LoggerUtils;
  private debug: boolean;

  /**
   * Initializes the ServiceWorker with optional configuration, service worker URL, and debug mode.
   * 
   * @param config - Optional configuration object for success, update, and error callbacks.
   * @param swUrl - Optional URL of the service worker script.
   * @param debug - Optional boolean to enable or disable debug logging.
   */
  constructor(private config?: Config, swUrl?: string, debug?: boolean) {
    this.debug = DebugUtils.setDebug(debug ?? false);
    this.logger = LoggerUtils.getInstance( this.debug, this.constructor.name);
    this.swUrl = swUrl || `${import.meta.env.PUBLIC_URL}/service-worker.js`;

    {
      this.logger.info("ServiceWorker initialized", { config });
    }
  }

  /**
   * Registers the service worker if in a production environment and supported by the browser.
   * Attaches event listeners for lifecycle management, including updates and caching strategies.
   */
  public register(): void {
    if (this.isProduction && this.inNavigator) {
      window.addEventListener('load', () => {
        if (this.isLocalhost) {
          this.checkValidServiceWorker();
        } else {
          this.registerValidSW();
        }
      });
    }
  }

  /**
   * Unregisters the currently active service worker.
   * Mainly used for testing purposes or if the service worker functionality is no longer required.
   */
  public async unregister(): Promise<void> {
    if (this.inNavigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await registration.unregister();
      } catch (error) {
        this.handleError(error, 'Service Worker unregistration failed');
      }
    }
  }

  /**
   * Registers a valid service worker and handles its lifecycle events.
   * If a new service worker is detected, old caches are cleared, and content is refreshed.
   */
  private async registerValidSW(): Promise<void> {
    try {
      const registration = await navigator.serviceWorker.register(this.swUrl);
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                this.logger.info('New content is available. Close all tabs to update.');
                this.config?.onUpdate?.(registration);
                this.clearOldCaches(); // Clears old caches after update
              } else {
                this.logger.info('Content is cached for offline use.');
                this.config?.onSuccess?.(registration);
              }
            }
          };
        }
      };
    } catch (error) {
      this.logger.warn('Service worker registration failed, loading fallback...');
      this.loadOfflineFallback();
      this.handleError(error, 'Error during service worker registration');
    }
  }

  /**
   * Validates the service worker script by checking if it is accessible and correctly served.
   * Unregisters the current service worker if the script is not found or not valid.
   */
  private async checkValidServiceWorker(): Promise<void> {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch(this.swUrl, { signal });
      const contentType = response.headers.get('content-type');
      if (response.status === 404 || (contentType && !contentType.includes('javascript'))) {
        const registration = await navigator.serviceWorker.ready;
        await registration.unregister();
        window.location.reload();
      } else {
        this.registerValidSW();
      }
    } catch (error) {
      if (signal.aborted) {
        this.logger.warn('Request aborted');
      } else {
        this.handleError(error, 'No internet connection found. App is running in offline mode.');
      }
    }
  }

  /**
   * Handles errors during service worker registration and other operations.
   * Uses the custom error callback if provided, otherwise logs the error.
   * 
   * @param error - The error encountered.
   * @param message - A custom message to log with the error.
   */
  private handleError(error: any, message: string): void {
    if (this.config?.onError) {
      this.config.onError(error);
    } else {
      this.logger.error(message, error);
    }
  }

  /**
   * Loads a fallback page or functionality when the service worker fails.
   * This can be customized to load an offline fallback page.
   */
  private loadOfflineFallback(): void {
    window.location.href = '/offline-fallback.html'; // Customize this URL for your app's offline fallback
  }

  /**
   * Clears old caches when a new service worker is installed.
   * Ensures that outdated caches are removed to free up space and prevent serving outdated content.
   */
  private clearOldCaches(): void {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        if (cacheName !== 'current-cache-name') {  // Use the name of the current cache
          caches.delete(cacheName).then((deleted) => {
            if (deleted) this.logger.info(`Old cache ${cacheName} cleared.`);
          });
        }
      });
    });
  }

  /**
   * Forces the service worker to update immediately if a new version is found.
   * This bypasses the default behavior of waiting for all tabs to be closed.
   * 
   * @param {ServiceWorkerRegistration} registration - The service worker registration.
   */
  public forceUpdate(registration: ServiceWorkerRegistration): void {
    if (registration.waiting) {
      // Sends a message to the waiting service worker to skip waiting and activate immediately
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });

      // Listens for state changes on the waiting worker
      registration.waiting.onstatechange = () => {
        const installingWorker = registration.waiting;

        // Checks if the installing worker's state is 'activated', and if so, reloads the page
        if (installingWorker && installingWorker.state === 'activated') {
          this.logger.info('Service worker updated immediately');
          window.location.reload(); // Reload the page to apply the new service worker
        }
      };
    }
  }

  /**
   * Checks if there is already an active service worker.
   * 
   * @returns {Promise<boolean>} True if an active service worker exists, false otherwise.
   */
  public async isServiceWorkerActive(): Promise<boolean> {
    const registration = await navigator.serviceWorker.getRegistration();
    return registration?.active ? true : false;
  }

  /**
   * Registers the service worker to handle push notifications.
   * 
   * @param {string} applicationServerKey - The public key for the push service.
   * @returns {Promise<PushSubscription>} The push subscription object.
   */
  public async registerForPushNotifications(applicationServerKey: string): Promise<PushSubscription> {
    const registration = await navigator.serviceWorker.ready;
    return await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(applicationServerKey),
    });
  }

  /**
   * Converts a base64 string into a Uint8Array, required for push notifications.
   * 
   * @param {string} base64String - The base64 string to convert.
   * @returns {Uint8Array} The Uint8Array representation of the input.
   */
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  /**
   * Caches specified resources with optional cache name and duration.
   * 
   * @param {string[]} resources - The list of resources to cache.
   * @param {CacheOptions} options - Optional cache options such as cache name and duration.
   */
  public async cacheResources(resources: string[], options?: CacheOptions): Promise<void> {
    const cacheName = options?.cacheName || 'default-cache';
    const cache = await caches.open(cacheName);
    
    await cache.addAll(resources);
    
    if (options?.cacheDuration) {
      setTimeout(async () => {
        await caches.delete(cacheName);
        this.logger.info(`Cache ${cacheName} expired and deleted after ${options.cacheDuration} ms`);
      }, options.cacheDuration);
    }
  }

  /**
   * Returns the current state of the service worker (e.g., 'installing', 'waiting', 'active').
   * Useful for monitoring the status of the service worker in real-time.
   * 
   * @returns {Promise<string>} The current state of the service worker.
   */
  public async getServiceWorkerState(): Promise<string> {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration?.installing) {
      return 'installing';
    } else if (registration?.waiting) {
      return 'waiting';
    } else if (registration?.active) {
      return 'active';
    } else {
      return 'no-service-worker';
    }
  }
}

export default ServiceWorker;
