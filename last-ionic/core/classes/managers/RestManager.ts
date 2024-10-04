import axios, { AxiosRequestConfig, Method } from "axios";
import LoggerUtils from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

/**
 * Class representing a custom error for REST requests.
 * Extends the base Error class and includes additional information
 * such as the HTTP status code and response data.
 * 
 * @class RestError
 * @example
 * try {
 *   await restManager.makeRequest({ method: 'GET', url: '/endpoint' });
 * } catch (error) {
 *   if (error instanceof RestError) {
 *     console.error(error.toString());
 *   }
 * }
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date October 4, 2024
 */
export class RestError extends Error {
  public statusCode: number;
  public data: any;

  constructor(message: string, statusCode: number, data: any) {
    super(message);
    this.name = 'RestError';
    this.statusCode = statusCode;
    this.data = data;
  }

  public toString(): string {
    return `${this.name} (Status: ${this.statusCode}): ${this.message}`;
  }
}

/**
 * Interface for defining the structure of a request configuration object.
 * 
 * @interface RequestOptions
 * @property {Method} method - The HTTP method (GET, POST, etc.).
 * @property {string} url - The endpoint for the request.
 * @property {any} [data] - Optional data to be sent (for POST, PUT).
 * @property {AxiosRequestConfig} [config] - Optional Axios configuration.
 */
export interface RequestOptions {
  method: Method;
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}

/**
 * Interface defining the contract for RestManager operations.
 * This interface ensures that the RestManager can perform both synchronous 
 * and asynchronous REST API calls, along with the standard REST operations.
 * 
 * @interface IRestManager
 */
export interface IRestManager {
  makeRequest<T>(options: RequestOptions): Promise<T>;
}

/**
 * RestManager handles REST API calls for the application.
 * It provides methods for making HTTP requests using Axios and 
 * automatically manages logging, debugging, and error handling.
 * 
 * @class RestManager
 * @example
 * const restManager = RestManager.getInstance('https://api.example.com');
 * const response = await restManager.makeRequest({ method: 'GET', url: '/data' });
 * 
 * @author David Rullán
 * @date October 2024
 */
class RestManager implements IRestManager {
  private static instance: RestManager | null = null; // Singleton instance
  private logger: LoggerUtils;
  private debug: boolean;
  private baseURL: string;
  private defaultHeaders: AxiosRequestConfig['headers'];

  /**
   * Private constructor for singleton pattern. Initializes logging, debugging,
   * and sets the base URL and default headers for requests.
   * 
   * @param baseURL - The base URL for all API requests.
   * @param defaultHeaders - Optional default headers (e.g., Authorization).
   * @param debug - Optional debug flag to enable or disable debug logging.
   */
  private constructor(baseURL: string, defaultHeaders?: AxiosRequestConfig['headers'], debug: boolean = false) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders || {};
    this.debug = DebugUtils.setDebug(debug);
    this.logger = LoggerUtils.getInstance(this.debug, this.constructor.name);
  }

  /**
   * Returns the singleton instance of RestManager.
   * 
   * @param baseURL - The base URL for all API requests.
   * @param defaultHeaders - Optional default headers (e.g., Authorization).
   * @param debug - Optional debug flag to enable or disable debug logging.
   * @returns {RestManager} The singleton instance.
   */
  public static getInstance(baseURL: string, defaultHeaders?: AxiosRequestConfig['headers'], debug: boolean = false): RestManager {
    if (!RestManager.instance) {
      RestManager.instance = new RestManager(baseURL, defaultHeaders, debug);
    }
    return RestManager.instance;
  }

  /**
   * Makes an HTTP request using Axios. Handles logging, debugging, and custom error handling.
   * 
   * @template T - The expected type of the response data.
   * @param {RequestOptions} options - The request configuration (method, URL, data, etc.).
   * @returns {Promise<T>} The response data.
   * @throws {RestError} If the request fails or the server returns an error.
   */
  public async makeRequest<T>(options: RequestOptions): Promise<T> {
    try {
      this.logger.info('Making request:', options);
      
      const response = await axios({
        method: options.method,
        url: `${this.baseURL}${options.url}`,  // Concatenate baseURL with request-specific URL
        data: options.data,
        headers: {
          ...this.defaultHeaders,  // Include default headers (e.g., Authorization)
          ...(options.config?.headers || {})  // Allow request-specific headers to override default
        },
        ...options.config,
      });

      this.logger.info('Request successful:', response);
      return response.data as T;  // Cast response data to expected type
    } catch (error: any) {
      this.logger.error('Request failed:', error);
      throw new RestError(error.message, error.response?.status, error.response?.data);
    }
  }

  /**
   * Updates the default headers for future requests.
   * 
   * @param newHeaders - New headers to be merged with the existing default headers.
   */
  public updateHeaders(newHeaders: AxiosRequestConfig['headers']): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...newHeaders };
  }
}

export default RestManager;
