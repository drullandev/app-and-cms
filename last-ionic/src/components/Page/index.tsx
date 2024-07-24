// Required
import React, { useEffect } from 'react'
import { IonPage, IonContent } from '@ionic/react'
import { PageProps } from './types'
import Logger from '../../classes/LoggerClass'

// Are you testing this tools set && app?
//let debug = testingPage && process.env.REACT_APP_TESTING

/**
 * This component is helpfull to generate a Ionic Page
 * David Rullán Díaz
 * @param pageProps PageProps
 * @returns JSX.IonPage
 */
const Page: React.FC<PageProps> = (pageProps) => {

  useEffect(()=>{
    Logger.info('loading page!')
  },[])
  
  return <IonPage {...pageProps.settings}>
    {pageProps.header !== undefined && pageProps.header()}
    <IonContent>
      {pageProps.content()}
    </IonContent>
    {pageProps.footer !== undefined && pageProps.footer()}
  </IonPage>

}

export default Page