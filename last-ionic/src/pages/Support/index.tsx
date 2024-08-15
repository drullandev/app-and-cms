// Global imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import { IonItem } from '@ionic/react';

// Used Components
import Page from '../../components/Page';
import Header from '../../components/Header';
//import Form from '../../components/Form';

// Used Source
//import { loginFormData } from './source';

// Used Reducers
import { connect } from '../../reducer/src/connect';

// This component
import PagePropsData from '../../components/Page/types';

// Component Reducer
import { OwnProps, ComponentProps, StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from './reducer';

// Component imports
import Chat from '../../components/Chat';

const SupportPage: React.FC<ComponentProps> = (pageProps) => {

  const { t } = useTranslation();

  const pageSettings: PagePropsData = {
    settings: {
      id: 'support-page',
    },
    ga4: {
      load: {
        category: 'support',
        action: 'page-load',
        label: 'support-landing',
      }
    },
    header: () => {
      const headerProps = {
        title: t('Support'),
        slot: 'start',
      };
      return <Header {...headerProps} />;
    },
    content: () => {
      return <Chat />
    },
    footer: () => { return <></> }
  };

  return (
    <Page {...pageSettings} />
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({ mapStateToProps, mapDispatchToProps, component: SupportPage });
