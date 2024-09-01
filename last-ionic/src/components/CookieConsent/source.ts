import Storage from '../../classes/managers/StorageManager';
import { COOKIE_CONSENT_KEY, COOKIE_EXPIRATION_TIME } from './env';
import Cookies from '../../integrations/CookiesIntegration';

class CookieConsentSource {

    public setCookieConsent(consent: boolean): void {
        Storage.set(COOKIE_CONSENT_KEY, consent);
        
        // Uso del método setCookie en lugar de set
        Cookies.setCookie(COOKIE_CONSENT_KEY, consent.toString(), {
            expires: new Date(Date.now() + COOKIE_EXPIRATION_TIME),
            path: '/',
        });

        document.cookie = 
            `${COOKIE_CONSENT_KEY}=${consent}; expires=${new Date(Date.now() + COOKIE_EXPIRATION_TIME).toUTCString()}; path=/`;
    }

}

export default new CookieConsentSource();
