import axios, { AxiosRequestConfig, Method } from "axios";
import LoggerUtils from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

/**
 * Class representing a custom error for REST requests.
 * Extends the base Error class and includes additional information
 * such as the HTTP status code and response data.
 * 
 * @class RestError
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
 */
export interface IRestManager {
  makeRequest<T>(options: RequestOptions): Promise<T>;
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  updateHeaders(newHeaders: AxiosRequestConfig['headers']): void
}

/**
 * RestManager handles REST API calls for the application.
 * It provides methods for making HTTP requests using Axios and 
 * automatically manages logging, debugging, and error handling.
 * 
 * @class RestManager
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
   * Public constructor for singleton pattern. Initializes logging, debugging,
   * and sets the base URL and default headers for requests.
   */
  public constructor(baseURL: string, defaultHeaders?: AxiosRequestConfig['headers'], debug: boolean = false) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders || {};
    this.debug = DebugUtils.setDebug(debug);
    this.logger = LoggerUtils.getInstance(this.constructor.name, this.debug);
  }

  /**
   * Returns the singleton instance of RestManager.
   */
  public static getInstance(baseURL: string, defaultHeaders?: AxiosRequestConfig['headers'], debug: boolean = false): RestManager {
    if (!RestManager.instance) {
      RestManager.instance = new RestManager(baseURL, defaultHeaders, debug);
    }
    return RestManager.instance;
  }

  /**
   * Makes an HTTP request using Axios. Handles logging, debugging, and custom error handling.
   */
  public async makeRequest<T>(options: RequestOptions): Promise<T> {
    try {
      const response = await axios({
        method: options.method,
        url: `${this.baseURL}${options.url}`,
        data: options.data,
        headers: {
          ...this.defaultHeaders,
          ...(options.config?.headers || {}),
        },
        ...options.config,
      });
      this.logger.info('The request was done');
      return response.data as T; // Retorna el tipo genérico T
    } catch (error: any) {
      this.logger.error('The request was error');
      throw new RestError(error.message, error.response?.status, error.response?.data);
    }
  }

  /**
   * Simplified GET request.
   */
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.makeRequest<T>({
      method: 'GET',
      url,
      config
    });
  }

  /**
   * Simplified POST request.
   */
  public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.makeRequest<T>({
      method: 'POST',
      url,
      data,
      config
    });
  }

  /**
   * Simplified PUT request.
   */
  public async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.makeRequest<T>({
      method: 'PUT',
      url,
      data,
      config
    });
  }

  /**
   * Simplified DELETE request.
   */
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.makeRequest<T>({
      method: 'DELETE',
      url,
      config
    });
  }

  /**
   * Updates the default headers for future requests.
   */
  public updateHeaders(newHeaders: AxiosRequestConfig['headers']): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...newHeaders };
    this.logger.info('The request updateHeaders was done', this.defaultHeaders);
  }
}

export default RestManager;
