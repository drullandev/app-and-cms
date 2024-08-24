class CaptchaManager {

  // Tracks the number of failed login attempts
  private failedAttempts: number = 0;

  // Stores timestamps of user actions to monitor activity frequency
  private userActions: number[] = [];

  // Stores timestamps of request attempts to monitor request frequency
  private requestTimes: number[] = [];

  // Stores a list of suspicious IP addresses
  // TODO: Persist this list in a database for better security tracking
  private suspiciousIPs: string[] = [];

  // Configuration properties for managing CAPTCHA logic
  private maxFailedAttempts: number;
  private maxActions: number;
  private maxRequests: number;
  private timeWindow: number;

  // Holds the singleton instance of CaptchaManager
  private static instance: CaptchaManager | null = null;

  /**
   * Constructs a new CaptchaManager with the specified limits.
   * @param maxFailedAttempts - Maximum number of failed attempts before showing CAPTCHA.
   * @param maxActions - Maximum number of actions allowed within the time window.
   * @param maxRequests - Maximum number of requests allowed within the time window.
   * @param timeWindow - Time window for rate limiting, in milliseconds.
   */
  constructor(maxFailedAttempts = 3, maxActions = 20, maxRequests = 60, timeWindow = 60000) {
    this.maxFailedAttempts = maxFailedAttempts;
    this.maxActions = maxActions;
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow; // Time window in milliseconds (default is 1 minute)
  }

  /**
   * Retrieves the singleton instance of CaptchaManager.
   * If no instance exists, it creates one.
   * @returns The singleton instance of CaptchaManager.
   */
  public static getInstance(): CaptchaManager {
    if (this.instance === null) {
      // Instantiate CaptchaManager if no instance exists
      this.instance = new CaptchaManager();
    }
    return this.instance;
  }

  /**
   * Determines whether the CAPTCHA should be displayed based on user activity.
   * @param ip - The IP address of the user.
   * @returns True if the CAPTCHA should be shown, otherwise false.
   */
  public shouldShowCaptcha(ip: string): boolean {
    return (
      this.failedAttempts >= this.maxFailedAttempts || // Check if failed attempts exceed the limit
      this.userActions.length >= this.maxActions || // Check if user actions exceed the limit
      this.checkIPAddress(ip) || // Check if the IP is flagged as suspicious
      this.requestTimes.length > this.maxRequests // Check if requests exceed the limit
    );
  }

  /**
   * Handles a login attempt, updating failure count and activity tracking.
   * Determines if CAPTCHA should be shown as a result.
   * @param ip - The IP address of the user.
   * @param success - Whether the login attempt was successful.
   * @returns True if CAPTCHA should be shown, otherwise false.
   */
  public handleLoginAttempt(ip: string, success: boolean): boolean {
    if (!success) {
      this.recordFailedAttempt(); // Record a failed attempt if login was unsuccessful
    } else {
      this.resetFailedAttempts(); // Reset failed attempts on successful login
    }

    this.recordUserAction(); // Record the user action timestamp
    this.recordRequest(); // Record the request timestamp

    return this.shouldShowCaptcha(ip); // Determine if CAPTCHA should be shown
  }

  /**
   * Displays the CAPTCHA. Implementation should be added as needed.
   * Example: Google reCAPTCHA integration.
   */
  public showCaptcha() {
    console.log("Mostrar CAPTCHA"); // Placeholder for CAPTCHA display logic
  }

  /**
   * Increments the count of failed login attempts.
   */
  private recordFailedAttempt() {
    this.failedAttempts++;
  }

  /**
   * Resets the count of failed login attempts to zero.
   */
  private resetFailedAttempts() {
    this.failedAttempts = 0;
  }

  /**
   * Records the timestamp of a user action and purges old actions outside the time window.
   */
  private recordUserAction() {
    const now = Date.now();
    this.userActions.push(now);

    // Remove any actions that occurred outside of the defined time window
    this.userActions = this.userActions.filter(timestamp => now - timestamp <= this.timeWindow);
  }

  /**
   * Records the timestamp of a request and purges old requests outside the time window.
   */
  private recordRequest() {
    const now = Date.now();
    this.requestTimes.push(now);

    // Remove any requests that occurred outside of the defined time window
    this.requestTimes = this.requestTimes.filter(timestamp => now - timestamp <= this.timeWindow);
  }

  /**
   * Checks if a given IP address is marked as suspicious.
   * @param ip - The IP address to check.
   * @returns True if the IP is suspicious, otherwise false.
   */
  private checkIPAddress(ip: string): boolean {
    return this.suspiciousIPs.includes(ip);
  }

}

// Export the singleton instance of CaptchaManager for use in the application
export const CaptchaManagerInstance = CaptchaManager.getInstance();

export default CaptchaManagerInstance;
