import LoggerClass, { initializeLogger } from '../utils/LoggerUtils';
import Storage from '../../integrations/StorageIntegration';
import crypto from 'crypto';

/**
 * Interface defining the contract for CaptchaManager operations.
 * This interface ensures that the CaptchaManager can handle CAPTCHA management consistently.
 */
export interface CaptchaManagerInterface {
    generateCaptcha(): { token: string, answer: string };
    validateCaptcha(token: string, answer: string): Promise<boolean>;
    stopCleanup(): void;
    verifyCaptcha(token: string, answer: string): Promise<{ isValid: boolean, message?: string }>;
}


/**
 * CaptchaManager is responsible for managing CAPTCHAs, including generating, validating, and tracking CAPTCHAs.
 * This class provides methods to generate CAPTCHAs, validate user responses, and periodically clean up expired CAPTCHAs.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
 */
class CaptchaManager implements CaptchaManagerInterface {
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
    private constructor(captchaExpiry: number = 300000, cleanupInterval: number = 60000) {
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
     * @param captchaExpiry - Optional expiry time for CAPTCHA in milliseconds.
     * @param cleanupInterval - Optional interval time for periodic cleanup in milliseconds.
     * @returns The singleton instance of CaptchaManager.
     */
    public static getInstance(captchaExpiry?: number, cleanupInterval?: number): CaptchaManager {
        if (this.instance === null) {
            // Use default values if parameters are not provided
            this.instance = new CaptchaManager(
                captchaExpiry ?? 300000,  // Default to 300000ms (5 minutes) if not provided
                cleanupInterval ?? 60000  // Default to 60000ms (1 minute) if not provided
            );
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

        // Optionally, save the CAPTCHA to persistent storage if needed
        Storage.set(token, { answer, timestamp });

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
    public async validateCaptcha(token: string, answer: string): Promise<boolean> {
        const captcha = this.captchaStore.get(token) || await Storage.get(token); // Check in memory or persistent storage
        if (captcha && captcha.answer === answer) {
            this.logger.info("CAPTCHA validated successfully", { token });
            this.captchaStore.delete(token); // Remove CAPTCHA after validation
            await Storage.remove(token); // Optionally remove from persistent storage
            return true;
        } else {
            this.logger.warn("CAPTCHA validation failed", { token, answer });
            return false;
        }
    }

    /**
     * Verifies the provided CAPTCHA token and answer. Similar to validateCaptcha but provides
     * a different interface that might be more suitable for some use cases.
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
                await Storage.remove(token); // Optionally remove from persistent storage
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