import DebugUtils from '../utils/DebugUtils';
import LoggerUtils, {initLogger } from '../utils/LoggerUtils';
import IStorageManager from './StorageManager'

/**
 * Interface defining the contract for CaptchaManager operations.
 * This interface ensures that the CaptchaManager can handle CAPTCHA management consistently.
 */
export interface ICaptchaManager {
  generateCaptcha(): { token: string, answer: string };
  validateCaptcha(token: string, answer: string): Promise<boolean>;
  stopCleanup(): void;
  verifyCaptcha(token: string, answer: string): Promise<{ isValid: boolean, message?: string }>;
}

/**
 * CaptchaManager is responsible for managing CAPTCHAs, including generating, validating,
 * and tracking CAPTCHAs. This class provides methods to generate CAPTCHAs, validate user responses,
 * and periodically clean up expired CAPTCHAs.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
 */
class CaptchaManager implements ICaptchaManager {
  private static instance: CaptchaManager | null = null; // Singleton instance
  private debug: boolean = false; // Debug mode flag
  private logger: LoggerUtils;
  private captchaStore: Map<string, { answer: string, timestamp: number }>; // Stores CAPTCHA tokens, their answers, and creation timestamps
  private captchaExpiry: number; // Expiry time for CAPTCHA in milliseconds
  private cleanupInterval: number; // Interval time for periodic cleanup in milliseconds
  private cleanupTimer: NodeJS.Timeout | null = null; // Timer for cleanup interval
  private storage: IStorageManager;

  /**
   * Private constructor to initialize CaptchaManager with CAPTCHA expiry settings and storage.
   *
   * @param storage - The storage instance to be used for saving and retrieving CAPTCHAs.
   * @param captchaExpiry - Expiry time for CAPTCHA in milliseconds.
   * @param cleanupInterval - Interval time for periodic cleanup in milliseconds.
   */
  private constructor(storage: IStorageManager, captchaExpiry: number = 300000, cleanupInterval: number = 60000, debug?: boolean) {
    this.debug = DebugUtils.setDebug(debug ?? this.debug);
    this.logger =initLogger(this.constructor.name, this.debug, 100);
    this.captchaStore = new Map();
    this.captchaExpiry = captchaExpiry;
    this.cleanupInterval = cleanupInterval;
    this.storage = storage;
    // Start the periodic cleanup
    this.startCleanup();
  }

  /**
   * Get the singleton instance of CaptchaManager.
   * 
   * @param storage - The storage instance to be used for saving and retrieving CAPTCHAs.
   * @param captchaExpiry - Optional expiry time for CAPTCHA in milliseconds.
   * @param cleanupInterval - Optional interval time for periodic cleanup in milliseconds.
   * @returns The singleton instance of CaptchaManager.
   */
  public static getInstance(storage: IStorageManager, captchaExpiry?: number, cleanupInterval?: number): CaptchaManager {
    if (this.instance === null) {
      this.instance = new this(
        storage,
        captchaExpiry ?? 300000,  // Default to 300000ms (5 minutes) if not provided
        cleanupInterval ?? 60000  // Default to 60000ms (1 minute) if not provided
      );
    }
    return this.instance;
  }

  /**
   * Generates a new CAPTCHA token and answer.
   * The CAPTCHA is a simple numeric token for demonstration purposes.
   * 
   * @returns An object containing the CAPTCHA token and the answer.
   */
  public generateCaptcha(): { token: string, answer: string } {
    const token = this.generateRandomHex(6); // Generate a random 6-character hex string
    const answer = token; // For simplicity, use the token itself as the answer
    const timestamp = Date.now(); // Store the current time as the timestamp
    this.captchaStore.set(token, { answer, timestamp });

    // Optionally, save the CAPTCHA to persistent storage if needed
    this.storage.set(token, { answer, timestamp }).catch(error => this.logger.error('Error saving CAPTCHA to storage', error));

    // Set expiry time for the CAPTCHA
    setTimeout(() => this.captchaStore.delete(token), this.captchaExpiry);

    if (this.debug) this.logger.info("CAPTCHA generated", { token });
    return { token, answer };
  }

  /**
   * Generates a random hexadecimal string of a given length using the browser's crypto API.
   * 
   * @param length - The length of the hexadecimal string to generate.
   * @returns A random hexadecimal string.
   */
  private generateRandomHex(length: number): string {
    const randomValues = new Uint8Array(length / 2); // Each byte generates two hex characters
    window.crypto.getRandomValues(randomValues); // Fill the array with random values
    return Array.from(randomValues)
      .map((byte) => byte.toString(16).padStart(2, '0')) // Convert each byte to a two-character hex string
      .join('');
  }

  /**
   * Validates the provided CAPTCHA token and answer.
   * 
   * @param token - The CAPTCHA token to validate.
   * @param answer - The answer to check against the CAPTCHA.
   * @returns A boolean indicating whether the CAPTCHA is valid.
   */
  public async validateCaptcha(token: string, answer: string): Promise<boolean> {
    const captcha = this.captchaStore.get(token) || await this.storage.get(token); // Check in memory or persistent storage
    if (captcha && captcha.answer === answer) {
      if (this.debug) this.logger.info("CAPTCHA validated successfully", { token });
      this.captchaStore.delete(token); // Remove CAPTCHA after validation
      await this.storage.remove(token); // Optionally remove from persistent storage
      return true;
    } else {
      if (this.debug) this.logger.warn("CAPTCHA validation failed", { token, answer });
      return false;
    }
  }

  /**
   * Verifies the provided CAPTCHA token and answer.
   * Similar to validateCaptcha but provides a different interface that might be more suitable for some use cases.
   * 
   * @param token - The CAPTCHA token to verify.
   * @param answer - The answer to check against the CAPTCHA.
   * @returns An object with `isValid` flag and an optional `message` if verification fails.
   */
  public async verifyCaptcha(token: string, answer: string): Promise<{ isValid: boolean, message?: string }> {
    const isValid = await this.validateCaptcha(token, answer);
    if (isValid) {
      return { isValid: true };
    } else {
      return { isValid: false, message: "CAPTCHA verification failed. Please try again." };
    }
  }

  /**
   * Removes expired CAPTCHAs from the store.
   */
  private async cleanUpExpiredCaptchas(): Promise<void> {
    const now = Date.now();
    for (const [token, { timestamp }] of this.captchaStore.entries()) {
      if (now - timestamp > this.captchaExpiry) { // Check if CAPTCHA has expired
        this.captchaStore.delete(token);
        await this.storage.remove(token); // Optionally remove from persistent storage
        if (this.debug) this.logger.info("Expired CAPTCHA removed", { token });
      }
    }
  }

  /**
   * Starts a periodic cleanup of expired CAPTCHAs.
   */
  private startCleanup(): void {
    this.cleanupTimer = setInterval(() => this.cleanUpExpiredCaptchas(), this.cleanupInterval);
    if (this.debug) this.logger.info("Started CAPTCHA cleanup interval", { interval: this.cleanupInterval });
  }

  /**
   * Stops the periodic cleanup of expired CAPTCHAs.
   */
  public stopCleanup(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      if (this.debug) this.logger.info("Stopped CAPTCHA cleanup interval");
    }
  }
}

export default CaptchaManager;