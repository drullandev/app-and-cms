import DebugUtils from "./DebugUtils";
import LoggerUtils from "./LoggerUtils"; 
import DOMPurify from "dompurify";

interface CsrfTokenData {
  token: string;
  expiration: number; // Timestamp in milliseconds
}

/**
 * Utility class for managing security-related functions such as CSRF protection and data sanitization.
 * Provides logging for critical security operations and debugging.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 7, 2024
 */
class SecurityUtils {
  private csrfTokens: Map<string, CsrfTokenData> = new Map();
  private debug: boolean = false;
  private logger: LoggerUtils;
  private readonly CSRF_TOKEN_EXPIRATION = 1000 * 60 * 15; // 15 minutes

  constructor(debug: boolean = true) {
    this.debug = DebugUtils.setDebug(debug);
    this.logger = LoggerUtils.getInstance(this.constructor.name, this.debug, 100);
    if (this.debug) {
      this.logger.info(this.constructor.name + " initialized!");
    }
  }

  /**
   * Generates a random token for CSRF protection.
   * @returns A random string token.
   */
  private generateRandomToken(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  /**
   * Generates a CSRF token for a given session ID and stores it with an expiration timestamp.
   * 
   * @param sessionId - The session ID for which the CSRF token is generated.
   * @returns The generated CSRF token.
   */
  public generateCsrfToken(sessionId: string): string {
    const token = this.generateRandomToken();
    const expiration = Date.now() + this.CSRF_TOKEN_EXPIRATION;
    this.csrfTokens.set(sessionId, { token, expiration });
    
    this.logger.log(`CSRF token generated for session: ${sessionId}`);
    
    return token;
  }

  /**
   * Validates a given CSRF token against the stored token for the session ID.
   * Checks if the token is still valid based on its expiration time.
   * 
   * @param sessionId - The session ID to validate against.
   * @param token - The CSRF token to validate.
   * @returns True if the token is valid and not expired, false otherwise.
   */
  public validateCsrfToken(sessionId: string, token: string): boolean {
    const csrfData = this.csrfTokens.get(sessionId);
    
    if (!csrfData) {
      this.logger.error(`CSRF token validation failed: no token found for session ${sessionId}`);
      return false;
    }

    if (csrfData.expiration < Date.now()) {
      this.csrfTokens.delete(sessionId);
      this.logger.error(`CSRF token expired for session ${sessionId}`);
      return false;
    }

    const isValid = csrfData.token === token;
    
    if (!isValid) {
      this.logger.error(`Invalid CSRF token for session ${sessionId}`);
    }
    
    return isValid;
  }

  /**
   * Approves and sanitizes form data based on CSRF token validation.
   * 
   * @param data - The form data to be validated and sanitized.
   * @param sessionId - The session ID used to validate the CSRF token.
   * @returns Sanitized data if valid, otherwise false.
   */
  public approveFormData(data: any, sessionId: string): any | boolean {
    const submittedCsrfToken = data.csrf;

    if (this.validateCsrfToken(sessionId, submittedCsrfToken)) {
      if (this.debug) {
        this.logger.info("CSRF Token approved!");
      }

      const sanitizedData: any = {};
      for (const key in data) {
        if (
          Object.prototype.hasOwnProperty.call(data, key) &&
          !["csrf", "privacy", "publicity"].includes(key)
        ) {
          sanitizedData[key] = DOMPurify.sanitize(data[key]);
        }
      }

      this.logger.log("Sanitized data", sanitizedData);
      return sanitizedData;
    } else {
      this.logger.error("Invalid CSRF Token", data);
      return false;
    }
  }

  /**
   * Generates a Captcha token.
   * @param length - The length of the captcha token.
   * @returns The generated Captcha token.
   */
  public generateCaptcha(length: number = 8): string {
    const characters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters[randomIndex];
    }
    return captcha;
  }
}

export default new SecurityUtils();
