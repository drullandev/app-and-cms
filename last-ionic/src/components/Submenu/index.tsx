import React, { useEffect, useMemo, useState } from 'react'
import { SubmenuProps } from './types'
import { SubMenuList, SubMenuItem } from './styles'

import { IonButton, IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonLabel, IonModal, IonRow, IonThumbnail, useIonLoading } from '@ionic/react'
import { useHistory } from 'react-router'

import { getStorage, clearStorage } from '../../../classes/Storage'
import { translate } from '../../../data/utils/translations'
import { language, logOutOutline } from 'ionicons/icons'
import { t } from 'i18next'

import i18n from '../i18n'
import { ConMiddle, Middle } from '../Pictures/styles'
import { appAssets, accessHref } from '../../config/env'

const Submenu: React.FC<SubmenuProps> = (submenu) => {

  let lang = i18n.language
  
  const history = useHistory()
  const [format, setFormat] = useState<string>('one-column')
  const [loader, dismissLoader] = useIonLoading()
  const [onlineStatus, setOnlineStatus] = useState<boolean>();

  const [showLangModal, setShowLangModal] = useState<boolean>(false);

  const imgUrl = (url: string) => {
    return appAssets +  url.replace('uploads/', "")
  }

  let subObj = useMemo(() => {

    return {

      load: () => {
        if(onlineStatus){}
        window.addEventListener('offline', () => setOnlineStatus(false))
        window.addEventListener('online', () => setOnlineStatus(true))
        let mustColumns = history.location.pathname.split('/')[2] === 'train-yourself'
        if (mustColumns) {
          setFormat('two-columns')
        } else {
          setFormat('one-column')
        }
      },

      changeLanguage: (lang: string) => {
        if (i18n.isInitialized && i18n.language !== lang) {
          i18n.changeLanguage(lang)
          setShowLangModal(false)
        }
      },

      goTo: (url: string) => {
        if (url === '/contact_phone/call-base') {
          getStorage('creator:contact_number')
            .then(contact_number => {
              //PERFORM A EMERGENCY CALL!!
              if(contact_number.phone !== ''){
                let emergencyPhone = 'tel:' + contact_number.phone
                window.open(emergencyPhone, '_self')
              }else{
                alert(t('The base phone was not setted.'))
              }
            })
          return
        } else if (url === '/emergencies_phone/call-emergencies') {
          getStorage('creator:assistance_number')
            .then(assistanceNumber => {
              //PERFORM A ASSISTANCE CALL!!
              let assistancePhone = 'tel:' + assistanceNumber
              window.open(assistancePhone, '_self')
              //window.location.href = assistancePhone
            })
        } else {
          history.replace(url)
        }

      },

      softLogout: () => {
        loader({
          message: t('Login out...'),
          duration: 1000
        })
        history.replace(accessHref)
        dismissLoader()
      },

      hardLogout: async () => {
        loader({
          message: t('Login out...'),
          duration: 1000
        })
        //XXX: Cannot mantain this value: deprecated!
        //sessionStorage.removeItem('creator:id')
        //await removeStorage('creator:id')
        //await removeStorage('selected')
        ////let code = await getStorage('code')
        clearStorage()
        ////await setStorage('code', code)

      }

    }
    
  },[dismissLoader, history, loader, onlineStatus])

  useEffect(() => {
    subObj.load()
  }, [subObj])

  return <>{
    format === 'one-column'
      ? <SubMenuList key={'sub-' + submenu}
        justify={history.location.pathname.split('/')[2] === 'train-yourself' ? 'justify-start' : 'space-evenly'}
      >
        {submenu.submenu && submenu.submenu.map((m: any, index: number) => {
          return <SubMenuItem
            key={'submenu-row-' + m.slug}
            onClick={(e: any) => subObj.goTo('/' + m.ionic_resource + '/' + m.slug)}
            className='hob-submenu-icon'
          >
            <IonThumbnail className='menuIcon'>
              <IonImg alt='' src={imgUrl(m.icon.url)} />
            </IonThumbnail>
            <IonLabel className='roboto bold'>{translate(m.label, 'label')}</IonLabel>
          </SubMenuItem>
        })
        }{history.location.pathname.split('/')[2] === 'home' &&
          <>
            <IonFab vertical='bottom' horizontal='start' slot='fixed' style={{ display: true ? 'block' : 'none' }} >
              <IonFabButton color='soft-blue blink-slow' onClick={() => { subObj.hardLogout().then(()=> history.replace(accessHref)) }}>
                <IonIcon icon={logOutOutline} />
              </IonFabButton>
            </IonFab>
            <IonFab vertical='bottom' horizontal='end' slot='fixed' style={{ display: true ? 'block' : 'none' }} >
              <IonFabButton color='soft-blue blink-slow' onClick={() => { setShowLangModal(true) }}>
                <IonIcon icon={language} />
              </IonFabButton>
            </IonFab>
          </>}
      </SubMenuList>
      : <SubMenuList key={'sub-' + submenu}
        className='no-scroll'
        justify={history.location.pathname.split('/')[2] === 'train-yourself' ? 'space-evenly' : 'space-evenly'}>
        <SubMenuItem className='hob-submenu-icon no-scroll'>
          <IonGrid>
            <IonRow >
              {submenu.submenu && submenu.submenu.map((m: any, index: number) =>
                <IonCol size='6' className='ion-text-center ion-align-content-center' key={'submenu-row-' + m.slug}
                  onClick={(e: any) => subObj.goTo('/' + m.ionic_resource + '/' + m.slug)}
                >
                  <IonImg
                    alt=''
                    className='menuIcon'
                    src={imgUrl(m.icon.url)}
                    style={{ width: '60%', maxWidth: '100px', minHeight: '100px', maxHeight: '', margin: '10% 20%' }}
                  />
                  <IonLabel className='roboto bold'>{translate(m.label, 'label')}</IonLabel>
                </IonCol>
              )}
            </IonRow>
          </IonGrid></SubMenuItem>

      </SubMenuList>
  }
    <IonModal isOpen={showLangModal}>
      <ConMiddle id='splashScreen' className='ion-text-center ion-justify-content-center'>
        <Middle>
          <IonGrid>
            <IonRow>
              <IonCol>
              <IonLabel class="blink-slow" style={{fontSize: '2rem'}}>{t('Select a language!')}</IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol></IonCol>
            </IonRow>
            <IonRow>
              <IonCol size='12' className='ion-text-center ion-justify-content-center'>
                <IonButton color={lang === 'en' ? 'soft-blue' : 'light'}
                onClick={() => subObj.changeLanguage('en')}>{t('English')}</IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size='12' className='ion-text-center ion-justify-content-center'>
                <IonButton color={lang === 'es' ? 'soft-blue' : 'light'}
                onClick={() => subObj.changeLanguage('es')}>{t('Español')}</IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size='12' className='ion-text-center ion-justify-content-center'>
                <IonButton color={lang === 'de' ? 'soft-blue' : 'light'}
                onClick={() => subObj.changeLanguage('de')}>{t('Deutsch')}</IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size='12' className='ion-text-center ion-justify-content-center'>
                <IonButton color={lang === 'fr' ? 'soft-blue' : 'light'} 
                onClick={() => subObj.changeLanguage('fr')}>{t('Français')}</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Middle>
      </ConMiddle>
    </IonModal>
  </>

}

export default React.memo(Submenu)