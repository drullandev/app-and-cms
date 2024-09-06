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
 * Interface defining the contract for RestManager operations.
 * This interface ensures that the RestManager can perform both synchronous and asynchronous REST API calls,
 * along with the standard REST methods (GET, POST, PUT, DELETE).
 */
export interface IRestManager {
  /**
   * Makes an asynchronous API call using the given configuration.
   * 
   * @param call - Object containing the request configuration and success/error callbacks.
   * @returns A promise that resolves when the call is completed.
   */
  makeAsyncCall<T = any>(call: {
    req: AxiosRequestConfig;
    onSuccess: {
      default: (response: T) => void;
    };
    onError: {
      default: (error: any) => void;
    };
    onFinally?: () => void;
  }): Promise<void>;

  /**
   * Makes a synchronous API call using the given configuration.
   * 
   * @param config - Axios configuration for the request.
   * @returns A promise that resolves with the response of the request.
   */
  makeCall<T = any>(config: AxiosRequestConfig): Promise<T>;

  /**
   * Performs a GET request to the specified URL.
   * 
   * @param url - The URL endpoint for the GET request.
   * @param config - Optional Axios configuration for the request.
   * @returns A promise that resolves with the data from the response.
   */
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;

  /**
   * Performs a POST request to the specified URL.
   * 
   * @param url - The URL endpoint for the POST request.
   * @param data - The data to send in the POST request.
   * @param config - Optional Axios configuration for the request.
   * @returns A promise that resolves with the data from the response.
   */
  post<T = any>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;

  /**
   * Performs a PUT request to the specified URL.
   * 
   * @param url - The URL endpoint for the PUT request.
   * @param data - The data to send in the PUT request.
   * @param config - Optional Axios configuration for the request.
   * @returns A promise that resolves with the data from the response.
   */
  put<T = any>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;

  /**
   * Performs a DELETE request to the specified URL.
   * 
   * @param url - The URL endpoint for the DELETE request.
   * @param config - Optional Axios configuration for the request.
   * @returns A promise that resolves with the data from the response.
   */
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

/**
 * RestManager is a class designed to manage RESTful API calls.
 * This class supports both synchronous and asynchronous operations, allowing for custom headers
 * and configurations to be passed in. It ensures consistent API interaction through
 * centralized configuration and error handling.
 */
class RestManager implements IRestManager {
  private static instance: RestManager | null = null;
  private baseUrl: string;
  private headers: Record<string, string>;
  private logger: LoggerUtils;
  private debug: boolean = false;

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
   * Performs an asynchronous API call.
   *
   * @param {CallProps} call - The API call properties, including request config and callbacks.
   */
  public async makeAsyncCall<T>(call: CallProps<T>): Promise<void> {
    try {
      const response = await axios({
        ...call.req,
        baseURL: this.baseUrl,
        headers: {
          ...this.headers,
          ...call.req.headers,
        },
      });
      call.onSuccess.default(response.data);
    } catch (error) {
      this.handleError(error);
      call.onError.default(error);
    } finally {
      call.onFinally?.();
    }
  }

  /**
   * Makes a synchronous API call using the given Axios configuration.
   *
   * @param config - Axios configuration for the request.
   * @returns A promise that resolves with the response of the request.
   */
  public async makeCall<T = any>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axios({
        ...config,
        baseURL: this.baseUrl,
        headers: {
          ...this.headers,
          ...config.headers,
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Performs a GET request to the specified URL using Axios.
   * This method automatically appends the base URL if it's not already included in the provided URL.
   *
   * @param url - The endpoint to which the GET request will be made.
   * @param config - Optional Axios configuration for the request.
   * @returns A promise that resolves with the data from the response.
   */
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const finalUrl = url.startsWith(this.baseUrl) ? url : `${this.baseUrl}${url}`;
    this.logger.info("Performing GET request", { url: finalUrl });
    try {
      const response = await axios.get<T>(finalUrl, {
        ...config,
        headers: {
          ...this.headers,
          ...config?.headers,
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Performs a POST request to the specified URL using Axios.
   *
   * @param url - The endpoint to which the POST request will be made.
   * @param data - The data to be sent in the request body.
   * @param config - Optional Axios configuration for the request.
   * @returns A promise that resolves with the data from the response.
   */
  public async post<T = any>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const finalUrl = url.startsWith(this.baseUrl) ? url : `${this.baseUrl}${url}`;
    this.logger.info("Performing POST request", { url: finalUrl });
    try {
      const response = await axios.post<T>(finalUrl, data, {
        ...config,
        headers: {
          ...this.headers,
          ...config?.headers,
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Performs a PUT request to the specified URL using Axios.
   *
   * @param url - The endpoint to which the PUT request will be made.
   * @param data - The data to be sent in the request body.
   * @param config - Optional Axios configuration for the request.
   * @returns A promise that resolves with the data from the response.
   */
  public async put<T = any>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const finalUrl = url.startsWith(this.baseUrl) ? url : `${this.baseUrl}${url}`;
    this.logger.info("Performing PUT request", { url: finalUrl });
    try {
      const response = await axios.put<T>(finalUrl, data, {
        ...config,
        headers: {
          ...this.headers,
          ...config?.headers,
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  /**
   * Performs a DELETE request to the specified URL using Axios.
   *
   * @param url - The endpoint to which the DELETE request will be made.
   * @param config - Optional Axios configuration for the request.
   * @returns A promise that resolves with the data from the response.
   */
  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const finalUrl = url.startsWith(this.baseUrl) ? url : `${this.baseUrl}${url}`;
    this.logger.info("Performing DELETE request", { url: finalUrl });
    try {
      const response = await axios.delete<T>(finalUrl, {
        ...config,
        headers: {
          ...this.headers,
          ...config?.headers,
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
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

  /**
   * Returns the base URL configured for the RestManager instance.
   *
   * @returns The base URL as a string.
   */
  public getBaseUrl(): string {
    return this.baseUrl;
  }
}

export default RestManager;
