import axios, { AxiosHeaderValue, AxiosInstance, AxiosRequestConfig, Method } from 'axios';
import LoggerUtils from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";
/**
 * Class representing a custom error for REST requests.
 * Extends the base Error class and includes additional information
 * such as the HTTP status code and response data.
 * 
 * @class RestError
 * @author David Rullán
 * @date October 4, 2024
 */
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

/**
 * Interface for defining the structure of a request configuration object.
 */
interface RequestOptions {
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
interface IRestManager {
  makeRequest<T>(options: RequestOptions): Promise<T>;
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  updateHeaders(newHeaders: { [key: string]: AxiosHeaderValue }): void;
}

/**
 * RestManager handles REST API calls for the application.
 * It provides methods for making HTTP requests using Axios and 
 * automatically manages logging, debugging, and error handling.
 * 
 * @class RestManager
 * @implements {IRestManager}
 * @author David Rullán
 * @date October 2024
 */

class RestManager implements IRestManager {
  private static instances: Map<string, RestManager> = new Map(); // Mapa para instancias por URL
  private axiosInstance: AxiosInstance;
  private logger: LoggerUtils;
  private debug: boolean;

  /**
   * Constructor privado para forzar el patrón Singleton basado en la URL de Axios.
   */
  private constructor(axiosInstance: AxiosInstance, debug: boolean = false) {
    this.axiosInstance = axiosInstance;
    this.debug = DebugUtils.setDebug(debug);
    this.logger = LoggerUtils.getInstance(this.constructor.name, this.debug);
  }

  /**
   * Devuelve una instancia singleton de RestManager basada en la URL de la instancia de Axios.
   * 
   * @param {AxiosInstance} axiosInstance - Instancia de Axios.
   * @param {boolean} [debug=false] - Bandera para habilitar o deshabilitar el modo debug.
   * @returns {RestManager} - La instancia singleton de RestManager para la URL dada.
   */
  public static getInstance(axiosInstance: AxiosInstance, debug: boolean = false): RestManager {
    const baseURL = axiosInstance.defaults.baseURL || ''; // Obtener la URL base de Axios

    // Si no existe una instancia para esa URL, crear una nueva
    if (!RestManager.instances.has(baseURL)) {
      const instance = new RestManager(axiosInstance, debug);
      RestManager.instances.set(baseURL, instance);
    }

    return RestManager.instances.get(baseURL)!; // Retornar la instancia existente
  }

  /**
   * Realiza una petición HTTP utilizando la instancia de Axios configurada.
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
      this.logger.info('The request was successful');
      return response.data as T; // Retorna los datos de respuesta tipados como T
    } catch (error: any) {
      this.logger.error('The request failed');
      throw new RestError(error.message, error.response?.status, error.response?.data);
    }
  }

  /**
   * Simplificación del método GET.
   */
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.makeRequest<T>({ method: 'GET', url, config });
  }

  /**
   * Simplificación del método POST.
   */
  public async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.makeRequest<T>({ method: 'POST', url, data, config });
  }

  /**
   * Simplificación del método PUT.
   */
  public async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.makeRequest<T>({ method: 'PUT', url, data, config });
  }

  /**
   * Simplificación del método DELETE.
   */
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.makeRequest<T>({ method: 'DELETE', url, config });
  }

  /**
   * Actualiza los headers predeterminados de la instancia de Axios.
   * 
   * @param {AxiosRequestConfig['headers']} newHeaders - Nuevos headers que se aplicarán a la instancia.
   */
  public updateHeaders(newHeaders: AxiosRequestConfig['headers']): void {
    // Iterar sobre las claves de newHeaders y actualizarlas en la instancia de axios
    if (newHeaders) {
      Object.keys(newHeaders).forEach((key) => {
        if (newHeaders[key] !== undefined) {
          // Actualiza solo los headers que estén definidos
          this.axiosInstance.defaults.headers.common[key] = newHeaders[key];
        }
      });
      this.logger.info('Headers updated successfully', this.axiosInstance.defaults.headers.common);
    }
  }
  
}

export type { IRestManager };
export { RestManager, RestError };
