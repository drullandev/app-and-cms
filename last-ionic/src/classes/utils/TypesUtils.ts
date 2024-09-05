/**
 * This class is a helper to change between strange types: textToChars, byteToHex, 
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
 */
class TypesUtils {

  private static instance: TypesUtils | null = null;

  /**
   * Returns the singleton instance of CacheManager.
   * If no instance exists, it creates one with the provided TTL.
   *
   * @param ttlSeconds - The default time-to-live (TTL) for cache entries.
   * @returns The singleton instance of CacheManager.
   */
  public static getInstance(): TypesUtils {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  /**
   * Converts a text string to an array of character codes.
   *
   * @param {string} text - The text string to convert.
   * @returns {number[]} An array of character codes representing the input text.
   */
  public textToChars(text: string): number[] {
    return text.split("").map((c) => c.charCodeAt(0));
  }

  /**
   * Converts a byte to its hexadecimal representation.
   *
   * @param {number} n - The byte to convert to hexadecimal.
   * @returns {string} The hexadecimal representation of the input byte.
   */
  public byteToHex(n: number): string {
    return ("0" + Number(n).toString(16)).substr(-2);
  }

}

export default TypesUtils.getInstance();