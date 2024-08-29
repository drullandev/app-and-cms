import DebugUtils from '../utils/DebugUtils';
import Logger from '../utils/LoggerUtils';
import TimeUtils from '../utils/TimeUtils';

class CookieManager {

  private defaultTimeString = '12months';
  private maxAge = '99999999';
  private debug = DebugUtils.setDebug(false);
  
  private static instance: CookieManager;
  
  // Private constructor to prevent instantiation
  private constructor() {}

  // Method to get the singleton instance
  public static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager();
    }
    return CookieManager.instance;
  }

  /**
   * Sets a cookie with the specified name, value and expiration days.
   * @param {string} name - The name of the cookie.
   * @param {string} value - The value of the cookie.
   * @param {string} timeString - The number of days until the cookie expires.
   */
  public set(name: string, value: any, timeString?: string): void {
    let expires = '';
    if (timeString) {
      const date = new Date();
      date.setTime(TimeUtils.parseTime(timeString ?? this.defaultTimeString));
      expires = '; expires=' + date.toUTCString();
    }
    const cookie = name + '=' + value + expires + '; path=/';
    document.cookie = cookie;
    if (this.debug) Logger.log(' • Setting cookie', cookie);
  }

  /**
   * Gets the value of the specified cookie.
   * @param {string} name - The name of the cookie.
   * @returns {string | null} - The value of the cookie or null if not found.
   */
  public get(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    if (this.debug) Logger.log(' • Getting cookie', name);
    return null;
  }

  /**
   * Erases the specified cookie.
   * @param {string} name - The name of the cookie.
   */
  public erase(name: string): void {
    document.cookie = name + '=; Max-Age=-' + this.maxAge + '; path=/';
    if (this.debug) Logger.log(' • Erasing cookie', name);
  }

  /**
   * Erases aliases of the specified cookie.
   * @param {string} name - The name of the cookie.
   */
  public delete(name: string): void {
    this.erase(name);
  }

  /**
   * Clears all cookies from the document.
   */
  public clearAll(): void {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const cookieName = cookie.split('=')[0].trim(); // Get cookie name
      this.erase(cookieName); // Erase the cookie
    }
    if (this.debug) Logger.log(' • Clearing cookies', cookies);
  }
}

// Export the singleton instance
export default CookieManager.getInstance();
