// Global imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IonIcon, IonItem, IonText, IonFooter, IonToolbar, IonButtons, IonButton } from '@ionic/react';

// Used Components
import PagePropsData from '../../components/Page/types';
import Page from '../../components/Page';
import Header from '../../components/Header';
import Form from '../../components/Form';

// Component Reducer
import { connect } from '../../reducer/src/connect';
import { OwnProps, ComponentProps, StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from './reducer'

// Component imports
import { loginFormData } from './source';
import './styles.scss';
import './style.css';
import useStore from '../../store/useStore';

const LoginPage: React.FC<ComponentProps> = (pageProps) => {
  
  const { t } = useTranslation();
  const { darkMode, toogleDarkMode } = useStore();
  const pageSettings : PagePropsData = {
    settings: {
      id: 'login-page',//Concern css classes, for now!
      //skeleton: true
      //animated: "true"
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
        slot: 'start',
        loading: pageProps.loading || false
      }
      return <Header {...headerProps} />
    },
    content: () => {
      return (
        <>
          <div className="login-content">
            <IonItem lines="none" className="welcome-item">
              <IonIcon name="checkmark-circle-outline" color="success" className="welcome-icon" />
              <IonText>
                <h2>{t('Welcome to Festivore!')}</h2>
                <p>{t('Join the community and enjoy the best culinary experiences. Login to your account to continue.')}</p>
              </IonText>
            </IonItem>
            <IonItem lines="none" className="login-item">
              <IonText>
                <h3>{t('Login to your account')}</h3>
                <p>{t('Enter your credentials to access your account and start exploring the world of Festivore.')}</p>
              </IonText>
            </IonItem>
            <IonButton onClick={toogleDarkMode}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </IonButton>
            <Form {...loginFormData(pageProps)} />
          </div>
        </>
      );
    },
    footer: () => {
      return (
        <IonFooter className="login-footer">
          <IonToolbar>
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
          </IonToolbar>
        </IonFooter>
      );
    }
  };

  return <Page {...pageSettings} />

};

export default connect<OwnProps, StateProps, DispatchProps>({ mapStateToProps, mapDispatchToProps, component: LoginPage });
