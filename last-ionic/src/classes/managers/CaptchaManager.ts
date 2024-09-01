import LoggerClass, { initializeLogger } from "../utils/LoggerUtils";
import crypto from 'crypto';

/**
 * CaptchaManager is responsible for managing CAPTCHAs, including generating, validating, and tracking CAPTCHAs.
 * This class provides methods to generate CAPTCHAs and validate user responses.
 */
class CaptchaManager {
  private static instance: CaptchaManager | null = null; // Singleton instance
  private logger: LoggerClass;
  private captchaStore: Map<string, { answer: string, timestamp: number }>; // Stores CAPTCHA tokens, their answers, and creation timestamps
  private captchaExpiry: number; // Expiry time for CAPTCHA in milliseconds
  private cleanupInterval: number; // Interval time for periodic cleanup in milliseconds
  private cleanupTimer: NodeJS.Timeout | null = null; // Timer for cleanup interval

  /**
   * Private constructor to initialize CaptchaManager with CAPTCHA expiry settings.
   *
   * @param captchaExpiry - Expiry time for CAPTCHA in milliseconds.
   * @param cleanupInterval - Interval time for periodic cleanup in milliseconds.
   */
  private constructor(captchaExpiry: number = 300000, cleanupInterval: number = 60000) { // Default cleanup interval is 1 minute
    this.captchaStore = new Map();
    this.captchaExpiry = captchaExpiry;
    this.cleanupInterval = cleanupInterval;
    this.logger = initializeLogger(this.constructor.name, false, 100);

    // Start the periodic cleanup
    this.startCleanup();
  }

  /**
   * Get the singleton instance of CaptchaManager.
   * 
   * @returns The singleton instance of CaptchaManager.
   */
  public static getInstance(): CaptchaManager {
    if (this.instance === null) {
      this.instance = new CaptchaManager();
    }
    return this.instance;
  }

  /**
   * Generates a new CAPTCHA token and answer. The CAPTCHA is a simple numeric token for demonstration purposes.
   * 
   * @returns An object containing the CAPTCHA token and the answer.
   */
  public generateCaptcha(): { token: string, answer: string } {
    const token = crypto.randomBytes(3).toString('hex'); // Generate a random 6-character hex string
    const answer = token; // For simplicity, use the token itself as the answer
    const timestamp = Date.now(); // Store the current time as the timestamp
    this.captchaStore.set(token, { answer, timestamp });
    
    // Set expiry time for the CAPTCHA
    setTimeout(() => this.captchaStore.delete(token), this.captchaExpiry);
    
    this.logger.info("CAPTCHA generated", { token });
    return { token, answer };
  }

  /**
   * Validates the provided CAPTCHA token and answer.
   * 
   * @param token - The CAPTCHA token to validate.
   * @param answer - The answer to check against the CAPTCHA.
   * @returns boolean - True if the CAPTCHA is valid, false otherwise.
   */
  public validateCaptcha(token: string, answer: string): boolean {
    const captcha = this.captchaStore.get(token);
    if (captcha && captcha.answer === answer) {
      this.logger.info("CAPTCHA validated successfully", { token });
      this.captchaStore.delete(token); // Remove CAPTCHA after validation
      return true;
    } else {
      this.logger.warn("CAPTCHA validation failed", { token, answer });
      return false;
    }
  }

  /**
   * Removes expired CAPTCHAs from the store.
   */
  private cleanUpExpiredCaptchas(): void {
    const now = Date.now();
    for (const [token, { timestamp }] of this.captchaStore.entries()) {
      if (now - timestamp > this.captchaExpiry) { // Check if CAPTCHA has expired
        this.captchaStore.delete(token);
        this.logger.info("Expired CAPTCHA removed", { token });
      }
    }
  }

  /**
   * Starts a periodic cleanup of expired CAPTCHAs.
   */
  private startCleanup(): void {
    this.cleanupTimer = setInterval(() => this.cleanUpExpiredCaptchas(), this.cleanupInterval);
    this.logger.info("Started CAPTCHA cleanup interval", { interval: this.cleanupInterval });
  }

  /**
   * Stops the periodic cleanup of expired CAPTCHAs.
   */
  public stopCleanup(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.logger.info("Stopped CAPTCHA cleanup interval");
    }
  }
}

export default CaptchaManager;