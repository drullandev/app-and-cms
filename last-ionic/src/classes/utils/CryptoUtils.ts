import CryptoJS from 'crypto-js';

/**
 * Utility class for cryptographic operations such as encryption and decryption.
 * This class provides methods to encrypt and decrypt text using AES encryption
 * with a secret key.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 5, 2024
 */
class CryptoUtils {
  private static instance: CryptoUtils | null = null;

  /**
   * Returns the singleton instance of CryptoUtils.
   * If no instance exists, it creates one.
   *
   * @returns The singleton instance of CryptoUtils.
   */
  public static getInstance(): CryptoUtils {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  /**
   * Encrypts text using AES encryption with a secret key.
   *
   * @param {string} secretKey - The secret key used for encryption.
   * @param {string} text - The text to encrypt.
   * @returns {string} The encrypted text in base64 format.
   */
  public encrypt(secretKey: string, text: string): string {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
  }

  /**
   * Decrypts AES encrypted text using a secret key.
   *
   * @param {string} secretKey - The secret key used for decryption.
   * @param {string} encryptedText - The encrypted text to decrypt.
   * @returns {string} The decrypted text.
   */
  public decrypt(secretKey: string, encryptedText: string): string {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  }
}

export default CryptoUtils.getInstance();
