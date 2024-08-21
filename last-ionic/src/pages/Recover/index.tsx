// Global imports
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IonItem } from '@ionic/react'

// Used Components
import PagePropsData from '../../components/Page/types'
import Form from '../../components/Form'
import Page from '../../components/Page'
import Header from '../../components/Header'

// Component dependencies
import '../../styles/index.scss'
import { recoverFormData } from './source';

// Component Reducer
const RecoverPage: React.FC<any> = (pageProps) => {

  const { t } = useTranslation();

  const recoverPageData: PagePropsData = {
    settings:{
      id: 'recover-page',
    },
    header: () => {
      const headerProps = {
        title: t('Recover'),
        slot: 'start',
        loading: pageProps.loading || false
      }
      return <Header {...headerProps} />
    },
    content: () => {//Remember, you are in a content yet
      return <>
        <IonItem>{t('Please include here you account mail to recover your account')}</IonItem>
        <IonItem>{t('After that check your email box')}</IonItem>
        <Form {...recoverFormData()} />
      </>
    },
    footer: () => {
      return <></>
    }

  };

  return <Page {...recoverPageData}/>

};

export default RecoverPage;