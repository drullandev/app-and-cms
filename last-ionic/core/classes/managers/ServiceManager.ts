import SentryManager from "./SentryManager";
import PushNotificationManager, { PushNotificationConfig } from "./PushNotificationManager";
import RestManager from "./RestManager";

/**
 * Interface defining the configuration structure for SentryManager.
 * 
 * @interface SentryManagerConfig
 */
interface SentryManagerConfig {
  dsn: string;
  environment: string;
}

/**
 * Interface defining the configuration structure for ServiceManager.
 * 
 * @interface ServiceManagerConfig
 */
interface ServiceManagerConfig {
  SentryManagerConfig: SentryManagerConfig;
  pushNotificationConfig: PushNotificationConfig;
}

/**
 * ServiceManager Class
 * 
 * This class manages the initialization and access to core services used within the application. 
 * It ensures that only one instance of each service (such as SentryManager, RestManager, 
 * and PushNotificationManager) is created, providing a centralized way to manage them.
 * 
 * It follows the Singleton pattern to ensure that services are initialized only once and shared 
 * across the application. The class also allows for lazy initialization of the services when needed.
 * 
 * Usage Example:
 * 
 * ```typescript
 * const serviceManager = ServiceManager.getInstance(restManager, serviceConfig);
 * const sentryManager = serviceManager.getSentryManager();
 * const pushManager = serviceManager.getPushNotificationManager();
 * ```
 * 
 * @class ServiceManager
 * @author David Rullán - https://github.com/drullandev
 * @date October 4, 2024
 */
export class ServiceManager {
  private static instance: ServiceManager | null = null; // Singleton instance
  private sentryManager?: SentryManager;
  private pushNotificationManager?: PushNotificationManager;
  private restManager: RestManager;

  private config: ServiceManagerConfig;

  /**
   * Private constructor to prevent direct instantiation.
   * This constructor initializes the ServiceManager with a RestManager instance 
   * and a configuration object for the services.
   * 
   * @param restManager - An instance of RestManager for handling API calls.
   * @param config - Configuration object containing settings for the services.
   */
  private constructor(restManager: RestManager, config: ServiceManagerConfig) {
    this.restManager = restManager;
    this.config = config;
  }

  /**
   * Retrieves the singleton instance of the ServiceManager. 
   * If the instance doesn't already exist, it is created with the provided RestManager and config.
   * 
   * @param restManager - RestManager instance to be used for making API calls.
   * @param config - Configuration object required for initializing the services.
   * @returns {ServiceManager} The singleton instance of ServiceManager.
   */
  public static getInstance(restManager: RestManager, config: ServiceManagerConfig): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager(restManager, config);
    }
    return ServiceManager.instance;
  }

  /**
   * Returns an instance of SentryManager using lazy initialization.
   * If it is not already initialized, it is created using the provided configuration.
   * 
   * @returns {SentryManager} The SentryManager instance.
   */
  public getSentryManager(): SentryManager {
    if (!this.sentryManager) {
      this.sentryManager = new SentryManager(this.config.SentryManagerConfig); // Create directly using constructor
    }
    return this.sentryManager;
  }

  /**
   * Returns an instance of PushNotificationManager using lazy initialization.
   * If it is not already initialized, it is created using the provided configuration.
   * 
   * @returns {PushNotificationManager} The PushNotificationManager instance.
   */
  public getPushNotificationManager(): PushNotificationManager {
    if (!this.pushNotificationManager) {
      this.pushNotificationManager = new PushNotificationManager(this.config.pushNotificationConfig);
    }
    return this.pushNotificationManager;
  }

  /**
   * Provides access to the RestManager instance that was passed during initialization.
   * 
   * @returns {RestManager} The RestManager instance.
   */
  public getRestManager(): RestManager {
    return this.restManager;
  }
}

export default ServiceManager;
