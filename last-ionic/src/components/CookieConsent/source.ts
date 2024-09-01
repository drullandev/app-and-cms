import Storage from '../../integrations/StorageIntegration';
import { COOKIE_CONSENT_KEY, COOKIE_EXPIRATION_TIME } from './env';
import Cookies from '../../integrations/CookiesIntegration';

class CookieConsentSource {

    /**
     * Sets the cookie consent status in both local storage and cookies.
     * 
     * @param consent - The user's consent status (true for consent, false for no consent).
     */
    public async setCookieConsent(consent: boolean): Promise<void> {
        // Almacena el consentimiento en el almacenamiento local
        await Storage.set(COOKIE_CONSENT_KEY, consent.toString());

        // Almacena el consentimiento en una cookie con una fecha de expiración
        Cookies.set(COOKIE_CONSENT_KEY, consent.toString(), {
            expires: new Date(Date.now() + COOKIE_EXPIRATION_TIME),
            path: '/',
        });

        // Alternativamente, se puede usar document.cookie para establecer la cookie manualmente
        document.cookie = 
            `${COOKIE_CONSENT_KEY}=${consent}; expires=${new Date(Date.now() + COOKIE_EXPIRATION_TIME).toUTCString()}; path=/`;
    }

    /**
     * Retrieves the cookie consent status from either local storage or cookies.
     * 
     * @returns The user's consent status as a boolean.
     */
    public async getCookieConsent(): Promise<boolean> {
        const storedConsent = await Storage.get(COOKIE_CONSENT_KEY);
        if (storedConsent !== null) {
            return storedConsent === 'true';
        }

        const cookieConsent = Cookies.get(COOKIE_CONSENT_KEY);
        return cookieConsent === 'true';
    }

    /**
     * Clears the cookie consent status from both local storage and cookies.
     */
    public async clearCookieConsent(): Promise<void> {
        await Storage.remove(COOKIE_CONSENT_KEY);

        Cookies.delete(COOKIE_CONSENT_KEY);

        // Alternativamente, se puede usar document.cookie para eliminar la cookie manualmente
        document.cookie = 
            `${COOKIE_CONSENT_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
}

export default new CookieConsentSource();