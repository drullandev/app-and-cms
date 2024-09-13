// Global imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IonIcon, IonItem, IonText, IonFooter, IonContent } from '../../../components/Ionic/basic';
import { checkmarkCircleOutline } from 'ionicons/icons';

// Used Components
import { PagePropsData } from '../../../components/Page';
import Page from '../../../components/Page';
import Header from '../../../components/Header';
import Form from '../../../components/Form';

// Page imports
import { loginFormData, recoverFormData } from './source';
import './styles.scss';
import './style.css';

const LoginPage: React.FC<any> = (pageProps) => {
  
  const { t } = useTranslation();

  const pageSettings : PagePropsData = {
    settings: {
      id: 'login-page',
      title: 'Login page',
      //skeleton: true,
      //animated: "true",
    },
    ga4: {
      load: {
        category: 'auth',
        action: 'page-load',
        label: 'login-landing',
      }
    },
    header: () => {
      const headerProps = {
        title: t('Login'),
        showMenuButton: true,
        slot: 'start',
        loading: pageProps.loading || false,
      }
      return <Header {...headerProps} />
    },
    content: () => {
      return (
        <IonContent ariaLabel={t('Wellcome and login page!')} className="login-content">
          {/* Welcome Item */}
          <IonItem ariaLabel="Welcome item" lines="none" className="welcome-item" role="region" ariaLabelledby="welcome-heading welcome-text">
            <IonIcon
              icon={checkmarkCircleOutline}
              color="success"
              className="welcome-icon"
            />
            <IonText id="welcome-text">
              <h2 id="welcome-heading">{t('Welcome to Festivore!')}</h2>
              <p>
                {t('Join the community and enjoy the best culinary experiences. Login to your account to continue.')}
              </p>
            </IonText>
          </IonItem>

          {/* Login Item */}
          <IonItem
            ariaLabel={t("Login item")}
            lines="none"
            className="login-item"
            role="region"
            ariaLabelledby="login-heading login-text"
          >
            <IonText id="login-text">
              <h3 id="login-heading">{t('Login to your account')}</h3>
              <p>
                {t('Enter your credentials to access your account and start exploring the world of Festivore.')}
              </p>
            </IonText>
          </IonItem>

          {/* Login Form */}
          <Form {...loginFormData(pageProps)} />
          <hr></hr>
          <IonItem>{t('Please include here you account mail to recover your account')}</IonItem>
          <IonItem>{t('After that check your email box')}</IonItem>
          <Form {...recoverFormData()} />

        </IonContent>
      );
    },
    footer: () => {
      return (
        <IonFooter className="login-footer">
          {/*<IonToolbar>
            <IonText className="footer-text">
              <p>{t('Need help?')}</p>
              <p>{t('Contact us at support@festivore.com')}</p>
              <p>{t('Follow us on')}</p>
            </IonText>
            <IonButtons slot="end">
              <IonButton href="https://www.facebook.com" target="_blank">
                <IonIcon name="logo-facebook" />
              </IonButton>
              <IonButton href="https://www.twitter.com" target="_blank">
                <IonIcon name="logo-twitter" />
              </IonButton>
              <IonButton href="https://www.instagram.com" target="_blank">
                <IonIcon name="logo-instagram" />
              </IonButton>
            </IonButtons>
          </IonToolbar>*/}
        </IonFooter>
      );
    }
  };

  return <Page {...pageSettings} />

};

export default LoginPage;
