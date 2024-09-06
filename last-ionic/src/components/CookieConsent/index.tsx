import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IonButton, IonContent, IonModal } from '@ionic/react';

import AppStorage from '../../classes/integrations/StorageIntegration';
import TimeUtils from '../../classes/utils/TimeUtils';

import './style.css';
import { COOKIE_CONSENT_KEY, COOKIE_EXPIRATION_TIME, COOKIE_CONSENT_KEY_EXPIRE } from './env';

const CookieConsent: React.FC = () => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);

    const load = async () => {
        try {
            const selected = await AppStorage.get(COOKIE_CONSENT_KEY);

            if (selected === null) {
                setShowModal(true);
            } else {
                const consentGiven = selected === "true";
                const expiration = await AppStorage.get(COOKIE_CONSENT_KEY_EXPIRE);
                const expirationTime = Number(expiration);
//TODO: Fix
/* 
                if (expirationTime && TimeUtils.hasElapsed(expirationTime)) { 
                    reset();
                } else if (!consentGiven) {
                    setShowModal(true);
                }
*/
            }
        } catch (error) {
            console.error("Error loading cookie consent data:", error);
            setShowModal(true);
        }
    };

    const set = async (consent: boolean) => {
        try {
            await AppStorage.set(COOKIE_CONSENT_KEY, consent.toString());
            await AppStorage.set(COOKIE_CONSENT_KEY_EXPIRE, TimeUtils.parseFutureTimeString(COOKIE_EXPIRATION_TIME).toString());
            setShowModal(false);
        } catch (error) {
            console.error("Error setting cookie consent data:", error);
        }
    };

    const reset = async () => {
        try {
            await AppStorage.remove(COOKIE_CONSENT_KEY);
            await AppStorage.remove(COOKIE_CONSENT_KEY_EXPIRE);
            setShowModal(true);
        } catch (error) {
            console.error("Error resetting cookie consent data:", error);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <IonModal
            isOpen={showModal}
            onDidDismiss={() => setShowModal(false)}
            initialBreakpoint={0.25}
            breakpoints={[0, 0.25, 0.5, 0.75]}
            handleBehavior="cycle"
        >
            <IonContent className="cookie-modal">
                <h2>{t('Cookies')}</h2>
                <p>
                    {t('This application uses cookies to enhance the user experience. By clicking "Accept," you consent to the use of cookies. You may refuse the use of cookies, but some functionalities may not be available.')}
                </p>
                <IonButton onClick={() => set(true)} expand="full">
                    {t('Accept')}
                </IonButton>
                <IonButton onClick={() => set(false)} expand="full">
                    {t('Refuse')}
                </IonButton>
            </IonContent>
        </IonModal>
    );
};

export default CookieConsent;