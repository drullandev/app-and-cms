// Global imports
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { IonContent } from '@ionic/react';
// Component imports
import './styles.scss';

// Used Components
import Page from '../../components/Page';
import Header from '../../components/Header';
import Form from '../../components/Form';
// Used Source
import { signupForm } from './source';
// Used Reducers
import { connect } from '../../reducer/src/connect';
// This component
import { PageProps } from '../../components/Page/types';

// Component Reducer
import { OwnProps, ComponentProps, StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from './reducer'
import i18n from '../../components/_extra/i18n';

const Signup: React.FC<ComponentProps> = (pageProps) => {

  const pageSettings : PageProps = {
    settings: {
      id: 'signup-page',
    },
    header: ()=> {
      const headerProps = {
        label: i18n.t('Signup'),
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
    footer: ()=>{ return <></>}
  };

  return (
    <Page {...pageSettings} />
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({ mapStateToProps, mapDispatchToProps, component: Signup });