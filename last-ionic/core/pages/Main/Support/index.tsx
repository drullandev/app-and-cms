// Global imports
import React from 'react';
import { useTranslation } from 'react-i18next';

import Page from '../../../components/Page';
import Header from '../../../components/Header';
import { PagePropsData } from '../../../components/Page';
import Chat from '../../../components/Chat';

const SupportPage: React.FC<any> = (pageProps) => {

  const { t } = useTranslation();

  const pageSettings: PagePropsData = {
    settings: {
      id: 'support-page',
      title: t('Do you have some problem?'),
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

export default SupportPage;
