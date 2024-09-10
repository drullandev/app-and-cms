// Filename: ServiceManager.ts

/**
 * Centralizes the management and access to application services using lazy initialization.
 *
 * @class ServiceManager
 * @author David Rullán - https://github.com/drullandev
 * @date September 10, 2024
 */
import { ExceptionManager } from "./ExceptionManager";
import PushNotificationManager, {
  PushNotificationConfig,
} from "./PushNotificationManager";
import RestManager from "./RestManager";

interface ServiceManagerConfig {
  exceptionManagerConfig: { dsn: string; environment: string };
  restManagerConfig: string; // Assuming RestManager needs just a string (baseUrl)
  pushNotificationConfig: PushNotificationConfig; // Correct PushNotificationConfig type
}

export class ServiceManager {
  private static instance: ServiceManager | null = null;
  private exceptionManager?: ExceptionManager;
  private pushNotificationManager?: PushNotificationManager;
  private restManager?: RestManager;

  private config: ServiceManagerConfig;

  /**
   * Private constructor to prevent direct instantiation.
   * Use getInstance() for accessing the ServiceManager.
   *
   * @param config - Centralized configuration object for all services
   */
  private constructor(config: ServiceManagerConfig) {
    this.config = config;
  }

  /**
   * Retrieves the singleton instance of the ServiceManager.
   *
   * @param config - Configuration required for initialization (passed on first call)
   * @returns The singleton ServiceManager instance
   */
  public static getInstance(config: ServiceManagerConfig): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager(config);
    }
    return ServiceManager.instance;
  }

  /**
   * Retrieves the initialized ExceptionManager instance, creating it if necessary.
   *
   * @returns The ExceptionManager instance
   */
  public getExceptionManager = (): ExceptionManager => {
    if (!this.exceptionManager) {
      this.exceptionManager = new ExceptionManager(
        this.config.exceptionManagerConfig
      );
    }
    return this.exceptionManager;
  };

  /**
   * Retrieves the initialized PushNotificationManager instance, creating it if necessary.
   *
   * @returns The PushNotificationManager instance
   */
  public getPushNotificationManager = (): PushNotificationManager => {
    if (!this.pushNotificationManager) {
      this.pushNotificationManager = new PushNotificationManager(
        this.config.pushNotificationConfig
      );
    }
    return this.pushNotificationManager;
  };

  /**
   * Retrieves the initialized RestManager instance, creating it if necessary.
   *
   * @returns The RestManager instance
   */
  public getRestManager = (): RestManager => {
    if (!this.restManager) {
      this.restManager = new RestManager(this.config.restManagerConfig);
    }
    return this.restManager;
  };

  /**
   * Cleans up resources and services if necessary.
   */
  public cleanup = (): void => {
    // Implement any necessary cleanup logic for the services
    this.pushNotificationManager?.cleanUp();
  };
}
