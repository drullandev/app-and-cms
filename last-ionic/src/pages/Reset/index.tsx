// Global imports
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IonItem } from '@ionic/react'

// Used Components
import PagePropsData from '../../components/Page/types'
import Form from '../../components/Form'
import Page from '../../components/Page'
import Header from '../../components/Header'

// The component imports
import resetFormData from './source';
import '../../styles/index.scss'

// Component Reducer
import { connect } from '../../reducer/src/connect'
import { OwnProps, ComponentProps, StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from './reducer'

const ResetPage: React.FC<ComponentProps> = (pageProps) => {

  const { t } = useTranslation();
 
  const resetPageData: PagePropsData = {
    settings:{
      id: 'reset-page',
    },
    captcha: true,
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

export default connect<OwnProps, StateProps, DispatchProps>({ mapStateToProps, mapDispatchToProps, component: ResetPage });