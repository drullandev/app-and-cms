import React from 'react';
import { IonToolbar, IonText, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { chatboxOutline, planetOutline, happyOutline } from 'ionicons/icons'; // Iconos provisionales
import { useTranslation } from 'react-i18next';

/**
 * Footer component
 * 
 * Displays a footer with help contact and placeholder social media links.
 *
 * @returns JSX.Element
 */
const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <IonToolbar>
      <IonText className="footer-text">
        <p>{t('Need help?')}</p>
        <p>{t('Contact us at support@festivore.com')}</p>
        <p>{t('Follow us on')}</p>
      </IonText>
      <IonButtons slot="end">
        <IonButton href="https://www.facebook.com" target="_blank">
          <IonIcon icon={chatboxOutline} />
        </IonButton>
        <IonButton href="https://www.twitter.com" target="_blank">
          <IonIcon icon={planetOutline} />
        </IonButton>
        <IonButton href="https://www.instagram.com" target="_blank">
          <IonIcon icon={happyOutline} />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};

export default Footer;
