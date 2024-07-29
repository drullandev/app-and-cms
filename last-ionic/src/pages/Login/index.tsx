// Global imports
import React from 'react';
//import { add } from 'lodash';
import { useTranslation } from 'react-i18next';
import { IonFab, IonFabButton, IonIcon, IonItem } from '@ionic/react';

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
    header: ()=> {
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
          <IonItem>{t('Wellcome to Festivore!')}</IonItem>
          <IonItem>{t('Login to your account')}</IonItem>
          <Form {...loginForm(pageParams)} />
        </>
      );
    },
    footer: ()=>{ return <></>}
  };

  return (
    <Page {...pageSettings} />
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({ mapStateToProps, mapDispatchToProps, component: Login });