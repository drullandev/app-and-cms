import React, { useEffect, useState } from 'react'
import { IBeforeInstallPromptEvent } from './types'
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonLabel, IonModal, IonRow } from '@ionic/react'
import { useTranslation } from 'react-i18next'
import { closeOutline } from 'ionicons/icons'
import { splashScreen } from '../../../app/config/env'

const useAddToHomescreenPrompt = (): [IBeforeInstallPromptEvent | null, () => void, boolean] => {

  const { t } = useTranslation();
  const [prompt, setPrompt] = useState<IBeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt()
    } else {
      return Promise.reject(new Error(t('Tried installing before browser sent "beforeinstallprompt" event') ?? 'Tried installing before browser sent "beforeinstallprompt" event'))
    }
  }     
    
  useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault()
      setPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', ready as any)
    return () => window.removeEventListener('beforeinstallprompt', ready as any)      
  }, [])

  useEffect(() => {
    const onInstall = () => setIsInstalled(true)
    window.addEventListener('appinstalled', onInstall as any)    
    return () => window.removeEventListener('appinstalled', onInstall as any)      
  }, [])

  return [prompt, promptToInstall, isInstalled]

}

const PWA: React.FC = () => {

  const { t } = useTranslation();

  const [loading, setLoading] = useState(false)

  const pwa = {

    getPWADisplayMode: () => {
      return (document.referrer.startsWith('android-app://'))
        ? 'twa' : window.matchMedia('(display-mode: standalone)').matches
         ? 'standalone' 
           : 'browser'
    },

    usePwaModal: () => {

      const [prompt, promptToInstall, isInstalled] = useAddToHomescreenPrompt()
      const [isVisible, setVisibleState] = useState<boolean>(false)
      const displayMode = pwa.getPWADisplayMode()

      const show = !isInstalled && displayMode === 'browser'
      const hide = () => setVisibleState(false)

      useEffect(() => {
        const ac = new AbortController()
          setTimeout(() => {
            //setVisibleState(show)
          }, splashScreen.showDuration)
        return () => ac.abort()
      }, [prompt])

      return <IonModal isOpen={isVisible} className='groc' >
        <IonContent className='no-scroll groc' style={{ height: '100vh' }}>

          <IonGrid id='place-grid' className='groc' style={{ height: '100vh' }}>
            
            <IonRow>
              <IonCol size='2'></IonCol>
              <IonCol size='8'>
                <IonRow>
                  <IonCol>
                    <IonLabel style={{ fontWeight: 'bold', fontSize: '1.2rem' }}></IonLabel>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonLabel style={{ fontSize: '14px' }}></IonLabel>
                  </IonCol>
                </IonRow>
              </IonCol>
              <IonCol size='2' onClick={hide} className='cursor-pointer'>
                <IonIcon size='large' icon={closeOutline} />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size='4'></IonCol>
              <IonCol className='blink-slow' size='4'>
                <IonImg
                  alt=''
                  className='monger'
                  style={{ maxWidth: '200px' }}
                  src={'assets/icon/transp-icon-512.png'}
                />
              </IonCol>
              <IonCol size='4'></IonCol>
            </IonRow>

            <IonRow style={{ height: '5vh' }}>
              <IonCol size='1'></IonCol>
              <IonCol size='10' className='ion-text-center' >
                <IonLabel className='bold fade-in-2' style={{ fontSize: '1.2rem' }}>
                  {/*t(translations.wannaAddHomeScreen)*/}                  
                </IonLabel>
              </IonCol>
              <IonCol size='1'></IonCol>
            </IonRow>
            <IonRow></IonRow>
            <IonRow></IonRow>

            <IonRow style={{ height: '5vh' }}>
              <IonCol size='1'></IonCol>
              <IonCol size='10' className='ion-text-center'>
                <IonLabel className='bold fade-in-2'>
                  <IonButton
                    color='soft-blue' style={{ margin: '10% 0' }}
                    onClick={promptToInstall} strong={undefined} disabled={undefined} size={undefined} fill={undefined} mode={undefined} href={undefined} routerAnimation={undefined} rel={undefined} target={undefined} buttonType={undefined} download={undefined} expand={undefined} onIonBlur={undefined} onIonFocus={undefined} shape={undefined} type={undefined}>
                      {/*t(translations.addHomescreen)*/}
                    </IonButton>
                </IonLabel>
              </IonCol>
              <IonCol size='1'></IonCol>
            </IonRow>

          </IonGrid>

        </IonContent>

      </IonModal>

    },

  }

  return <>{!loading && pwa.usePwaModal()}</>

}

export default React.memo(PWA)