// Global imports
import React from 'react';
//import { add } from 'lodash';
import { useTranslation } from 'react-i18next';
import { IonFab, IonFabButton, IonIcon, IonItem, IonText, IonFooter, IonToolbar, IonButtons, IonButton } from '@ionic/react';

// Used Components
import Page from '../../components/Page';
import Header from '../../components/Header';
import Form from '../../components/Form';

// Used Source
import { loginForm } from './source';

// Used Reducers
import { connect } from '../../reducer/src/connect';

// This component
import { PageProps } from '../../components/Page/types';

// Component Reducer
import { OwnProps, ComponentProps, StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from './reducer'
import i18n from '../../components/_extra/i18n';

// Component imports
import './styles.scss';
import './style.css';

const Login: React.FC<ComponentProps> = (pageParams) => {
  
  const { t } = useTranslation();

  const pageSettings : PageProps = {
    settings: {
      id: 'login-page',
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
        title: i18n.t('Login'),
        slot: 'start',
        loading: pageParams.loading || false
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
            <Form {...loginForm(pageParams)} />
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

  return (
    <Page {...pageSettings} />
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({ mapStateToProps, mapDispatchToProps, component: Login });
