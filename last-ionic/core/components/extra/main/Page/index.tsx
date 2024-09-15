import React, { useEffect } from 'react'
import { IonPage, IonContent } from '@ionic/react'

import Logger from '../../../classes/utils/LoggerUtils'
//import GA4Tracker  from '../../../../src/integrations/GA4Integration'
import DebugUtils from '../../../classes/utils/DebugUtils'
//import CookieConsent from '../CookieConsent'

import './styles.css'
import PWA from '../PWA'

export interface GA4Event {
  category: string, // Categoría del evento (puede ser cualquier nombre relevante)
  action: string, // Acción realizada (por ejemplo, 'Clic en botón')
  label?: string, // Etiqueta opcional para detalles adicionales
}


export interface GA4Options {
  load?: GA4Event;
  submit?: FormEventsProps
}

export interface FormEventsProps {
  succcess: GA4Event;
  error: GA4Event;
}

export interface IonPageProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  animated?: boolean;
  routerDirection?: 'forward' | 'back' | 'root' | string; // Ajusta según las opciones reales de Ionic
  skeleton?: boolean | false;
  title: string;
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
  useEffect(()=> {
    //if (debug) Logger.info(' • Loading page!');
    //GA4Tracker.trackEvent('load', pageProps.ga4)
  },[ pageProps ])

  return (
    <IonPage {...pageProps.settings}>
      {pageProps.header !== undefined && pageProps.header(pageProps)}
      <IonContent>
        {pageProps.content(pageProps)}
      </IonContent>
      {pageProps.footer !== undefined && pageProps.footer(pageProps)}
      {/*<CookieConsent />*/}
      <PWA/>
    </IonPage>
  );
};

export default Page;