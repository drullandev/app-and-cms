import React from 'react';
import { useTranslation } from 'react-i18next';

// Component imports
import './styles.scss';
import { signupForm } from './source';

import { IPage } from '../../../components/main/Page';
import Page from '../../../components/main/Page';
import Header from '../../../components/main/Header';
import Form from '../../../components/main/Form/index';

// Component Reducer
const SignUp: React.FC<any> = () => {

  const { t } = useTranslation();

  const pageSettings : IPage = {
    settings: {
      id: 'signup-page',
      title: t('Sign up a new account!'),
      description: t('This is the signup page'),
      role: 'main',
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
        //loading: pageProps.loading || false
      }
      return <Header {...headerProps} />
    },
    content: () => {
      return (
        <>
          <Form {...signupForm()} />
        </>
      );
    },
    footer: () => { return <></>}
  };

  return <Page {...pageSettings} />

};

export default SignUp;