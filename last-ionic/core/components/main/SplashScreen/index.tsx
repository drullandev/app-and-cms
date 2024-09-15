import React from 'react'
import { IonImg, IonProgressBar, IonGrid, IonCol, IonRow, IonPage } from '@ionic/react'
import { ConMiddle, Middle, Loader, SplashLabel, SplashProgress } from './styles'
import { appIcon, appName } from '../../../app/config/env'

const SplashScreen: React.FC = () => {

  return <IonPage>
      <ConMiddle id='splashScreen'
        className='ion-text-center ion-justify-content-center'>
        <Middle className='fade-in-5'>
          <IonGrid>
            <IonRow>
              <IonCol size='2'></IonCol>
              <IonCol className='blink-slow' size='8'>
                <IonImg
                  alt={''}
                  className='monger'
                  style={{ maxWidth: '200px' }}
                  src={appIcon}
                />
              </IonCol>
              <IonCol size='2'></IonCol>
            </IonRow>
            <IonRow>
              <IonCol size='2'></IonCol>
              <IonCol size='8'>
                <SplashLabel
                  className='splash-label'
                >{appName}</SplashLabel>
                <SplashProgress>
                  <IonProgressBar
                    className='progress'
                    style={Loader}
                    type='indeterminate'
                    reversed={true}
                  />
                </SplashProgress>
              </IonCol>
              <IonCol size='2'></IonCol>
            </IonRow>
          </IonGrid>
        </Middle>
      </ConMiddle>
  </IonPage>

}

export default React.memo(SplashScreen)