import TypesUtils from "./TypesUtils";

/**
 * Utility class for cryptographic operations such as encryption and decryption.
 * This class provides methods to encrypt and decrypt text using a XOR operation
 * with a salt value.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
 */
class CryptoUtils {
  private static instance: CryptoUtils | null = null;

  /**
   * Returns the singleton instance of CacheManager.
   * If no instance exists, it creates one with the provided TTL.
   *
   * @param ttlSeconds - The default time-to-live (TTL) for cache entries.
   * @returns The singleton instance of CacheManager.
   */
  public static getInstance(): CryptoUtils {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
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
      .split("")
      .map(TypesUtils.textToChars)
      .map((code: number[]) =>
        TypesUtils.textToChars(salt).reduce((a: any, b: any) => a ^ b, code)
      )
      .map((code: number) => TypesUtils.byteToHex(code))
      .join("");
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
        TypesUtils.textToChars(salt).reduce((a: any, b: any) => a ^ b, code)
      )
      .map((charCode: number) => String.fromCharCode(charCode))
      .join("");
  }
}

export default CryptoUtils.getInstance();
