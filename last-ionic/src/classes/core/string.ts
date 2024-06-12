/**
 * Utility class for string manipulation operations such as converting string to camelCase,
 * checking if an object is empty, capitalizing the first letter of a string, and generating
 * random strings.
 */
 class StringUtil {
  /**
   * Convert a hyphen-separated string to camelCase.
   * 
   * @param {string} str - The string to convert to camelCase.
   * @returns {string} The camelCase representation of the input string.
   */
  public toCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, function(g) {
      return g[1].toUpperCase();
    });
  }

  /**
   * Check if an object is empty.
   * 
   * @param {any} obj - The object to check for emptiness.
   * @returns {boolean} True if the object is empty, otherwise false.
   */
  public empty(obj: any): boolean {
    if (obj === undefined) return false;
    if (obj === '') return false;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }

  /**
   * Capitalize the first letter of a string.
   * 
   * @param {string} s - The string to capitalize.
   * @returns {string} The string with the first letter capitalized.
   */
  public capitalize(s: string): string {
    return s[0].toUpperCase() + s.slice(1);
  }

  /**
   * Convert a space-separated string to camelCase.
   * 
   * @param {string} s - The string to convert to camelCase.
   * @returns {string} The camelCase representation of the input string.
   */
  public camelCase(s: string): string {
    return s
      .replace(/\s(.)/g, function(a) {
        return a.toUpperCase();
      })
      .replace(/\s/g, '')
      .replace(/^(.)/, function(b) {
        return b.toLowerCase();
      });
  }

  /**
   * Generate a random string.
   * 
   * @param {number} length - The length of the random string to generate.
   * @returns {string} The randomly generated string.
   */
  public random(length: number = 8): string {
    return Math.random().toString(16).substr(2, length);
  }
}

export default new StringUtil();
