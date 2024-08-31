import DebugUtils from "./DebugUtils";
import LoggerClass from "./LoggerUtils"; // Asegúrate de importar LoggerClass correctamente
import DOMPurify from "dompurify";

class SecurityUtils {
  private csrfTokens: Map<string, string> = new Map();
  private debug: boolean = false;
  private logger: LoggerClass;

  constructor(debug: boolean = true) {
    this.debug = DebugUtils.setDebug(debug); // Asume que `setDebug` establece el estado de depuración
    this.logger = LoggerClass.getInstance(
      this.constructor.name,
      this.debug,
      100
    ); // Usa getInstance para crear una instancia de LoggerClass
    if (this.debug) {
      this.logger.info(this.constructor.name + " initialized !!");
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
   * Generates a CSRF token for a given session ID.
   * @param sessionId - The session ID for which the CSRF token is generated.
   * @returns The generated CSRF token.
   */
  public generateCsrfToken(sessionId: string): string {
    const token = this.generateRandomToken();
    this.csrfTokens.set(sessionId, token);
    return token;
  }

  /**
   * Generates a Captcha token.
   * @param length - The length of the captcha token.
   * @returns The generated Captcha token.
   */
  public generateCaptcha(length: number = 8): string {
    const characters =
      "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789";
    let captcha = "";
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

  /**
   * Approves and sanitizes form data based on CSRF token validation.
   * @param data - The form data to be validated and sanitized.
   * @param sessionId - The session ID used to validate the CSRF token.
   * @returns Sanitized data if valid, otherwise false.
   */
  public approveFormData(data: any, sessionId: string): any | boolean {
    const submittedCsrfToken = data.csrf;

    if (this.validateCsrfToken(sessionId, submittedCsrfToken)) {
      if (this.debug) {
        this.logger.info("• CSRF Token approved!");
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

      this.logger.log("• sanitizedData", sanitizedData);
      return sanitizedData;
    } else {
      this.logger.error("• Invalid CSRF Token", data);
      return false;
    }
  }
}

export default new SecurityUtils();
