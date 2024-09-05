import LoggerUtils, { initializeLogger } from "../utils/LoggerUtils";
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
   * Constructs a new CookieManager instance with the specified domain and path.
   *
   * @param domain - The domain for which cookies will be managed.
   * @param path - The path for which cookies will be managed.
   * @param debug - Optional flag to enable debug mode.
   */
  private constructor(domain: string, path: string, debug?: boolean) {
    this.debug = DebugUtils.setDebug(debug ?? this.debug);
    this.logger = initializeLogger(this.constructor.name, this.debug, 100);
    this.domain = domain;
    this.path = path;
    this.logger = LoggerUtils.getInstance(this.constructor.name, this.debug, 100);

    if (this.debug) {
      this.logger.info("CookieManager initialized", { domain, path });
    }
  }

  /**
   * Returns the instance of CookieManager for a specific domain and path.
   * If an instance does not already exist, it creates a new one.
   *
   * @param domain - The domain for which cookies will be managed.
   * @param path - The path for which cookies will be managed.
   * @param debug - Optional flag to enable debug mode.
   * @returns The singleton instance of CookieManager for the specified domain and path.
   */
  public static getInstance(domain: string, path: string, debug?: boolean): CookieManager {
    const key = `${domain}_${path}`;
    
    if (!this.instances.has(key)) {
      const instance = new CookieManager(domain, path, debug);
      this.instances.set(key, instance);
    }
    
    return this.instances.get(key)!; // The non-null assertion operator '!' guarantees that the value exists
  }

  /**
   * Sets a cookie with the specified name, value, and options.
   *
   * @param name - The name of the cookie.
   * @param value - The value of the cookie.
   * @param options - Optional. An object containing additional options such as expires, secure, and path.
   */
  public set(name: string, value: string, options: CookieOptions = {}): void {
    try {
      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${options.path || this.path}; domain=${this.domain}`;

      // Handle different types of expiration input
      if (options.expires) {
        let expires: Date;
        if (typeof options.expires === "number") {
          expires = new Date(Date.now() + options.expires);
        } else if (typeof options.expires === "string") {
          expires = new Date(options.expires);
        } else {
          expires = options.expires;
        }
        cookieString += `; expires=${expires.toUTCString()}`;
      }

      if (options.secure) {
        cookieString += `; secure`;
      }

      document.cookie = cookieString;
      this.logger.info(`Cookie "${name}" set successfully`, { value, options });
    } catch (error) {
      this.logger.error(`Failed to set cookie "${name}":`, error);
    }
  }

  /**
   * Gets the value of a cookie by name.
   *
   * @param name - The name of the cookie to retrieve.
   * @returns The value of the cookie, or null if the cookie does not exist.
   */
  public get(name: string): string | null {
    try {
      const match = document.cookie.match(
        new RegExp(`(^| )${encodeURIComponent(name)}=([^;]+)`)
      );
      const value = match ? decodeURIComponent(match[2]) : null;
      this.logger.info(`Cookie "${name}" retrieved`, { value });
      return value;
    } catch (error) {
      this.logger.error(`Failed to retrieve cookie "${name}":`, error);
      return null;
    }
  }

  /**
   * Removes a cookie by name.
   *
   * @param name - The name of the cookie to remove.
   */
  public remove(name: string): void {
    try {
      this.set(name, "", { expires: new Date(0), path: '/' });
      this.logger.info(`Cookie "${name}" removed`);
    } catch (error) {
      this.logger.error(`Failed to remove cookie "${name}":`, error);
    }
  }

  /**
   * Alias for `remove`. Removes a cookie by name.
   *
   * @param name - The name of the cookie to delete.
   */
  public delete(name: string): void {
    this.remove(name);
  }
}

export default CookieManager;