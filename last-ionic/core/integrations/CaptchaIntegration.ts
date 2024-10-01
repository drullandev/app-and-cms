import CaptchaManager, { ICaptchaManager } from "../classes/managers/CaptchaManager";
import useAppStorage from "./StorageIntegration";
import { captchaExpiryTime, captchaCleanupInterval } from '../app/config/env';

/**
 * Creates and exports an instance of CaptchaManager configured with the specified expiry time and cleanup interval.
 *
 * @returns An instance of CaptchaManager configured with the expiry time and cleanup interval settings.
 */
export const useCaptcha: ICaptchaManager = CaptchaManager.getInstance(
  useAppStorage(),
  captchaExpiryTime, // Default to 3600 seconds if not set
  captchaCleanupInterval // Default to 24 hours if not set
);

export default useCaptcha;