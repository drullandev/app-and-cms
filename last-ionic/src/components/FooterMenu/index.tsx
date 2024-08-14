import React, { useEffect, useMemo, useState } from 'react'
import { IonFooter, IonGrid, IonRow, IonCol, IonToolbar, IonImg, IonLabel, getConfig } from '@ionic/react'
//import { MenuProps } from '../../../data/models/Menu'
import { getStorage } from '../../../data/utils/storage'
import { useHistory } from "react-router"
//import { translate } from '../../../data/utils/translations'
import { appAssets, menuSettings } from '../../../../env'

export interface FooterProps {
  index?: number
  path?: string
}

export interface Icon {
  url: string
}

export interface Label {
  id: number
  label: string
  language: Language
}

export interface Language {
  id: number
  name: string
  code: string
}

export interface MenuProps {
  name: string
  slug : string
  access?: string
  ionic_resource: string
  section: string
  icon: Icon
  icon_inactive: Icon
  background_color?: string
  order?: any
  lang?: string
  label: {
    id: number
    label: string
    language: Language
  }[]
  parent_menu: {
    id: number
    label:Label[]
  }
  has_main?: boolean,
  loading?: boolean
}

const FooterMenu: React.FC<FooterProps> = ({ index = 0, path = '' }) => {
  
  const ios = 'ios' === getConfig()!.get('mode')
  const history = useHistory()
  const [mainMenu, setMainMenu] = useState<MenuProps[]>([])
  const [showFooter, setShowFooter] = useState(true)
  const [footerIndex, setFooterIndex] = useState(index)

  const imgUrl = (url: string) => {
    return appAssets +  url.replace('uploads/', "")
    //return (onlineStatus ? apiUrl : 'assets/images') + url
  }

  const footer = useMemo(() => { 
    return {
      load: (index: number, path: string) => {
        footer.toggleShowHide()
        getStorage('mainMenu').then(footer.setMain)
        if (path !== '') footer.toggleMenu(path)
      },
      setMain: (mainMenu: MenuProps[]) => {
        if (!mountedRef.current) return; // Check if the component is still mounted before updating the state
        setMainMenu(mainMenu)
        // footer.boldSubmenu()
      },
      handleClick: (parent: any) => {
        footer.toggleShowHide()
        history.replace(parent)
      },
      toggleShowHide: () => {
        let show = menuSettings.hiddenFooter.indexOf(history.location.pathname) === -1
        if (!show) setShowFooter(show)
      },
      toggleMenu: (path: any) => {
        let p = path.split('/')
        switch (p[2]) {
          case 'explore-and-equip':
            setFooterIndex(1);
            break;
          case 'assistance':
            setFooterIndex(3);
            break;
          case 'routes':
            setFooterIndex(1);
            break;
        }
      }
    }
  },[history])

  const mountedRef = React.useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false; // Cleanup function to mark the component as unmounted
    };
  }, []);

  useEffect(() => {
    footer.load(footerIndex, path)
  }, [footerIndex, footer, path])

  return (
    <IonFooter id='footer' slot='bottom' style={{ display: showFooter ? 'block' : 'none' }}>
      <IonToolbar style={{ padding: ios ? '0 0 15px 0' : '0' }}>
        <IonGrid style={{ padding: '0' }}>
          <IonRow>
            {mainMenu && mainMenu.map((r: MenuProps, i: number) => (
              <IonCol
                size='3'
                style={{ padding: '0' }}
                key={'footer-alt-' + r.slug}
                className='cursor-pointer ion-text-center ion-align-content-center'
                onClick={() => { footer.handleClick('/' + r.ionic_resource + '/' + r.slug) }}
              >
                <IonImg
                  id={'button-' + r.slug}
                  alt=''
                  style={{ maxHeight: '90px', maxWidth: '70px', width: '80%', margin: '0 auto' }}
                  className='cursor-pointer'
                  src={footerIndex === i
                    ? imgUrl(r.icon.url)
                    : imgUrl(r.icon_inactive.url)}
                  onClick={() => { footer.handleClick('/' + r.ionic_resource + '/' + r.slug) }}
                />
                <IonLabel className='roboto' style={{ fontWeight: footerIndex === i ? /*'bold'*/ 'light' : 'light', fontSize: '0.6rem' }}>{translate(r.label, 'label')}</IonLabel>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  )
}

export default React.memo(FooterMenu)