import React, { useEffect } from 'react'
import { IonPage, IonContent } from '@ionic/react'

import Logger from '../../classes/utils/LoggerUtils'
//import GA4Tracker  from '../../classes/integrations/GA4Integration'
import DebugUtils from '../../classes/utils/DebugUtils'
//import CookieConsent from '../CookieConsent'

import PagePropsData from './types'
import './styles.css'

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
    </IonPage>
  );
};

export default Page;