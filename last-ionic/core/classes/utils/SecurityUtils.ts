import DebugUtils from "./DebugUtils";
import LoggerUtils from "./LoggerUtils"; 
import DOMPurify from "dompurify";
import { IFormData } from '../../components/main/Form/types';  // Importa tu interfaz IFormData

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
  private debug: boolean = false;
  private logger: LoggerUtils;
  private csrfTokens: Map<string, Map<string, CsrfTokenData>> = new Map();
  private readonly CSRF_TOKEN_EXPIRATION = 1000 * 60 * 15; // 15 minutes

  constructor(debug: boolean = false) {
    this.debug = DebugUtils.setDebug(debug);
    this.logger = LoggerUtils.getInstance(this.debug, this.constructor.name);
    this.logger.info(`${this.constructor.name} initialized!`);
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
   * Generates a CSRF token for a given session ID and form ID, and stores it with an expiration timestamp.
   * 
   * @param sessionId - The session ID for which the CSRF token is generated.
   * @param formId - The unique form identifier to distinguish tokens between forms.
   * @returns The generated CSRF token.
   */
  public generateCsrfToken(sessionId: string, formId: string): string {
    const token = this.generateRandomToken();
    const expiration = Date.now() + this.CSRF_TOKEN_EXPIRATION;

    if (!this.csrfTokens.has(sessionId)) {
      this.csrfTokens.set(sessionId, new Map());
    }

    const formTokens = this.csrfTokens.get(sessionId)!;
    formTokens.set(formId, { token, expiration });

    this.logger.log(`CSRF token generated for session: ${sessionId}, form: ${formId}`);
    return token;
  }

  /**
   * Validates a given CSRF token against the stored token for the session ID and form ID.
   * Checks if the token is still valid based on its expiration time.
   * 
   * @param sessionId - The session ID to validate against.
   * @param formProps - Contains formId and other potential form-related properties.
   * @param token - The CSRF token to validate.
   * @returns True if the token is valid and not expired, false otherwise.
   */
  public validateCsrfToken(sessionId: string, formProps: IFormData, token: string): boolean {
    const { id: formId } = formProps; // Usar el id del formulario de IFormData
    const formTokens = this.csrfTokens.get(sessionId);
    
    if (!formTokens) {
      this.logger.error(`CSRF token validation failed: no tokens found for session ${sessionId}`);
      return false;
    }

    const csrfData = formTokens.get(formId);
    if (!csrfData) {
      this.logger.error(`CSRF token validation failed: no token found for form ${formId} in session ${sessionId}`);
      return false;
    }

    if (csrfData.expiration < Date.now()) {
      formTokens.delete(formId);
      this.logger.error(`CSRF token expired for form ${formId} in session ${sessionId}`);
      return false;
    }

    const isValid = csrfData.token === token;
    if (!isValid) {
      this.logger.error(`Invalid CSRF token for form ${formId} in session ${sessionId}`);
    }
    
    return isValid;
  }

  /**
   * Approves and sanitizes form data based on CSRF token validation.
   * 
   * @param data - The form data to be validated and sanitized.
   * @param sessionId - The session ID used to validate the CSRF token.
   * @param formProps - The form properties used to validate the CSRF token (contains formId).
   * @returns Sanitized data if valid, otherwise false.
   */
  public approveFormData(data: any, sessionId: string, formProps: IFormData): any | boolean {
    const submittedCsrfToken = data.csrf;

    if (this.validateCsrfToken(sessionId, formProps, submittedCsrfToken)) {
      this.logger.info("CSRF Token approved!");
      const sanitizedData: any = {};
      for (const key in data) {
        if (
          Object.prototype.hasOwnProperty.call(data, key) &&
          !["csrf"].includes(key)
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
