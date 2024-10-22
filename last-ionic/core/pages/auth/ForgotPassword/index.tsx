import React from 'react';
import { useTranslation } from 'react-i18next';
import { checkmarkCircleOutline } from 'ionicons/icons';
import { IonIcon, IonItem, IonText, IonFooter, IonContent } from '../../../app/components/Ionic/basic';

import Header from '../../../components/main/Header';
import Form from '../../../components/main/Form/index';
import Page, { IPage } from '../../../components/main/Page';

import { forgotPasswordForm } from './source';

import Footer from '../../../components/design/Footer';

const ForgotPassword: React.FC<any> = (pageProps) => {
  const { t } = useTranslation();

  const pageSettings: IPage = {
    settings: {
      id: 'forgot-password-page',
      title: t('Forgot Password'),
      description: '',
      role: 'main',
    },
    ga4: {
      load: {
        category: 'auth',
        action: 'page-load',
        label: 'forgot-password-landing',
      },
    },
    header: () => {
      const headerProps = {
        title: t('Forgot Password'),
        showMenuButton: true,
        slot: 'start',
        loading: pageProps.loading || false,
      };
      return <Header {...headerProps} />;
    },
    content: () => {
      return (
        <IonContent ariaLabel={t('Forgot password page')} className="forgot-password-content">

          {/* Welcome Item */}
          <IonItem ariaLabel="Welcome item" lines="none" className="welcome-item" role="region" ariaLabelledby="welcome-heading welcome-text">
            <IonIcon
              icon={checkmarkCircleOutline}
              color="success"
              className="welcome-icon"
            />
            <IonText id="welcome-text">
              <h2 id="welcome-heading">{t('Welcome back to Festivore!')}</h2>
              <p>
                {t('If you forgot your password, don’t worry. Enter your account email below and we’ll help you reset it.')}
              </p>
            </IonText>
          </IonItem>

          <IonItem
            ariaLabel={t("Reset Password item")}
            lines="none"
            className="forgot-password-item"
            role="region"
            ariaLabelledby="reset-password-heading reset-password-text"
          >
            <IonText id="reset-password-text">
              <h3 id="reset-password-heading">{t('Recover your account')}</h3>
              <p>
                {t('Please enter your email address and check your inbox for instructions on how to reset your password.')}
              </p>
            </IonText>
          </IonItem>

          <hr />
          <IonItem>{t('Enter your email address')}</IonItem>
          <IonItem>{t('We’ll send you instructions to reset your password')}</IonItem>

          {/* Form for recovering password */}
          <Form {...forgotPasswordForm()} />

        </IonContent>
      );
    },
    footer: () => {
      return (
        <IonFooter className="forgot-password-footer">
          <Footer />
        </IonFooter>
      );
    },
  };

  return <Page {...pageSettings} />;
};

export default ForgotPassword;
