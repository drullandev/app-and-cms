import CaptchaManager, { ICaptchaManager } from "../managers/CaptchaManager";
import useAppStorage from "./StorageIntegration";

/**
 * Creates and exports an instance of CaptchaManager configured with the specified expiry time and cleanup interval.
 *
 * @returns An instance of CaptchaManager configured with the expiry time and cleanup interval settings.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 31, 2024
 */
export const useCaptcha: ICaptchaManager = CaptchaManager.getInstance(
  useAppStorage(),
  process.env.REACT_APP_CAPTCHA_EXPIRY_TIME,
  process.env.REACT_APP_CAPTCHA_CLEANUP_INTERVAL
);

export default useCaptcha;
