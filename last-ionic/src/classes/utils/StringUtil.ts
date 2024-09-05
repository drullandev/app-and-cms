/**
 * Interface for string utility operations.
 */
export interface IStringUtil {
  toCamelCase(str: string): string;
  toSnakeCase(str: string): string;
  toKebabCase(str: string): string;
  empty(obj: any): boolean;
  capitalize(s: string): string;
  camelCase(s: string): string;
  random(length: number, charset?: string): string;
  isValidEmail(email: string): boolean;
  isValidUrl(url: string): boolean;
  truncate(str: string, limit: number): string;
  fuzzyCompare(str1: string, str2: string): number;
  cleanString(str: string): string;
}

/**
 * Utility class for string manipulation operations such as converting string to camelCase,
 * checking if an object is empty, capitalizing the first letter of a string, validating strings,
 * truncating, cleaning strings, and generating random strings.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date September 7, 2024
 */
class StringUtil implements IStringUtil {
  private static instance: StringUtil | null = null;

  /**
   * Provides access to the singleton instance of the StringUtil class.
   * If an instance already exists, it returns that instance; otherwise, it creates a new one.
   * 
   * @returns The singleton instance of StringUtil.
   */
  public static getInstance(): StringUtil {
    if (!this.instance) {
      this.instance = new StringUtil();
    }
    return this.instance;
  }

  /**
   * Convert a hyphen-separated string to camelCase.
   * 
   * @param {string} str - The string to convert to camelCase.
   * @returns {string} The camelCase representation of the input string.
   */
  public toCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  /**
   * Convert a string to snake_case.
   * 
   * @param {string} str - The string to convert to snake_case.
   * @returns {string} The snake_case representation of the input string.
   */
  public toSnakeCase(str: string): string {
    return str.replace(/\s+/g, '_').toLowerCase();
  }

  /**
   * Convert a string to kebab-case.
   * 
   * @param {string} str - The string to convert to kebab-case.
   * @returns {string} The kebab-case representation of the input string.
   */
  public toKebabCase(str: string): string {
    return str.replace(/\s+/g, '-').toLowerCase();
  }

  /**
   * Check if an object is empty, handling arrays, strings, and objects.
   * 
   * @param {any} obj - The object to check for emptiness.
   * @returns {boolean} True if the object is empty, otherwise false.
   */
  public empty(obj: any): boolean {
    if (obj == null || obj === '') return true;  // Handles null, undefined, and empty strings
    if (Array.isArray(obj) && obj.length === 0) return true;  // Check for empty arrays
    if (typeof obj === 'object' && Object.keys(obj).length === 0) return true;  // Check for empty objects
    return false;
  }

  /**
   * Capitalize the first letter of a string.
   * 
   * @param {string} s - The string to capitalize.
   * @returns {string} The string with the first letter capitalized.
   */
  public capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /**
   * Convert a space-separated string to camelCase.
   * 
   * @param {string} s - The string to convert to camelCase.
   * @returns {string} The camelCase representation of the input string.
   */
  public camelCase(s: string): string {
    return s
      .replace(/\s(.)/g, (a) => a.toUpperCase())
      .replace(/\s/g, '')
      .replace(/^(.)/, (b) => b.toLowerCase());
  }

  /**
   * Generate a random string with optional characters to include.
   * 
   * @param {number} length - The length of the random string to generate.
   * @param {string} charset - The set of characters to include in the string.
   * @returns {string} The randomly generated string.
   */
  public random(length: number = 8, charset: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'): string {
    let result = '';
    const charactersLength = charset.length;
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * Validates if a string is a valid email format.
   * 
   * @param {string} email - The string to validate as an email.
   * @returns {boolean} True if the string is a valid email, otherwise false.
   */
  public isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates if a string is a valid URL format.
   * 
   * @param {string} url - The string to validate as a URL.
   * @returns {boolean} True if the string is a valid URL, otherwise false.
   */
  public isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Truncates a string to the specified length and adds an ellipsis (...) if it exceeds the limit.
   * 
   * @param {string} str - The string to truncate.
   * @param {number} limit - The maximum length of the string.
   * @returns {string} The truncated string with ellipsis if necessary.
   */
  public truncate(str: string, limit: number): string {
    return str.length > limit ? str.slice(0, limit) + '...' : str;
  }

  /**
   * Performs a fuzzy comparison between two strings, returning a similarity score.
   * Uses Levenshtein distance algorithm to calculate similarity.
   * 
   * @param {string} str1 - The first string to compare.
   * @param {string} str2 - The second string to compare.
   * @returns {number} A similarity score between 0 and 1 (1 means identical).
   */
  public fuzzyCompare(str1: string, str2: string): number {
    const len1 = str1.length;
    const len2 = str2.length;
    const dp: number[][] = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) dp[i][0] = i;
    for (let j = 0; j <= len2; j++) dp[0][j] = j;

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }

    const distance = dp[len1][len2];
    const maxLen = Math.max(len1, len2);
    return 1 - distance / maxLen; // Similarity score between 0 and 1
  }

  /**
   * Cleans a string by removing non-alphanumeric characters and extra spaces.
   * 
   * @param {string} str - The string to clean.
   * @returns {string} The cleaned string.
   */
  public cleanString(str: string): string {
    return str.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  }
}

export default StringUtil.getInstance();
