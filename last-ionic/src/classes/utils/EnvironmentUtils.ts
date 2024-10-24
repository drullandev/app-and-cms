import { appVersion, nodeEnv } from "../../app/config/env";

/**
 * Utility class for environment-related operations.
 * This class provides methods to check the current environment (production, development, test),
 * retrieve environment variables, and detect certain features.
 * 
 * @author David Rullán
 * @date September 5, 2024
 */
class EnvironmentUtils {
    private static instance: EnvironmentUtils | null = null;
  
    /**
     * Returns the singleton instance of EnvironmentUtils.
     * If no instance exists, it creates one.
     *
     * @returns The singleton instance of EnvironmentUtils.
     */
    public static getInstance(): EnvironmentUtils {
      if (!this.instance) {
        this.instance = new this();
      }
      return this.instance;
    }
  
    /**
     * Checks if the current environment is production.
     *
     * @returns {boolean} True if the environment is production, false otherwise.
     */
    public isProduction(): boolean {
      return nodeEnv === 'production';
    }
  
    /**
     * Checks if the current environment is development.
     *
     * @returns {boolean} True if the environment is development, false otherwise.
     */
    public isDevelopment(): boolean {
      return nodeEnv === 'development';
    }
  
    /**
     * Checks if the current environment is for testing.
     *
     * @returns {boolean} True if the environment is test, false otherwise.
     */
    public isTest(): boolean {
      return nodeEnv === 'test';
    }

        /**
     * Retrieves the value of a specific environment variable.
     * 
     * @param key The name of the environment variable to retrieve.
     * @returns {string | undefined} The value of the environment variable, or undefined if not found.
     */
      public getEnvs(){
        return import.meta.env;
      }
  
    /**
     * Retrieves the value of a specific environment variable.
     * 
     * @param key The name of the environment variable to retrieve.
     * @returns {string | undefined} The value of the environment variable, or undefined if not found.
     */
    public getEnvVariable(key: string): string | undefined {
      return import.meta.env[key];
    }
  
    /**
     * Checks if the application is running in a browser environment.
     * 
     * @returns {boolean} True if running in a browser, false otherwise.
     */
    public isBrowser(): boolean {
      return typeof window !== 'undefined' && typeof window.document !== 'undefined';
    }
  
    /**
     * Checks if the application is running in a Node.js environment.
     * 
     * @returns {boolean} True if running in Node.js, false otherwise.
     */
    public isNode(): boolean {
      return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
    }
  
    /**
     * Retrieves the current app version from environment variables (if available).
     * 
     * @returns {string | undefined} The app version, or undefined if not set.
     */
    public getAppVersion(): string | undefined {
      return appVersion;
    }
  
    /**
     * Determines if the application is running in a mobile device by checking the user agent.
     * 
     * @returns {boolean} True if running on a mobile device, false otherwise.
     */
    public isMobile(): boolean {
      if (this.isBrowser()) {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        return /android|iphone|ipad|ipod/i.test(userAgent);
      }
      return false;
    }
  }
  
  export default EnvironmentUtils.getInstance();
  