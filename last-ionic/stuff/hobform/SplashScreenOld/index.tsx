import React, { useEffect } from 'react'
import { IonImg, IonProgressBar, IonGrid, IonCol, IonRow } from '@ionic/react'
import { getPWADisplayMode } from '../../../data/utils/data'

import { ConMiddle, Middle, Loader, SplashLabel, SplashProgress } from './styles'
import { SplashProps } from './types'
import Storage from '../../../../classes/Storage'
import { appName } from '../../../../env'

const SplashcreenOld: React.FC<SplashProps> = ({ show, setShowSplash, timeout }) => {

  useEffect(() => {
    if(getPWADisplayMode() === 'browser'){
      Storage.get('splashSeenBefore')
      .then(shown => {        
        if (!shown) {
          setShowSplash(true)
          Storage.set('splashSeenBefore', true)
          setTimeout(() => { 
            setShowSplash(false)
          }, timeout)
        }
      })
    }
  }, [setShowSplash, timeout])

  return <>
    {show &&
      <ConMiddle id='splashScreen' className='ion-text-center ion-justify-content-center'>
        <Middle>
          <IonGrid>
            <IonRow>
              <IonCol size='2'></IonCol>
              <IonCol className='blink-slow' size='8'>
                <IonImg
                  alt={''}
                  className='monger'
                  style={{ maxWidth: '200px' }}
                  src={'assets/icon/transp-icon-144.png'}
                />
              </IonCol>
              <IonCol size='2'></IonCol>
            </IonRow>
            <IonRow>
              <IonCol size='2'></IonCol>
              <IonCol size='8'>
                <SplashLabel className='splash-label'>{appName}</SplashLabel>
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
    }
  </>

}

export default React.memo(SplashcreenOld)