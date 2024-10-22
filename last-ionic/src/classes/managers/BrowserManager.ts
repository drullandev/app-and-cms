/**
 * Interface representing the BrowserManager operations.
 *
 * @interface IBrowserManager
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
 */
export interface IBrowserManager {
  appName: string;
  updatePageTitle(newTitle: string): void;
  setLocalStorageItem(key: string, value: any): void;
  getLocalStorageItem(key: string): any;
  removeLocalStorageItem(key: string): void;
  setCookie(name: string, value: string, days: number): void;
  getCookie(name: string): string;
  deleteCookie(name: string): void;
  scrollToElementById(elementId: string): void;
}

/**
 * Manager class for common browser-related operations.
 * This class provides methods to manipulate the document title,
 * localStorage, cookies, and other browser-related utilities.
 *
 * @class BrowserManager
 */
class BrowserManager implements IBrowserManager {
  private static instances: Record<string, BrowserManager> = {}; // Stores instances by app name
  public appName: string;

  // Private constructor to ensure Singleton pattern with appName
  private constructor(appName: string) {
    this.appName = appName;
  }

  /**
   * Returns the singleton instance of BrowserManager for a specific app.
   * If an instance doesn't exist, it creates one.
   *
   * @param appName - The name of the app to associate with this instance.
   * @returns {BrowserManager} The singleton instance for the specified app.
   */
  public static getInstance(appName?: string): BrowserManager | undefined {
    if (appName){
      if (!this.instances[appName]) {
        this.instances[appName] = new BrowserManager(appName);
      }
      return this.instances[appName];
    }
    return new BrowserManager('')
  }

  /**
   * Updates the page title by appending the app name.
   *
   * @param newTitle - The new title to set for the document.
   */
  public updatePageTitle(newTitle: string): void {
    if (this.appName != ''){
      document.title = `${this.appName} - ${newTitle}}`;
    }
  }

  /**
   * Sets a value in localStorage.
   *
   * @param key - The key to store the value under.
   * @param value - The value to store. It will be stringified if it's an object.
   */
  public setLocalStorageItem(key: string, value: any): void {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  /**
   * Retrieves a value from localStorage.
   *
   * @param key - The key of the item to retrieve.
   * @returns The value stored in localStorage, or null if not found.
   */
  public getLocalStorageItem(key: string): any {
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item as string);
    } catch (error) {
      return item; // If not a JSON, return the raw value
    }
  }

  /**
   * Removes an item from localStorage.
   *
   * @param key - The key of the item to remove.
   */
  public removeLocalStorageItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Sets a cookie in the browser.
   *
   * @param name - The name of the cookie.
   * @param value - The value of the cookie.
   * @param days - The number of days until the cookie expires.
   */
  public setCookie(name: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  }

  /**
   * Gets the value of a cookie by name.
   *
   * @param name - The name of the cookie to retrieve.
   * @returns The value of the cookie, or an empty string if not found.
   */
  public getCookie(name: string): string {
    const nameEQ = `${name}=`;
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
      let cookie = cookiesArray[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return '';
  }

  /**
   * Deletes a cookie by name.
   *
   * @param name - The name of the cookie to delete.
   */
  public deleteCookie(name: string): void {
    document.cookie = `${name}=; Max-Age=-99999999;`;
  }

  /**
   * Scrolls the page to a specific element by its ID.
   *
   * @param elementId - The ID of the element to scroll to.
   */
  public scrollToElementById(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Export function to get the instance
export default BrowserManager;
