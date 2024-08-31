import TimeUtils from "../utils/TimeUtils";

export interface TrustConfig {
  maxFailedAttempts: number;
  maxActions: number;
  maxRequests: number;
  timeWindow: string; // Use string format for duration (e.g., "15minutes", "2hours")
  blockDuration: string; // Use string format for duration (e.g., "1h", "30m")
  trustScoreThreshold: number; // Threshold for showing CAPTCHA based on trust score
}

/**
 * CheckTrustManager is responsible for managing and evaluating the trustworthiness of users
 * based on their actions, failed attempts, requests, and other criteria provided in TrustConfig.
 *
 * This class performs validations on the TrustConfig to ensure that values are within expected ranges.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 31, 2024
 */
class CheckTrustManager {
  private maxFailedAttempts: number;
  private maxActions: number;
  private maxRequests: number;
  private timeWindow: number;
  private blockDuration: number;
  private trustScoreThreshold: number;

  /**
   * Constructs a new CheckTrustManager with the provided configuration.
   * Validates the configuration to ensure that all values are within expected ranges.
   *
   * @param config - The configuration object containing limits and thresholds for trust management.
   * @throws {Error} If any configuration value is out of the expected range.
   */
  constructor(config: TrustConfig) {
    this.maxFailedAttempts = this.validateNumberInRange(config.maxFailedAttempts, 1, 100, 'maxFailedAttempts');
    this.maxActions = this.validateNumberInRange(config.maxActions, 1, 1000, 'maxActions');
    this.maxRequests = this.validateNumberInRange(config.maxRequests, 1, 1000, 'maxRequests');
    this.timeWindow = this.validateTimeString(config.timeWindow, 'timeWindow');
    this.blockDuration = this.validateTimeString(config.blockDuration, 'blockDuration');
    this.trustScoreThreshold = this.validateNumberInRange(config.trustScoreThreshold, 1, 10, 'trustScoreThreshold');
  }

  /**
   * Validates that a number is within a specified range.
   *
   * @param value - The number to validate.
   * @param min - The minimum acceptable value.
   * @param max - The maximum acceptable value.
   * @param fieldName - The name of the field being validated (for error messages).
   * @returns The validated number if it is within the range.
   * @throws {Error} If the number is out of range.
   */
  private validateNumberInRange(value: number, min: number, max: number, fieldName: string): number {
    if (isNaN(value) || value < min || value > max) {
      throw new Error(`Invalid value for ${fieldName}. Expected a number between ${min} and ${max}, but received ${value}.`);
    }
    return value;
  }

  /**
   * Validates that a time string is in the correct format and converts it to milliseconds.
   *
   * @param timeStr - The time string to validate (e.g., "15minutes", "2hours").
   * @param fieldName - The name of the field being validated (for error messages).
   * @returns The time in milliseconds.
   * @throws {Error} If the time string is in an invalid format.
   */
  private validateTimeString(timeStr: string, fieldName: string): number {
    try {
      return TimeUtils.parseTime(timeStr); // Assuming TimeUtils.parseTime converts the string to milliseconds
    } catch (error) {
      throw new Error(`Invalid value for ${fieldName}. Expected a valid time string (e.g., "15minutes", "2hours"), but received "${timeStr}".`);
    }
  }

  /**
   * Example method to evaluate trust score (this is a placeholder, add your logic).
   * This method would typically compare the user's activity against thresholds
   * to determine if they are trustworthy.
   *
   * @param userActions - Number of actions the user has performed.
   * @param failedAttempts - Number of failed attempts by the user.
   * @returns A trust score based on the user's activity.
   */
  public evaluateTrust(userActions: number, failedAttempts: number): number {
    // Example logic: You might deduct points for each failed attempt and each action.
    let score = 10; // Start with a perfect score of 10

    // Deduct points based on failed attempts
    if (failedAttempts > this.maxFailedAttempts) {
      score -= (failedAttempts - this.maxFailedAttempts);
    }

    // Deduct points based on actions
    if (userActions > this.maxActions) {
      score -= (userActions - this.maxActions) / 10; // Example deduction
    }

    return Math.max(score, 0); // Ensure score doesn't go below 0
  }

  /**
   * Placeholder method for blocking a user based on trust score.
   * This method would implement the logic to block a user when their trust score is too low.
   *
   * @param userId - The ID of the user to block.
   * @param trustScore - The user's trust score.
   * @returns True if the user is blocked, false otherwise.
   */
  public blockUserIfNecessary(userId: string, trustScore: number): boolean {
    if (trustScore < this.trustScoreThreshold) {
      // Block user logic goes here...
      console.log(`User ${userId} is blocked due to low trust score of ${trustScore}.`);
      return true;
    }
    return false;
  }

  /**
   * Placeholder method to reset the trust metrics for a user.
   * This could be useful after a certain time period or after the user takes corrective actions.
   *
   * @param userId - The ID of the user to reset.
   */
  public resetTrustMetrics(userId: string): void {
    // Reset logic goes here...
    console.log(`Trust metrics for user ${userId} have been reset.`);
  }
}

export default CheckTrustManager;
