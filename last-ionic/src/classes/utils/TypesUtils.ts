/**
 * Utility class for type conversions, providing helper methods for converting between different
 * data formats such as converting text to character codes, bytes to hexadecimal, and other
 * types of conversions. 
 *
 * This class follows a singleton pattern to ensure only one instance is created.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 7, 2024
 */
class TypesUtils {

  private static instance: TypesUtils | null = null;

  /**
   * Returns the singleton instance of TypesUtils.
   * If no instance exists, it creates one.
   * 
   * @returns {TypesUtils} The singleton instance of TypesUtils.
   */
  public static getInstance(): TypesUtils {
    if (!this.instance) {
      this.instance = new TypesUtils();
    }
    return this.instance;
  }

  /**
   * Converts a text string into an array of character codes.
   * Each character in the string is mapped to its corresponding ASCII or Unicode value.
   * 
   * @param {string} text - The text string to convert.
   * @returns {number[]} An array of numeric character codes representing the input text.
   */
  public textToChars(text: string): number[] {
    return text.split("").map((c) => c.charCodeAt(0));
  }

  /**
   * Converts a byte (number) to its two-character hexadecimal string representation.
   * Pads with a leading zero if necessary to ensure a length of two characters.
   * 
   * @param {number} n - The byte to convert to hexadecimal.
   * @returns {string} The hexadecimal string representation of the byte.
   */
  public byteToHex(n: number): string {
    return ("0" + Number(n).toString(16)).substr(-2);
  }
  
  // Additional type conversion methods can be added here in the future
}

export default TypesUtils.getInstance();
