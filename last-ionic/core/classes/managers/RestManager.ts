import axios, { AxiosRequestConfig } from "axios";
import LoggerUtils from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

export class RestError extends Error {
  public statusCode: number;
  public data: any;

  constructor(message: string, statusCode: number, data: any) {
    super(message);
    this.name = 'RestError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * Interface defining the contract for RestManager operations.
 * This interface ensures that the RestManager can perform both synchronous and asynchronous REST API calls,
 * along with the standard REST methods (GET, POST, PUT, DELETE).
 */
export interface IRestManager {

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
    this.logger = LoggerUtils.getInstance( this.debug, this.constructor.name);
    this.baseUrl = baseUrl;
    this.headers = headers || {};
    this.logger.info("RestManager initialized", { baseUrl, headers });
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
    }
  }

  /**
   * Handles different types of errors that may occur during an API call.
   * This method provides more specific logging and categorization of errors based on their nature.
   *
   * @param error - The error object received during the failed API call.
   */
  private handleError(error: any): never {
    if (axios.isCancel(error)) {
      this.logger.warn("Request was canceled", error.message);
      throw new RestError("Request was canceled", 499, error.message);
    } else if (error.response) {
      // Puedes personalizar el mensaje usando error.response.data si el servidor lo proporciona
      const serverMessage = error.response.data?.message || `Server responded with status ${error.response.status}`;
      this.logger.error(serverMessage, error.response.data);
      throw new RestError(
        serverMessage,
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      this.logger.error("No response received from server", error.request);
      throw new RestError("No response received from server", 0, null);
    } else {
      this.logger.error("Unexpected error", error.message);
      throw new RestError("Unexpected error", 0, error.message);
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
