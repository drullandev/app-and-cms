import axios, { AxiosHeaderValue, AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import LoggerUtils from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";
import RestOutput from '../utils/RestOutput'; // Importamos RestOutput para manejar las salidas

class RestError extends Error {
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

interface RequestOptions {
  method: Method;
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}

export interface IRestManager {
  makeRequest<T>(options: RequestOptions): Promise<T>;
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  updateHeaders(newHeaders: { [key: string]: AxiosHeaderValue }): void;
}

class RestManager implements IRestManager {
  
  private static instances: Map<string, RestManager> = new Map();
  private axiosInstance: AxiosInstance;
  private logger: LoggerUtils;
  private debug: boolean;

  private constructor(axiosInstance: AxiosInstance, debug: boolean = true) {
    this.axiosInstance = axiosInstance;
    this.debug = DebugUtils.setDebug(debug);
    this.logger = LoggerUtils.getInstance(this.constructor.name, this.debug);
  }

  public static getInstance(axiosInstance: AxiosInstance, debug: boolean = false): RestManager {
    const baseURL = axiosInstance.defaults.baseURL || '';

    if (!RestManager.instances.has(baseURL)) {
      const instance = new RestManager(axiosInstance, debug);
      RestManager.instances.set(baseURL, instance);
    }

    return RestManager.instances.get(baseURL)!;
  }

  /**
   * Genera una representación de la solicitud en formato curl.
   */
  private generateCurlRequest(config: AxiosRequestConfig): string {
    const { method, url, headers, data } = config;
    let curl = `curl -X ${method?.toUpperCase()} "${config.baseURL || ''}${url}"`;

    // Añadir headers
    if (headers) {
      Object.entries(headers).forEach(([key, value]) => {
        curl += ` -H "${key}: ${value}"`;
      });
    }

    // Añadir data si está presente
    if (data) {
      curl += ` --data '${JSON.stringify(data)}'`;
    }

    return curl;
  }

  /**
   * Realiza una solicitud utilizando Axios y delega a RestOutput para manejar las respuestas y errores.
   */
  public async makeRequest<T>(options: RequestOptions): Promise<T> {
    try {
      const response = await this.axiosInstance({
        method: options.method,
        url: options.url,
        data: options.data,
        headers: {
          ...(options.config?.headers || {}),
        },
        ...options.config,
      });

      // Generar y registrar la solicitud curl
      if (this.debug) {
        const curlRequest = this.generateCurlRequest({
          method: options.method,
          url: options.url,
          data: options.data,
          headers: options.config?.headers,
          baseURL: this.axiosInstance.defaults.baseURL
        });
        this.logger.info('CURL Request:', curlRequest);
      }

      this.logger.info('The request was successful', response.data);
      return response.data as T;

    } catch (error: any) {
      // Manejo del error con RestOutput
      const errorMessage = RestOutput.danger({
        message: error.response?.data?.message || error.message,
        header: 'Error in request',
      });
      this.logger.error('The request failed', errorMessage);

      throw new RestError(error.message, error.response?.status, error.response?.data);
    }
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.makeRequest<T>({ method: 'GET', url, config });
  }

  public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.makeRequest<T>({ method: 'POST', url, data, config });
  }

  public async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.makeRequest<T>({ method: 'PUT', url, data, config });
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.makeRequest<T>({ method: 'DELETE', url, config });
  }

  public updateHeaders(newHeaders: AxiosRequestConfig['headers']): void {
    if (newHeaders) {
      Object.keys(newHeaders).forEach((key) => {
        if (newHeaders[key] !== undefined) {
          this.axiosInstance.defaults.headers.common[key] = newHeaders[key];
        }
      });
      this.logger.info('Headers updated successfully', this.axiosInstance.defaults.headers.common);
    }
  }
}

export { RestManager, RestError };
