import React, { useEffect } from 'react'
import { IonPage, IonContent } from '@ionic/react'

import Logger from '../../classes/LoggerClass'
import GA4Tracker  from '../../classes/GA4'

import CookieConsent from '../CookieConsent'

import { PageProps } from './types'
import './styles.css'

/**
 * This component is helpfull to generate a Ionic Page
 * David Rullán Díaz
 * - Also integrated with GA4
 * @param pageProps PageProps
 * @returns JSX.IonPage
 */
const Page: React.FC<PageProps> = (pageProps) => {

  useEffect(()=> {
    Logger.info(' • Loading page!');
    GA4Tracker.trackEvent('load', pageProps.ga4)
  })

  return (
    <IonPage {...pageProps.settings}>
      {pageProps.header !== undefined && pageProps.header(pageProps)}
      <IonContent>
        {pageProps.content(pageProps)}
      </IonContent>
      {pageProps.footer !== undefined && pageProps.footer(pageProps)}
      <CookieConsent />
    </IonPage>
  );
};

export default React.memo(Page)