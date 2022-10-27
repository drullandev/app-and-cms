import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonToggle } from '@ionic/react'

// Extras
import { moonOutline } from 'ionicons/icons'

// Functions
import { connect } from '../../../data/connect'
import { setDarkMode } from '../../../data/user/user.actions'
import { restGet } from '../../../data/utils/rest/rest.utils'

// Components
import Header from './Header'
import SubMenu from './SubMenu'

// Main interfaces
//import { StateProps } from '../../models/StateProps'
import { MenuRowProps } from './interfaces/MenuRowProps'

// Style
import './styles/Menu.css'

interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

export interface StateProps {
  userDarkMode: boolean
  menuEnabled: boolean
  isLoggedIn: boolean
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps {
  slug: string
  rows?: MenuRowProps[]
}

interface Menu2Props {
  title: string
}

const Menu: React.FC<MenuProps> = ({ slug, menuEnabled, userDarkMode, isLoggedIn, history, setDarkMode }) => {

  const [menu, setMenu] = useState<Menu2Props>()
  const [menus, setMenus] = useState<MenuProps[]>([])
  const [slot, setSlot] = useState('')
  useEffect(() => {
    setSlot('start')
    restGet('menus', { slug: slug })
      .then(res => {
        setMenu(res.data[0])
        setMenus(res.data[0].rows)
      })
  }, [slug])

  return (
    <IonMenu key={slug} type='overlay' disabled={!menuEnabled} contentId='main'>

      {/*menu && <Header label={menu.title} loading={false} setLoading={true} />*/}

      <IonContent forceOverscroll={false}>

        {menus.map((menu: any, i: number) => (
          <SubMenu menu={menu} slug={''} rows={[]} title={''} />
        ))}

        <IonList lines='none' key='dark-mode'>

          <IonItem key='dark-mode-item' >
            <IonIcon slot={slot} icon={moonOutline} />
            <IonLabel>Dark Mode {userDarkMode ? 'true' : 'false'}</IonLabel>
            <IonToggle checked={userDarkMode} onClick={() => setDarkMode(!userDarkMode)} />
          </IonItem>

        </IonList>

      </IonContent>

    </IonMenu>
  )

}

export default connect<{}, StateProps, {}>({

  mapStateToProps: (state) => ({
    userDarkMode: state.user.userDarkMode,
    menuEnabled: state.data.menuEnabled,
    isLoggedIn: state.user.isLoggedIn,
  }),
  
  mapDispatchToProps: ({
    setDarkMode
  }),

  component: withRouter(Menu)
  
})
