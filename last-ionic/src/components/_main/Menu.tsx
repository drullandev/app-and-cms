import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonToggle } from '@ionic/react'
import { moonOutline } from 'ionicons/icons'

import useUserStore from '../../stores/user.store'
import Header from '../Header'
import SubMenu from './SubMenu'
import useConfStore from '../../stores/sessions.store'

interface MenuProps extends RouteComponentProps {
  slug: string
}

interface Menu2Props {
  title: string
}

const Menu: React.FC<any> = ({ slug }) => {
  const [menu, setMenu] = useState<Menu2Props>()
  const [menus, setMenus] = useState<MenuProps[]>([])
  const [slot, setSlot] = useState('')

  // Obtener el estado y funciones del store de Zustand
  const {
    darkMode,
    menuEnabled,
    isLoggedIn,
    toogleDarkMode,
    setIsLogged
  } = useUserStore()

  const {
    setMenuEnabled
  } = useConfStore()

  useEffect(() => {
    setSlot('start')
    // Aquí puedes reemplazar la llamada al API por una llamada a tu servicio de datos
    // restGet('menus', { slug: slug })
    //   .then(res => {
    //     setMenu(res.data[0])
    //     setMenus(res.data[0].rows)
    //   })
  }, [slug])

  return (
    <IonMenu key={slug} type='overlay' disabled={!menuEnabled} contentId='main'>
      <IonContent forceOverscroll={false}>
        {menus.map((menu: any, i: number) => (
          <SubMenu key={i} menu={menu} slug={''} rows={[]} title={''} />
        ))}

        <IonList lines='none' key='dark-mode'>
          <IonItem key='dark-mode-item'>
            <IonIcon slot={slot} icon={moonOutline} />
            <IonLabel>Dark Mode {darkMode ? 'true' : 'false'}</IonLabel>
            <IonToggle checked={darkMode} onIonChange={() => toogleDarkMode()} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  )
}

export default Menu
