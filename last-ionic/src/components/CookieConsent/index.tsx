import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IonButton, IonContent, IonModal } from '@ionic/react';

import Storage from '../../classes/managers/StorageManager';
import TimeUtils from '../../classes/utils/TimeUtils';

import './style.css';
import { COOKIE_CONSENT_KEY, COOKIE_EXPIRATION_TIME, COOKIE_CONSENT_KEY_EXPIRE } from './env';

const CookieConsent: React.FC = () => {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);

    const load = async () => {
        try {
            const selected = await Storage.get(COOKIE_CONSENT_KEY);

            if (selected === null) {
                setShowModal(true);
            } else {
                const consentGiven = selected === "true";
                const expiration = await Storage.get(COOKIE_CONSENT_KEY_EXPIRE);
                const expirationTime = Number(expiration);

                if (expirationTime && TimeUtils.hasElapsed(expirationTime)) { // Aquí se usa el método estático directamente desde la clase
                    reset();
                } else if (!consentGiven) {
                    setShowModal(true);
                }
            }
        } catch (error) {
            console.error("Error loading cookie consent data:", error);
            setShowModal(true);
        }
    };

    const set = async (consent: boolean) => {
        try {
            await Storage.set(COOKIE_CONSENT_KEY, consent.toString());
            await Storage.set(COOKIE_CONSENT_KEY_EXPIRE, TimeUtils.parseFutureTimeString(COOKIE_EXPIRATION_TIME).toString());
            setShowModal(false);
        } catch (error) {
            console.error("Error setting cookie consent data:", error);
        }
    };

    const reset = async () => {
        try {
            await Storage.remove(COOKIE_CONSENT_KEY);
            await Storage.remove(COOKIE_CONSENT_KEY_EXPIRE);
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
                <h2>Cookies</h2>
                <p>
                    This application uses cookies to enhance the user experience. 
                    By clicking "Accept," you consent to the use of cookies. 
                    You may refuse the use of cookies, but some functionalities may not be available.
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
