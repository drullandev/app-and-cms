import Storage from '../../classes/Storage'
import { COOKIE_CONSENT_KEY, COOKIE_EXPIRATION_TIME } from './env';
import CookieManager from '../../classes/CookieManager';

class CookieConsentSource {

	public setCookieConsent(consent: boolean): void {
		Storage.set(COOKIE_CONSENT_KEY, consent);
		CookieManager.set(COOKIE_CONSENT_KEY, consent, COOKIE_EXPIRATION_TIME);
		document.cookie = 
				`${COOKIE_CONSENT_KEY}=${consent}; expires=${new Date(Date.now() + COOKIE_EXPIRATION_TIME).toUTCString()}; path=/`;
	}

}

export default new CookieConsentSource();