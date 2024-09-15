// Global imports
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IonItem } from '@ionic/react'

// Used Components
import { PagePropsData } from '../../../components/main/Page';
import Form from '../../../components/main/Form/index'
import Page from '../../../components/main/Page'
import Header from '../../../components/main/Header'

// The component imports
import resetFormData from './source';

// Component Reducer
const ResetPage: React.FC<any> = (pageProps) => {

  const { t } = useTranslation();
 
  const resetPageData: PagePropsData = {
    settings:{
      title: t('Reset your password'),
      id: 'reset-page',
    },
    captcha: false,
    header: () => {
      const headerProps = {
        title: t('Reset Password'),
        slot: 'start',
        loading: pageProps.loading || false
      }
      return <Header {...headerProps} />
    },
    content: () => {//Remember, you are in a content yet
      return <>
        <IonItem>{t('Please include here you account mail to recover your account')}</IonItem>
        <IonItem>{t('After that check your email box')}</IonItem>
        <Form {...resetFormData()} />
      </>
    },
    footer: () => {
      return <></>
    }

  };

  return <Page {...resetPageData}/>

};

export default ResetPage;