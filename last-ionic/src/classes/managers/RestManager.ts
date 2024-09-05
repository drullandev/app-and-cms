import axios, { AxiosRequestConfig } from "axios";
import LoggerUtils from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

/**
 * Interface for defining the properties of a REST API call.
 * This interface is used to ensure that the necessary parameters and handlers
 * are provided for each API call made through the RestManager.
 */
export interface CallProps<T = any> {
  req: AxiosRequestConfig;
  onSuccess: {
    default: (response: T) => void;
  };
  onError: {
    default: (error: any) => void;
  };
  onFinally?: () => void;
}

/**
 * RestManager is a class designed to manage RESTful API calls.
 * This class supports both synchronous and asynchronous operations, allowing for custom headers
 * and configurations to be passed in. It ensures consistent API interaction through
 * centralized configuration and error handling. The Singleton pattern is used to ensure
 * that only one instance of RestManager is used throughout the application.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date August 30, 2024
 */
class RestManager {
  [x: string]: any;
  private static instance: RestManager | null = null; // Singleton instance of RestManager
  private baseUrl: string; // Base URL for all API requests
  private headers: Record<string, string>; // Default headers for all API requests
  private logger: LoggerUtils; // Logger instance for logging API interactions
  private debug: boolean = false; // Debug mode flag

  // Default retry settings
  private maxRetries: number = 3; // Maximum number of retries for failed requests
  private retryDelay: number = 1000; // Delay between retries in milliseconds

  /**
   * Private constructor to enforce the Singleton pattern.
   * Initializes the RestManager with a base URL and optional headers.
   *
   * @param baseUrl - The base URL to be used for all API requests.
   * @param headers - Optional headers to be included in every request.
   */
  public constructor(baseUrl: string, headers?: Record<string, string>, debug?: boolean) {
    this.debug = DebugUtils.setDebug(debug ?? this.debug);
    this.logger = LoggerUtils.getInstance(this.constructor.name, this.debug, 100);

    this.baseUrl = baseUrl;
    this.headers = headers || {};

    if (this.debug) {
      this.logger.info("RestManager initialized", { baseUrl, headers });
    }
  }

  /**
   * Returns the singleton instance of RestManager, creating it if it doesn't exist.
   * This ensures that the same instance is used throughout the application.
   *
   * @param baseUrl - The base URL for the API.
   * @param headers - Optional headers to include in all requests.
   * @returns The singleton instance of RestManager.
   */
  public static getInstance(baseUrl: string, headers?: Record<string, string>): RestManager {
    if (!this.instance) {
      this.instance = new RestManager(baseUrl, headers);
    }
    return this.instance;
  }

  /**
   * Performs a GET request to the specified URL using Axios.
   * This method automatically appends the base URL if it's not already included in the provided URL.
   *
   * @param url - The endpoint to which the GET request will be made.
   * @param config - Optional Axios configuration for the request.
   * @returns A promise that resolves with the data from the response.
   */
  public async get(url: string, config?: AxiosRequestConfig): Promise<any> {
    const finalUrl = url.startsWith(this.baseUrl) ? url : `${this.baseUrl}${url}`;
    this.logger.info("Performing GET request", { url: finalUrl });
    try {
      const response = await axios.get(finalUrl, {
        ...config,
        headers: {
          ...this.headers,
          ...config?.headers,
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error; // Rethrow the error after logging to allow for further handling upstream
    }
  }

  /**
   * Returns the base URL configured for the RestManager instance.
   * This is useful for constructing full URLs for API requests.
   *
   * @returns The base URL as a string.
   */
  public getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Handles different types of errors that may occur during an API call.
   * This method provides more specific logging and categorization of errors based on their nature.
   *
   * @param error - The error object received during the failed API call.
   */
  private handleError(error: any): void {
    if (axios.isCancel(error)) {
      this.logger.warn("Request was canceled", error.message);
    } else if (error.response) {
      this.logger.error(`Server responded with status ${error.response.status}`, error.response.data);
    } else if (error.request) {
      this.logger.error("No response received from server", error.request);
    } else {
      this.logger.error("Unexpected error", error.message);
    }
  }

  // Additional methods like makeAsyncCall, makeCall, etc., remain unchanged...
}

export default RestManager;