// Global imports
import React from 'react';
import { useTranslation } from 'react-i18next';

// Component imports
import './styles.scss';
import { signupForm } from './source';
import PagePropsData from '../../components/Page/types';

// Used Components
import Page from '../../components/Page';
import Header from '../../components/Header';
import Form from '../../components/Form';

// Component Reducer
const SignupPage: React.FC<any> = (pageProps) => {

  const { t } = useTranslation();

  const pageSettings : PagePropsData = {
    settings: {
      id: 'signup-page',
    },
    header: () => {
      const headerProps = {
        title: t('Sign up!'),
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

export default SignupPage;