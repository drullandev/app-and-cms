import DebugUtils from "./DebugUtils";
import Logger from "./LoggerUtils";
import DOMPurify from "dompurify";

class SecurityUtils {

  private csrfTokens: Map<string, string> = new Map();

  private debug: boolean = DebugUtils.setDebug(false);

  constructor(debug = true){
    if(this.debug) Logger.info('SecurityUtils initialized');
  }

  /**
   * Generates a random token for CSRF protection.
   * @returns A random string token.
   */
  private generateRandomToken(): string {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }

  /**
   * Generates a CSRF token for a given session ID.
   * @param sessionId - The session ID for which the CSRF token is generated.
   * @returns The generated CSRF token.
   */
  public generateCsrfToken(keyValue: string): string {
    const token = this.generateRandomToken();
    this.csrfTokens.set(keyValue, token);
    return token;
  }

  /**
   * Generates a Captcha
   * Is mixed with recaptcha for production environment only.
   * @param sessionId - The session ID for which the CSRF token is generated.
   * @returns The generated Captcha token.
   */
  public generateCaptcha(length = 8): string {
    const characters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters[randomIndex];
    }
    return captcha;
  }

  /**
   * Validates a given CSRF token against the stored token for the session ID.
   * @param sessionId - The session ID to validate against.
   * @param token - The CSRF token to validate.
   * @returns True if the token is valid, false otherwise.
   */
  public validateCsrfToken(sessionId: string, token: string): boolean {
    const storedToken = this.csrfTokens.get(sessionId);
    return storedToken === token;
  }

  public approveFormData(data: any, sessionId: string): any | boolean {
    
    const submittedCsrfToken = data.csrf;

    if (this.validateCsrfToken(sessionId, submittedCsrfToken)) {
      if (this.debug) Logger.info('• CSRF Token approved!.');

      const sanitizedData: any = {};
      for (const key in data) {
        if (key !== 'csrf' && key !== 'privacy' && key!== 'publicity') {
          sanitizedData[key] = DOMPurify.sanitize(data[key]);
        }
      }

      Logger.log('• sanitizedData', sanitizedData);
      return sanitizedData;
    } else {
      Logger.error('• Invalid CSRF Token', data);
      return false;
    }
  }
}

export default new SecurityUtils();
