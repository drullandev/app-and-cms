import TimeUtils from "../utils/TimeUtils";
import TrustManager from "./TrustManager";
import LoggerClass, { initializeLogger } from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

export interface CaptchaConfig {
  maxFailedAttempts: number;
  maxActions: number;
  maxRequests: number;
  timeWindow: string; // Use string format for duration (e.g., "15minutes", "2hours")
  blockDuration: string; // Use string format for duration (e.g., "1h", "30m")
  trustScoreThreshold?: number; // Optional threshold for showing CAPTCHA based on trust score
}

/**
 * CaptchaManager handles the logic for displaying CAPTCHA based on the user's trustworthiness.
 * It utilizes CheckTrustManager to evaluate user behavior and make decisions.
 * This class can also operate independently to track and determine when to show CAPTCHA.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 31, 2024
 */
class CaptchaManager {
  private static instance: CaptchaManager | null = null;
  private trustManager: TrustManager | null = null;
  private logger: LoggerClass;
  private debug: boolean;

  private failedAttempts: number = 0;
  private userActions: number[] = [];
  private requestTimes: number[] = [];
  private suspiciousIPs: Set<string> = new Set(); // Improved to Set for better performance
  private maxFailedAttempts: number;
  private maxActions: number;
  private maxRequests: number;
  private timeWindow: number;
  private trustScoreThreshold: number; // New property

  /**
   * Constructs a new CaptchaManager with the provided configuration.
   *
   * @param config - Configuration object containing limits for failed attempts,
   * actions, requests, the time window, and block duration.
   */
  private constructor(config?: CaptchaConfig) {
    this.debug = DebugUtils.setDebug(false);
    this.logger = initializeLogger(this.constructor.name, this.debug, 100);

    if (config) {
      this.trustManager = new TrustManager(config);
      this.maxFailedAttempts = config.maxFailedAttempts;
      this.maxActions = config.maxActions;
      this.maxRequests = config.maxRequests;
      this.timeWindow = TimeUtils.parseTime(config.timeWindow);
      this.trustScoreThreshold = config.trustScoreThreshold ?? 5; // Default to 5 if not provided
      this.logger.info(
        "CaptchaManager initialized with custom configuration",
        config
      );
    } else {
      this.maxFailedAttempts = 3;
      this.maxActions = 20;
      this.maxRequests = 60;
      this.timeWindow = 60000; // Default: 1 minute in milliseconds
      this.trustScoreThreshold = 5; // Default threshold
      this.logger.info("CaptchaManager initialized with default configuration");
    }
  }

  /**
   * Retrieves the singleton instance of CaptchaManager.
   * If no instance exists, it creates one with the provided configuration.
   *
   * @param config - Configuration object required for the first initialization.
   * @returns The singleton instance of CaptchaManager.
   */
  public static getInstance(config?: CaptchaConfig): CaptchaManager {
    if (this.instance === null) {
      this.instance = new CaptchaManager(config);
    }
    return this.instance;
  }

  /**
   * Records a failed login attempt by incrementing the failed attempts counter.
   */
  private recordFailedAttempt(): void {
    this.failedAttempts++;
    this.logger.warn("Failed attempt recorded", {
      failedAttempts: this.failedAttempts,
    });
  }

  /**
   * Resets the failed attempts counter to zero.
   */
  private resetFailedAttempts(): void {
    this.failedAttempts = 0;
    this.logger.info("Failed attempts reset");
  }

  /**
   * Records a user action by capturing the current timestamp and filtering out old actions
   * that fall outside the time window.
   */
  private recordUserAction(): void {
    const now = Date.now();
    this.userActions.push(now);

    // Remove actions that fall outside the time window
    this.userActions = this.userActions.filter(
      (timestamp) => now - timestamp <= this.timeWindow
    );

    this.logger.debug("User action recorded", {
      userActions: this.userActions,
    });
  }

