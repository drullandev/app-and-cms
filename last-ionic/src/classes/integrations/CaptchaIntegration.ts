import CaptchaManager, { ICaptchaManager } from "../managers/CaptchaManager";
import Storage from "./StorageIntegration";

export const CAPTCHA_EXPIRY_TIME = parseInt(process.env.CAPTCHA_EXPIRY_TIME || '300000', 10); // Default to 300000ms (5 minutes)
export const CAPTCHA_CLEANUP_INTERVAL = parseInt(process.env.CAPTCHA_CLEANUP_INTERVAL || '60000', 10); // Default to 60000ms (1 minute)

/**
 * Creates and exports an instance of CaptchaManager configured with the specified expiry time and cleanup interval.
 * 
 * @returns An instance of CaptchaManager configured with the expiry time and cleanup interval settings.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date August 31, 2024
 */
export const Captcha: ICaptchaManager = CaptchaManager.getInstance(
  Storage,
  CAPTCHA_EXPIRY_TIME,
  CAPTCHA_CLEANUP_INTERVAL
);

export default Captcha;