class CookieManager {

    /**
     * Sets a cookie with the specified name, value and expiration days.
     * @param {string} name - The name of the cookie.
     * @param {string} value - The value of the cookie.
     * @param {number} days - The number of days until the cookie expires.
     */
    static setCookie(name: string, value: string, days: number): void {
      let expires = "";
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
  
    /**
     * Gets the value of the specified cookie.
     * @param {string} name - The name of the cookie.
     * @returns {string | null} - The value of the cookie or null if not found.
     */
    static getCookie(name: string): string | null {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
  
    /**
     * Erases the specified cookie.
     * @param {string} name - The name of the cookie.
     */
    static eraseCookie(name: string): void {
      document.cookie = name + '=; Max-Age=-99999999; path=/';
    }
    
  }
  
  export default CookieManager;
  