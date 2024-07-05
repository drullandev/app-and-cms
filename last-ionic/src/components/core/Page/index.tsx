// Required
import React from 'react'
import { IonPage, IonContent } from '@ionic/react'
import { PageProps } from './types'

// Are you testing this tools set && app?
//let debug = testingPage && process.env.REACT_APP_TESTING

/**
 * This component is helpfull to generate a Ionic Page
 * David Rullán Díaz
 * @param pageSettings PageProps
 * @returns JSX.IonPage
 */
const Page: React.FC<PageProps> = (pageSettings) => {
  
  return <IonPage id={pageSettings.id}>
    {pageSettings.header !== undefined && pageSettings.header()}
    <IonContent>
      {pageSettings.content()}
    </IonContent>
    {pageSettings.footer !== undefined && pageSettings.footer()}
  </IonPage>

}

export default Page