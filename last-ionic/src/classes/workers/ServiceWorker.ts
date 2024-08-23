import Logger from '../LoggerClass';

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

/**
 * ServiceWorker Class
 * 
 * This class provides a convenient way to manage the registration and unregistration of a service worker in a web application.
 * 
 * **Key Features:**
 * 
 * 1. **Service Worker Registration**: 
 *    - Automatically registers a service worker script (`service-worker.js`) in production environments.
 *    - Ensures that the service worker script is served from the same origin to avoid potential security issues.
 * 
 * 2. **Service Worker Update Handling**: 
 *    - Monitors for updates to the service worker and notifies the application of new content availability.
 *    - Provides hooks for custom actions upon successful registration or update via the `onSuccess` and `onUpdate` callbacks.
 * 
 * 3. **Development and Production Support**:
 *    - In development mode (when `NODE_ENV` is not 'production'), the service worker registration includes additional checks to ensure validity.
 *    - In production mode, it simplifies the registration process and provides messages to inform about the cache-first behavior.
 * 
 * 4. **Offline Support**:
 *    - Supports offline functionality by caching the application resources. The service worker will ensure that the app is available even when the user is offline.
 * 
 * **Usage:**
 * - Instantiate the `ServiceWorker` class with optional configuration for custom success and update handling.
 * - Call the `register` method to initiate service worker registration.
 * - Call the `unregister` method if you need to unregister the service worker, typically during testing or if service worker functionality is no longer required.
 * 
 * **Configuration Options:**
 * - `onSuccess`: A callback function that will be invoked when the service worker is successfully registered.
 * - `onUpdate`: A callback function that will be invoked when the service worker detects an update.
 * 
 * This implementation helps to enhance the performance and offline capabilities of the web application by leveraging the power of service workers.
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

  constructor(private config?: Config) { }

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
            Logger.log(
              'This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA'
            );
          });
        } else {
          this.registerValidSW();
        }
      });
    }
  }

  public unregister(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister();
      }).catch(error => {
        console.error('Service Worker registration failed:', error);
      });
    }
  }

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
                Logger.log(
                  'New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA.'
                );
                if (this.config && this.config.onUpdate) {
                  this.config.onUpdate(registration);
                }
              } else {
                Logger.log('Content is cached for offline use.');
                if (this.config && this.config.onSuccess) {
                  this.config.onSuccess(registration);
                }
              }
            }
          };
        };
      })
      .catch((error) => {
        Logger.error('Error during service worker registration:', error);
      });
  }

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
            console.error('Service Worker registration failed:', error);
          });
        } else {
          this.registerValidSW();
        }
      })
      .catch(() => {
        Logger.error('No internet connection found. App is running in offline mode.');
      });
  }

}