  /**
   * Records a request by capturing the current timestamp and filtering out old requests
   * that fall outside the time window.
   */
  private recordRequest(): void {
    const now = Date.now();
    this.requestTimes.push(now);

    // Remove requests that fall outside the time window
    this.requestTimes = this.requestTimes.filter(
      (timestamp) => now - timestamp <= this.timeWindow
    );

    this.logger.debug("Request recorded", { requestTimes: this.requestTimes });
  }

  /**
   * Checks if the given IP address is in the list of suspicious IPs.
   *
   * @param ip - The IP address to check.
   * @returns {boolean} - True if the IP address is suspicious, false otherwise.
   */
  private checkIPAddress(ip: string): boolean {
    const isSuspicious = this.suspiciousIPs.has(ip);
    this.logger.debug(
      `IP address ${ip} checked: ${isSuspicious ? "Suspicious" : "Not Suspicious"}`
    );
    return isSuspicious;
  }

  /**
   * Determines whether the CAPTCHA should be displayed based on the user's trust score
   * or the internal tracking of failed attempts, user actions, and requests.
   *
   * @param ip - The IP address of the user.
   * @returns {boolean} - True if the CAPTCHA should be shown, false otherwise.
   */
  public shouldShowCaptcha(ip: string): boolean {
    if (this.trustManager) {
      const trustScore = this.trustManager.getTrustScore(ip);
      const showCaptcha = trustScore < this.trustScoreThreshold;
      this.logger.info(
        `Captcha decision based on trust score: ${showCaptcha ? "Show" : "Don't Show"}`
      );
      return showCaptcha;
    } else {
      const showCaptcha =
        this.failedAttempts >= this.maxFailedAttempts ||
        this.userActions.length >= this.maxActions ||
        this.checkIPAddress(ip) ||
        this.requestTimes.length > this.maxRequests;

      this.logger.info(
        `Captcha decision based on internal metrics: ${showCaptcha ? "Show" : "Don't Show"}`
      );
      return showCaptcha;
    }
  }

  /**
   * Handles a user action, updating the trust manager or internal counters,
   * and determining if a CAPTCHA is needed.
   *
   * @param ip - The IP address of the user.
   * @param success - Indicates if the action was successful or not.
   * @returns {boolean} - True if the CAPTCHA should be shown, false otherwise.
   */
  public handleUserAction(ip: string, success: boolean): boolean {
    if (this.trustManager) {
      this.logger.debug("Handling user action via Trust Manager", {
        ip,
        success,
      });
      return this.trustManager.handleUserAction(ip, success);
    } else {
      if (!success) {
        this.recordFailedAttempt();
      } else {
        this.resetFailedAttempts();
      }

      this.recordUserAction();
      this.recordRequest();

      return this.shouldShowCaptcha(ip);
    }
  }

  /**
   * Adds an IP address to the list of suspicious IPs.
   *
   * @param ip - The IP address to be added to the suspicious list.
   */
  public addSuspiciousIP(ip: string): void {
    this.suspiciousIPs.add(ip);
    this.logger.warn(`IP address ${ip} added to suspicious list`);
  }

  /**
   * Checks if an IP address is blocked (if using CheckTrustManager).
   *
   * @param ip - The IP address to check.
   * @returns {boolean} - True if the IP address is blocked, false otherwise.
   */
  public isBlocked(ip: string): boolean {
    if (this.trustManager) {
      const blocked = this.trustManager.isBlocked(ip);
      this.logger.info(
        `IP address ${ip} is ${blocked ? "Blocked" : "Not Blocked"}`
      );
      return blocked;
    }
    this.logger.info(`IP address ${ip} is Not Blocked (TrustManager not used)`);
    return false; // Not blocked if not using CheckTrustManager
  }

  /**
   * Displays the CAPTCHA, for example, by triggering a Google reCAPTCHA.
   */
  public showCaptcha(): void {
    this.logger.log("Displaying CAPTCHA");
    // Add logic to display CAPTCHA (e.g., Google reCAPTCHA) here
  }
}

export default CaptchaManager;
