import DebugUtil from "./DebugUtils";

/**
 * Utility class for cryptographic operations such as encryption and decryption.
 * This class provides methods to encrypt and decrypt text using a XOR operation
 * with a salt value.
 */
 class CryptoUtil {

  private debug = DebugUtil.setDebug(false);

  /**
   * Converts a text string to an array of character codes.
   * 
   * @param {string} text - The text string to convert.
   * @returns {number[]} An array of character codes representing the input text.
   */
  private textToChars(text: string): number[] {
    return text.split('').map((c) => c.charCodeAt(0));
  }

  /**
   * Converts a byte to its hexadecimal representation.
   * 
   * @param {number} n - The byte to convert to hexadecimal.
   * @returns {string} The hexadecimal representation of the input byte.
   */
  private byteToHex(n: number): string {
    return ('0' + Number(n).toString(16)).substr(-2);
  }

  /**
   * Encrypts text using XOR operation with a salt value.
   * 
   * @param {string} salt - The salt value used for encryption.
   * @param {string} text - The text to encrypt.
   * @returns {string} The encrypted text.
   */
  public encrypt(salt: string, text: string): string {
    return text
      .split('')
      .map(this.textToChars)
      .map((code: number[]) =>
        this.textToChars(salt).reduce((a: any, b: any) => a ^ b, code)
      )
      .map((code: number) => this.byteToHex(code))
      .join('');
  }

  /**
   * Decrypts encoded text using XOR operation with a salt value.
   * 
   * @param {string} salt - The salt value used for decryption.
   * @param {string} encoded - The encoded text to decrypt.
   * @returns {string} The decrypted text.
   */
  public decrypt(salt: string, encoded: any): string {
    return encoded
      .match(/.{1,2}/g)
      .map((hex: string) => parseInt(hex, 16))
      .map((code: number) =>
        this.textToChars(salt).reduce((a: any, b: any) => a ^ b, code)
      )
      .map((charCode: number) => String.fromCharCode(charCode))
      .join('');
  }
  
};

export default new CryptoUtil();
