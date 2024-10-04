// Filename: ServiceManager.ts

/**
 * ServiceManager class
 * Centralizes the management and access to various application services using lazy initialization.
 * Provides Singleton access to services like SentryManager, RestManager, and PushNotificationManager.
 *
 * @class ServiceManager
 * @author David Rullán - https://github.com/drullandev
 * @date October 4, 2024
 */

import { SentryManager } from "./SentryManager";
import PushNotificationManager, { PushNotificationConfig } from "./PushNotificationManager";
import RestManager from "./RestManager";

/**
 * Interface defining the configuration structure for SentryManager.
 */
interface SentryManagerConfig {
  dsn: string;
  environment: string;
}

/**
 * Interface defining the configuration structure for ServiceManager.
 * This object centralizes all configuration options needed for initializing services.
 */
interface ServiceManagerConfig {
  SentryManagerConfig: SentryManagerConfig;
  restManagerConfig: string; // Assuming RestManager needs just a string (baseUrl)
  pushNotificationConfig: PushNotificationConfig;
}

/**
 * ServiceManager class
 * Manages the initialization of core services and ensures that only one instance of each service is created (Singleton).
 */
export class ServiceManager {
  private static instance: ServiceManager | null = null; // Singleton instance
  private SentryManager?: SentryManager;
  private pushNotificationManager?: PushNotificationManager;
  private restManager?: RestManager;

  private config: ServiceManagerConfig;

  /**
   * Private constructor to prevent direct instantiation.
   * Use the getInstance() method to obtain a singleton instance.
   *
   * @param config - Centralized configuration object for all services.
   */
  private constructor(config: ServiceManagerConfig) {
    this.config = config;
  }

  /**
   * Returns the singleton instance of ServiceManager.
   * If the instance doesn't exist, it initializes one with the provided configuration.
   *
   * @param config - Configuration object required for initializing services.
   * @returns The singleton ServiceManager instance.
   */
  public static getInstance(config: ServiceManagerConfig): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager(config);
    }
    return ServiceManager.instance;
  }

  /**
   * Returns an instance of SentryManager using lazy initialization.
   * If the SentryManager is not already initialized, it creates one using the provided configuration.
   * 
   * @returns {SentryManager} The SentryManager instance.
   */
  public getSentryManager(): SentryManager {
    if (!this.SentryManager) {
      // Passing the entire SentryManagerConfig object for initialization
      this.SentryManager = new SentryManager(this.config.SentryManagerConfig);
    }
    return this.SentryManager;
  }

  /**
   * Returns an instance of RestManager using lazy initialization.
   * If the RestManager is not already initialized, it creates one.
   * 
   * @returns {RestManager} The RestManager instance.
   */
  public getRestManager(): RestManager {
    if (!this.restManager) {
      this.restManager = RestManager.getInstance(); // Assuming RestManager follows Singleton pattern
    }
    return this.restManager;
  }

  /**
   * Returns an instance of PushNotificationManager using lazy initialization.
   * If the PushNotificationManager is not already initialized, it creates one using the provided configuration.
   * 
   * @returns {PushNotificationManager} The PushNotificationManager instance.
   */
  public getPushNotificationManager(): PushNotificationManager {
    if (!this.pushNotificationManager) {
      this.pushNotificationManager = new PushNotificationManager(this.config.pushNotificationConfig);
    }
    return this.pushNotificationManager;
  }
}

export default ServiceManager;
