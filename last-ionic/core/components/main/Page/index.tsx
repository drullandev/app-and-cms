import React, { useEffect } from 'react'
import { IonPage, IonContent } from '@ionic/react'
import { Helmet } from 'react-helmet';

import LoggerUtils from '../../../classes/utils/LoggerUtils'
//import GA4Tracker  from '../../../../src/integrations/GA4Integration'
import DebugUtils from '../../../classes/utils/DebugUtils'

import './styles.css'
import { GA4Options } from './types'
import useGA4Tracker from '../../../integrations/useGA4Tracker'

export interface IonPageProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  animated?: boolean;
  routerDirection?: 'forward' | 'back' | 'root' | string; // Ajusta según las opciones reales de Ionic
  skeleton?: boolean | false;
  title: string;
  role: string;
  description: string;
  ionViewWillEnter?: () => void;
  ionViewDidEnter?: () => void;
  ionViewWillLeave?: () => void;
  ionViewDidLeave?: () => void;
  componentDidLoad?: () => void;
  componentDidUnload?: () => void;
}

export interface PagePropsData {
  settings: IonPageProps;
  content: Function;
  methods?: any[];
  ga4?: GA4Options;
  captcha?: boolean | undefined;
  header?: Function | undefined;
  footer?: Function | undefined;
  sidenavs?: Function[];
}

/**
 * This component is helpfull to generate a Ionic Page
 * David Rullán Díaz
 * - Also integrated with GA4
 * @param pageProps PagePropsData
 * @returns JSX.IonPage
 */
const Page: React.FC<PagePropsData> = (pageProps) => {

  const debug = DebugUtils.setDebug(false);
  const logger = LoggerUtils.getInstance('Page', debug);

  useEffect(()=> {
    logger.info(' • Loading page!');
    // A GA4 test to track a load, as a "test"...
    useGA4Tracker.sendEvent('load', pageProps.ga4);
  },[ pageProps ])

  return (
    <IonPage {...pageProps.settings}>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME+' - '+pageProps.settings.title}</title>
        <meta name="description" content="This is a brief description of the page content." />
      </Helmet>
      {pageProps.header !== undefined && pageProps.header(pageProps)}
      <IonContent>
        {pageProps.content(pageProps)}
      </IonContent>
      {pageProps.footer !== undefined && pageProps.footer(pageProps)}
      {/*<TabItem
        id={'main-tabs'}
        slot={'button'}
        routes={AppRoutes}
      />*/} 
    </IonPage>
  );
};

export default React.memo(Page);