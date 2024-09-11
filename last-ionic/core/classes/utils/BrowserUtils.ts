/**
 * Utility class for common browser-related operations.
 * This class provides methods to manipulate the document title,
 * localStorage, cookies, and other browser-related utilities.
 *
 * @class BrowserUtils
 */
class BrowserUtils {
  private static instance: BrowserUtils | null = null;

  // Private constructor to ensure Singleton pattern
  private constructor() {}

  /**
   * Returns the singleton instance of BrowserUtils.
   * If an instance doesn't exist, it creates one.
   *
   * @returns {BrowserUtils} The singleton instance.
   */
  public static getInstance(): BrowserUtils {
    if (!this.instance) {
      this.instance = new BrowserUtils();
    }
    return this.instance;
  }

  /**
   * Updates the page title.
   *
   * @param newTitle - The new title to set for the document.
   */
  public updatePageTitle(newTitle: string): void {
    document.title = newTitle;
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

// Export the singleton instance of BrowserUtils
export default BrowserUtils.getInstance();
