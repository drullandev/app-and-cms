import DebugUtils from "./DebugUtils";
import LoggerUtils from "./LoggerUtils";

/**
 * CheckTrustManager is responsible for evaluating the trustworthiness of users based on their behavior 
 * and activity within a specified time window. It keeps track of failed login attempts, user actions, 
 * request times, and maintains a list of suspicious IP addresses.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date August 30, 2024
 */
class CheckTrustManager {

    private static instance: CheckTrustManager | null = null; // Singleton instance
    private logger: LoggerUtils; // Logger instance
    private debug: boolean = false; // Debug mode flag

    private failedAttempts: number = 0; // Count of failed login attempts
    private userActions: number[] = []; // Timestamps of user actions
    private requestTimes: number[] = []; // Timestamps of requests made
    private suspiciousIPs: string[] = []; // List of suspicious IP addresses
    private maxFailedAttempts: number; // Maximum allowed failed attempts
    private maxActions: number; // Maximum allowed user actions
    private maxRequests: number; // Maximum allowed requests in the time window
    private timeWindow: number; // Time window in milliseconds for tracking actions
    private blockedIPs: { [key: string]: number } = {}; // Dictionary of blocked IPs with unblock timestamp
    private blocked = false;
    private blockDuration: number; // Default block duration in milliseconds

    /**
     * Constructor to initialize the CheckTrustManager with specific limits for failed attempts, 
     * user actions, requests, the time window, and block duration.
     * 
     * @param maxFailedAttempts - Maximum number of failed login attempts allowed.
     * @param maxActions - Maximum number of actions allowed within the time window.
     * @param maxRequests - Maximum number of requests allowed within the time window.
     * @param timeWindow - Time window in milliseconds for tracking user actions.
     * @param blockDuration - Duration in milliseconds for blocking IPs.
     * @param debug - Flag to enable or disable debug logging.
     */
    private constructor(
        maxFailedAttempts = 3,
        maxActions = 20,
        maxRequests = 60,
        timeWindow = 60000,
        blockDuration = 31536000000,
        debug?: boolean
    ) {
        this.debug = DebugUtils.setDebug(debug ?? this.debug);
        this.logger = LoggerUtils.getInstance(this.constructor.name, this.debug);
        this.maxFailedAttempts = maxFailedAttempts;
        this.maxActions = maxActions;
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.blockDuration = blockDuration;
    }

    /**
     * Get the singleton instance of CheckTrustManager.
     * 
     * @param debug - Flag to enable or disable debug logging.
     * @returns The singleton instance of CheckTrustManager.
     */
    public static getInstance(debug = false): CheckTrustManager {
        if (this.instance === null) {
            this.instance = new CheckTrustManager(undefined, undefined, undefined, undefined, undefined, debug);
        }
        return this.instance;
    }

    /** 
     * Records a failed login attempt by incrementing the failed attempts counter.
     */
    private recordFailedAttempt() {
        this.failedAttempts++;
        this.logger.debug("Failed attempt recorded", { failedAttempts: this.failedAttempts });
    }

    /** 
     * Resets the failed attempts counter to zero.
     */
    private resetFailedAttempts() {
        this.failedAttempts = 0;
        this.logger.debug("Failed attempts counter reset");
    }

    /** 
     * Records a user action by capturing the current timestamp and filtering out old actions 
     * that fall outside the time window.
     */
    private recordUserAction() {
        const now = Date.now();
        this.userActions.push(now);
        this.userActions = this.userActions.filter(timestamp => now - timestamp <= this.timeWindow);
        this.logger.debug("User action recorded", { userActions: this.userActions });
    }

    /** 
     * Records a request by capturing the current timestamp and filtering out old requests 
     * that fall outside the time window.
     */
    private recordRequest() {
        const now = Date.now();
        this.requestTimes.push(now);
        this.requestTimes = this.requestTimes.filter(timestamp => now - timestamp <= this.timeWindow);
        this.logger.debug("Request recorded", { requestTimes: this.requestTimes });
    }

    /** 
     * Checks if the provided IP address is in the list of suspicious IPs.
     * 
     * @param ip - The IP address to check.
     * @returns boolean - True if the IP address is suspicious, false otherwise.
     */
    private checkIPAddress(ip: string): boolean {
        return this.suspiciousIPs.includes(ip);
    }

    /** 
     * Calculates the trust score for a given IP address.
     * 
     * @param ip - The IP address to check.
     * @returns number - The calculated trust score.
     */
    public getTrustScore(ip: string): number {
        let score = 10; // Start with the maximum score

        // Penalize the score based on different criteria
        if (this.failedAttempts >= this.maxFailedAttempts) {
            score -= 5; // Reduce the score if failed attempts exceed the maximum allowed
        }

        if (this.userActions.length >= this.maxActions) {
            score -= 3; // Reduce the score if user actions exceed the maximum allowed
        }

        if (this.checkIPAddress(ip)) {
            score -= 4; // Reduce the score if the IP is suspicious
        }

        if (this.requestTimes.length > this.maxRequests) {
            score -= 2; // Reduce the score if requests exceed the maximum allowed
        }

        // Ensure score is between 0 and 10
        score = Math.max(0, Math.min(10, score));

        if (score === 0) {
            this.blocked = true;
            this.logger.warn(`IP ${ip} has been blocked due to low trust score.`);
        }

        return score;
    }

    /**
     * Handles a user action by recording it and checking if any limits are exceeded.
     * 
     * @param ip - The IP address of the user.
     * @param success - Whether the user action was successful.
     */
    public handleUserAction(ip: string, success: boolean): void {
        if (!success) {
            this.recordFailedAttempt();
        } else {
            this.resetFailedAttempts();
        }

        this.recordUserAction();
        this.recordRequest();
    }

    /**
     * Adds an IP address to the list of suspicious IPs.
     * 
     * @param ip - The IP address to mark as suspicious.
     */
    public addSuspiciousIP(ip: string): void {
        if (!this.suspiciousIPs.includes(ip)) {
            this.suspiciousIPs.push(ip);
            this.logger.info(`IP ${ip} added to suspicious list.`);
            // TODO: Save to database
        }
    }

    /**
     * Removes an IP address from the list of suspicious IPs.
     * 
     * @param ip - The IP address to remove from the suspicious list.
     */
    public removeSuspiciousIP(ip: string): void {
        this.suspiciousIPs = this.suspiciousIPs.filter(suspiciousIP => suspiciousIP !== ip);
        this.logger.info(`IP ${ip} removed from suspicious list.`);
    }

    /**
     * Displays the current trust status of a given IP address.
     * 
     * @param ip - The IP address to check.
     */
    public displayTrustStatus(ip: string): void {
        const trustScore = this.getTrustScore(ip);
        this.logger.log(`El usuario con IP ${ip} tiene un puntaje de confianza de: ${trustScore}`);
    }
}

export default CheckTrustManager;