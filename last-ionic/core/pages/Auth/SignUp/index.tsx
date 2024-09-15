// Global imports
import React from 'react';
import { useTranslation } from 'react-i18next';

// Component imports
import './styles.scss';
import { signupForm } from './source';
import { PagePropsData } from '../../../components/Page';

// Used Components
import Page from '../../../components/Page';
import Header from '../../../components/Header';
import Form from '../../../components/Form/index';

// Component Reducer
const SignUp: React.FC<any> = (pageProps) => {

  const { t } = useTranslation();

  const pageSettings : PagePropsData = {
    settings: {
      id: 'signup-page',
      title: t('Sign up a new account!'),
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
        title: t('Sign up!'),
        showMenuButton: true,
        slot: 'start',
        loading: pageProps.loading || false
      }
      return <Header {...headerProps} />
    },
    content: () => {
      return (
        <>
          <Form {...signupForm(pageProps)} />
        </>
      );
    },
    footer: () => { return <></>}
  };

  return <Page {...pageSettings} />

};

export default SignUp;