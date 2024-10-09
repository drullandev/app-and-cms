import React from 'react';
import { useTranslation } from 'react-i18next';
import { checkmarkCircleOutline } from 'ionicons/icons';
import { IonIcon, IonItem, IonText, IonFooter, IonContent } from '../../../app/components/Ionic/basic';

import Header from '../../../components/main/Header';
import Form from '../../../components/main/Form/index';
import Page, { PagePropsData } from '../../../components/main/Page';

import { loginFormData } from './forms/login';
import { recoverFormData } from './forms/recover';

import './styles.scss';
import './style.css';
import Footer from '../../../components/design/Footer';

const SignIn: React.FC<any> = (pageProps) => {
  const { t } = useTranslation();
  const pageSettings : PagePropsData = { 
    settings: {
      id: 'login-page',
      title: 'Login page',
      description:'',
      role: 'main',
      //skeleton: false,
      //animated: false,
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
          <Form {...loginFormData()} />

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
          <Footer/>
        </IonFooter>
      );
    }
  };

  return <Page {...pageSettings} />

};

export default SignIn;
