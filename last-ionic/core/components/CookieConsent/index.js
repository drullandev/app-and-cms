import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IonButton, IonContent, IonModal } from '@ionic/react';
import useAppStorage from '../../../../src/integrations/StorageIntegration';
import TimeUtils from '../../classes/utils/TimeUtils';
import './style.css';
import { COOKIE_CONSENT_KEY, COOKIE_EXPIRATION_TIME, COOKIE_CONSENT_KEY_EXPIRE } from './env';
const CookieConsent = () => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    // Obtén la instancia de StorageManager
    const storageManager = useAppStorage();
    const load = async () => {
        try {
            const selected = await storageManager.get(COOKIE_CONSENT_KEY);
            if (selected === null) {
                setShowModal(true);
            }
            else {
                const consentGiven = selected === "true";
                const expiration = await storageManager.get(COOKIE_CONSENT_KEY_EXPIRE);
                const expirationTime = Number(expiration);
                if (expirationTime && TimeUtils.hasElapsed(expirationTime)) {
                    reset();
                }
                else if (!consentGiven) {
                    setShowModal(true);
                }
            }
        }
        catch (error) {
            console.error("Error loading cookie consent data:", error);
            setShowModal(true);
        }
    };
    const set = async (consent) => {
        try {
            await storageManager.set(COOKIE_CONSENT_KEY, consent.toString());
            await storageManager.set(COOKIE_CONSENT_KEY_EXPIRE, TimeUtils.parseFutureTimeString(COOKIE_EXPIRATION_TIME).toString());
            setShowModal(false);
        }
        catch (error) {
            console.error("Error setting cookie consent data:", error);
        }
    };
    const reset = async () => {
        try {
            await storageManager.remove(COOKIE_CONSENT_KEY);
            await storageManager.remove(COOKIE_CONSENT_KEY_EXPIRE);
            setShowModal(true);
        }
        catch (error) {
            console.error("Error resetting cookie consent data:", error);
        }
    };
    useEffect(() => {
        load();
    }, []);
    return (_jsx(IonModal, { isOpen: showModal, onDidDismiss: () => setShowModal(false), initialBreakpoint: 0.25, breakpoints: [0, 0.25, 0.5, 0.75], handleBehavior: "cycle", children: _jsxs(IonContent, { className: "cookie-modal", children: [_jsx("h2", { children: t('Cookies') }), _jsx("p", { children: t('This application uses cookies to enhance the user experience. By clicking "Accept," you consent to the use of cookies. You may refuse the use of cookies, but some functionalities may not be available.') }), _jsx(IonButton, { onClick: () => set(true), expand: "full", children: t('Accept') }), _jsx(IonButton, { onClick: () => set(false), expand: "full", children: t('Refuse') })] }) }));
};
export default CookieConsent;
