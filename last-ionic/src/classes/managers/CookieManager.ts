import LoggerClass from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

/**
 * CookieManager is a utility class for managing browser cookies.
 * It provides methods to set, get, and remove cookies in a simple and efficient manner.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 30, 2024
 */
class CookieManager {
  private domain: string;
  private path: string;
  private logger: LoggerClass;
  private debug: boolean;

  /**
   * Constructs a new CookieManager instance with the specified domain and path.
   *
   * @param domain - The domain for which cookies will be managed.
   * @param path - The path for which cookies will be managed.
   */
  constructor(domain: string, path: string) {
    this.domain = domain;
    this.path = path;
    this.debug = DebugUtils.setDebug(false); // Ajusta el modo de depuración según sea necesario
    this.logger = LoggerClass.getInstance(
      this.constructor.name,
      this.debug,
      100
    );

    if (this.debug) {
      this.logger.info("CookieManager initialized", { domain, path });
    }
  }

  /**
   * Sets a cookie with the specified name, value, and options.
   *
   * @param name - The name of the cookie.
   * @param value - The value of the cookie.
   * @param options - Optional. An object containing additional options such as expires, secure.
   */
  public setCookie(
    name: string,
    value: string,
    options: {
      expires?: Date | string | number;
      secure?: boolean;
      path?: string;
    } = {}
  ): void {
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
  public getCookie(name: string): string | null {
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
  public removeCookie(name: string): void {
    try {
      this.setCookie(name, "", { expires: new Date(0) });
      this.logger.info(`Cookie "${name}" removed`);
    } catch (error) {
      this.logger.error(`Failed to remove cookie "${name}":`, error);
    }
  }
}

export default CookieManager;
