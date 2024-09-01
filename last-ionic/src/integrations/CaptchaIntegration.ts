import CaptchaManager, { CaptchaManagerInterface } from "../classes/managers/CaptchaManager";
/**
 * Creates and exports an instance of CaptchaManager configured with the specified expiry time and cleanup interval.
 * 
 * @returns An instance of CaptchaManager configured with the expiry time and cleanup interval settings.
 * 
 * @author 
 * @date September 3, 2024
 */

// captchaConfig.ts
export const CAPTCHA_EXPIRY_TIME = parseInt(process.env.CAPTCHA_EXPIRY_TIME || '300000', 10); // Default to 300000ms (5 minutes)
export const CAPTCHA_CLEANUP_INTERVAL = parseInt(process.env.CAPTCHA_CLEANUP_INTERVAL || '60000', 10); // Default to 60000ms (1 minute)

export const Captcha: CaptchaManagerInterface = CaptchaManager.getInstance();

export default Captcha;