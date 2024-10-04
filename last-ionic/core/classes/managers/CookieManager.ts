import LoggerUtils from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

/**
 * Interface representing the options that can be used when setting a cookie.
 */
export interface CookieOptions {
  expires?: Date | string | number; // Expiration date or time for the cookie
  secure?: boolean;                 // If true, cookie will only be sent over secure connections
  path?: string;                    // The path for which the cookie is valid
}

/**
 * Interface representing the contract for the CookieManager class.
 */
export interface ICookieManager {
  set(name: string, value: string, options?: CookieOptions): void; // Set a cookie
  get(name: string): string | null; // Get a cookie by name
  remove(name: string): void; // Remove a cookie by name
  delete(name: string): void; // Alias for remove
}

/**
 * CookieManager is a utility class for managing browser cookies.
 * It provides methods to set, get, and remove cookies in a simple and efficient manner.
 *
 * @class CookieManager
 * @author David Rullán - https://github.com/drullandev
 * @date August 30, 2024
 */
class CookieManager implements ICookieManager {
  private static instances: Map<string, CookieManager> = new Map(); // Store instances per domain/path
  private domain: string;
  private path: string;
  private logger: LoggerUtils;
  private debug: boolean = false; // Debug mode flag

  /**
   * Private constructor to prevent direct instantiation. Use getInstance() instead.
   * Constructs a new CookieManager instance with the specified domain and path.
   * 
   * @param domain - The domain for which cookies will be managed.
   * @param path - The path for which cookies will be managed.
   */
  private constructor(domain: string, path: string = "/") {
    this.domain = domain;
    this.path = path;
    this.debug = DebugUtils.setDebug(this.debug);
    this.logger = LoggerUtils.getInstance(this.debug, this.constructor.name);
  }

  /**
   * Retrieves the singleton instance of CookieManager for the specified domain and path.
   * 
   * @param domain - The domain for which the instance is needed.
   * @param path - Optional path for the cookies. Defaults to "/".
   * @returns {CookieManager} The CookieManager instance for the specified domain and path.
   */
  public static getInstance(domain: string, path: string = "/"): CookieManager {
    const key = `${domain}${path}`;
    if (!this.instances.has(key)) {
      this.instances.set(key, new CookieManager(domain, path));
    }
    return this.instances.get(key)!;
  }

  /**
   * Sets a cookie with the specified name, value, and options.
   * 
   * @param name - The name of the cookie.
   * @param value - The value of the cookie.
   * @param options - Optional settings such as expiration, security, and path.
   */
  public set(name: string, value: string, options?: CookieOptions): void {
    let cookieString = `${name}=${encodeURIComponent(value)}; Path=${options?.path || this.path};`;

    if (options?.expires) {
      const expires = typeof options.expires === "number"
        ? new Date(Date.now() + options.expires).toUTCString()
        : options.expires instanceof Date
        ? options.expires.toUTCString()
        : options.expires;

      cookieString += ` Expires=${expires};`;
    }

    if (options?.secure) {
      cookieString += " Secure;";
    }

    document.cookie = cookieString;
    this.logger.info(`Cookie set: ${cookieString}`);
  }

  /**
   * Retrieves a cookie by name.
   * 
   * @param name - The name of the cookie to retrieve.
   * @returns The value of the cookie or null if not found.
   */
  public get(name: string): string | null {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find(cookie => cookie.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  }

  /**
   * Removes a cookie by name.
   * 
   * @param name - The name of the cookie to remove.
   */
  public remove(name: string): void {
    this.set(name, "", { expires: new Date(0) });
    this.logger.info(`Cookie removed: ${name}`);
  }

  /**
   * Alias for remove. Deletes a cookie by name.
   * 
   * @param name - The name of the cookie to delete.
   */
  public delete(name: string): void {
    this.remove(name);
  }
}

export default CookieManager;
