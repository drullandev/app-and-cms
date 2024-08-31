import axios, { AxiosRequestConfig } from "axios";
import LoggerClass from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

/**
 * RestManager provides a class that encapsulates the functionality for making REST API calls.
 * It includes methods for performing synchronous and asynchronous calls, setting default request properties,
 * and handling responses and errors.
 *
 * This module is designed to be reusable and maintainable, ensuring that default values are set
 * and errors are properly handled. It supports custom handling for successful responses, errors, and final operations.
 *
 * @example
 * // Example of how to use RestManager for a synchronous call:
 * const restManager = RestManager.getInstance('https://api.example.com/');
 * const callProps: CallProps = {
 *   req: {
 *     method: 'get',
 *     url: '/endpoint',
 *   },
 *   onSuccess: {
 *     default: (response) => console.log('Success:', response),
 *   },
 *   onError: {
 *     default: (error) => console.error('Error:', error),
 *   },
 *   onFinally: () => console.log('Call finished'),
 * };
 * restManager.makeCall(callProps);
 *
 * @example
 * // Example of how to use RestManager for an asynchronous call:
 * const asyncCallProps: CallProps = {
 *   req: {
 *     method: 'post',
 *     url: '/submit-data',
 *     data: { key: 'value' },
 *   },
 *   onSuccess: {
 *     default: (response) => console.log('Data submitted successfully:', response),
 *   },
 *   onError: {
 *     default: (error) => console.error('Submission error:', error),
 *   },
 *   onFinally: () => console.log('Submission call finished'),
 * };
 * await restManager.makeAsyncCall(asyncCallProps);
 *
 * @note The main difference between calling the RestManager methods synchronously or asynchronously
 * lies in how the response is handled. A synchronous call (`makeCall`) will execute and block further
 * execution until the response is received, which can be useful in scenarios where subsequent code
 * depends on the result of the call. An asynchronous call (`makeAsyncCall`), on the other hand,
 * will not block execution and will instead use `async/await` or `.then()`/`.catch()` handlers to
 * process the response once it arrives, making it suitable for non-blocking, performance-sensitive
 * operations.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date Agoust 31, 2024
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
 * This class supports both synchronous and asynchronous operations and allows for custom headers
 * and configurations to be passed in. The Singleton pattern is used to ensure only one instance
 * of RestManager is used throughout the application, with the ability to set a base URL and default headers.
 */
class RestManager {
  private static instance: RestManager | null = null; // Singleton instance of RestManager
  private baseUrl: string; // Base URL for all API requests
  private headers: Record<string, string>; // Default headers for all API requests
  private logger: LoggerClass;
  private debug: boolean;

  // Default retry settings
  private maxRetries: number = 3; // Maximum number of retries
  private retryDelay: number = 1000; // Delay between retries in milliseconds

  /**
   * Private constructor to enforce the Singleton pattern.
   * Initializes the RestManager with a base URL and optional headers.
   *
   * @param baseUrl - The base URL to be used for all API requests.
   * @param headers - Optional headers to be included in every request.
   */
  private constructor(baseUrl: string, headers?: Record<string, string>) {
    this.baseUrl = baseUrl;
    this.headers = headers || {};
    this.debug = DebugUtils.setDebug(false); // Set debug mode based on environment
    this.logger = LoggerClass.getInstance(this.constructor.name, this.debug, 100);

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
  public static getInstance(
    baseUrl: string,
    headers?: Record<string, string>
  ): RestManager {
    if (!this.instance) {
      this.instance = new RestManager(baseUrl, headers);
    }
    return this.instance;
  }

  /**
   * Performs an asynchronous REST API call. This method will execute the API call and handle
   * the response, error, and any final operations as specified in the CallProps.
   *
   * @param call - The properties of the API call, including request configuration and handlers.
   * @returns A promise that resolves when the call is completed.
   */
  public async makeAsyncCall(call: CallProps): Promise<void> {
    return this.makeCall(this.prepareCall(call));
  }

  /**
   * Performs a synchronous REST API call. This method handles the actual execution of the API call,
   * including processing the response, handling errors, and executing any final operations.
   *
   * @param call - The properties of the API call, including request configuration and handlers.
   * @returns A promise that resolves when the call is completed.
   */
  public async makeCall(call: CallProps): Promise<void> {
    let attempts = 0;
    while (attempts < this.maxRetries) {
      try {
        this.logger.info("Making API call", { url: call.req.url, method: call.req.method });
        const response = await axios(call.req); // Execute the API request using Axios
        call.onSuccess.default(response); // Call the success handler with the response
        this.logger.info("API call successful", { response: response.data });
        return; // If the call is successful, exit the function
      } catch (error) {
        attempts++;
        this.logger.warn(`API call failed on attempt ${attempts}`, error);

        if (attempts < this.maxRetries) {
          this.logger.info(`Retrying API call in ${this.retryDelay}ms...`);
          await this.sleep(this.retryDelay);
        } else {
          this.handleError(error);
          call.onError.default(error);
          return; // Exit after the final attempt
        }
      } finally {
        if (call.onFinally) {
          this.logger.info("Finalizing API call");
          call.onFinally(); // Execute the final handler, if provided
        }
      }
    }
  }

  /**
   * Utility function to pause execution for a given number of milliseconds.
   * This is used to delay retries in the event of an error.
   *
   * @param ms - The number of milliseconds to pause execution.
   * @returns A promise that resolves after the specified delay.
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Prepares the API call by setting default values and applying the base URL and headers.
   * This ensures that every request made by RestManager is properly configured.
   *
   * @param call - The properties of the API call, including request configuration and handlers.
   * @returns The modified call object with default values set.
   */
  private prepareCall(call: CallProps): CallProps {
    call.req.headers = {
      "Content-Type": "application/json", // Set the default Content-Type header
      ...this.headers, // Merge in any default headers from the RestManager instance
      ...(call.req.headers || {}), // Merge in any headers provided in the call request
    };
    call.req.timeout = call.req.timeout || 10000; // Set a default timeout if none is provided

    // Ensure the request URL includes the base URL if not already present
    if (!call.req.url?.startsWith(this.baseUrl)) {
      call.req.url = `${this.baseUrl}${call.req.url}`;
    }

    this.logger.debug("Prepared API call", { url: call.req.url, headers: call.req.headers });
    return call;
  }

  /**
   * Handles different types of errors that may occur during an API call.
   * Provides more specific logging and categorization of errors.
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
}

export default RestManager;
