import LoggerClass from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";
import axios, { AxiosError } from "axios";

/**
 * CaptchaManager is responsible for handling CAPTCHA verification processes.
 * It verifies CAPTCHA tokens and logs the results of verification attempts.
 */
class CaptchaManager {
  private static instance: CaptchaManager | null = null; // Singleton instance
  private logger: LoggerClass;
  private debug: boolean;
  private captchaEndpoint: string;

  /**
   * Private constructor to initialize the CaptchaManager with a specific CAPTCHA verification endpoint.
   *
   * @param captchaEndpoint - The URL of the CAPTCHA verification endpoint.
   */
  private constructor(captchaEndpoint: string) {
    this.captchaEndpoint = captchaEndpoint;
    this.debug = DebugUtils.setDebug(false); // Adjust as needed
    this.logger = LoggerClass.getInstance(
      this.constructor.name,
      this.debug,
      100
    );

    if (this.debug) {
      this.logger.info("CaptchaManager initialized", { captchaEndpoint });
    }
  }

  /**
   * Get the singleton instance of CaptchaManager.
   *
   * @param captchaEndpoint - The URL of the CAPTCHA verification endpoint.
   * @returns The singleton instance of CaptchaManager.
   */
  public static getInstance(captchaEndpoint: string): CaptchaManager {
    if (this.instance === null) {
      this.instance = new CaptchaManager(captchaEndpoint);
    }
    return this.instance;
  }

  /**
   * Verifies a CAPTCHA token by sending it to the CAPTCHA verification endpoint.
   *
   * @param token - The CAPTCHA token to verify.
   * @returns A promise that resolves with the verification result.
   */
  public async verifyCaptcha(token: string): Promise<boolean> {
    try {
      const response = await axios.post(this.captchaEndpoint, { token });
      if (this.debug) {
        this.logger.info("CAPTCHA verification successful", {
          token,
          response: response.data,
        });
      }
      return response.data.success;
    } catch (error) {
      if (this.debug) {
        this.logger.error("CAPTCHA verification failed", {
          token,
          error: (error as AxiosError).message,
        });
      }
      return false;
    }
  }
}

export default CaptchaManager;
