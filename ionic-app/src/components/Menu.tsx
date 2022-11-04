import React from 'react'
import { RouteComponentProps, withRouter, useLocation } from 'react-router'

import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle } from '@ionic/react'

import { connect } from '../data/connect'
import { setDarkMode } from '../data/user/user.actions'

import '../styles/Menu.css'
import { useTranslation } from 'react-i18next'

import { routes } from '../data/static/routes'


interface Pages {
  title: string,
  path: string,
  icon: string,
  routerDirection?: string
}
interface StateProps {
  darkMode: boolean
  isAuthenticated: boolean
  menuEnabled: boolean
}

interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

const Menu: React.FC<MenuProps> = ({
  //darkMode,
  //history,
  isAuthenticated,
  setDarkMode,
  menuEnabled
}) => {

  const location = useLocation()
  const { t } = useTranslation()

  const renderlistItems = (list: Pages[]) => {    
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem
            detail={false}
            routerLink={p.path}
            routerDirection="none"
            className={location.pathname.startsWith(p.path) ? 'selected' : undefined}
          >
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ))
  }

  return (
    <IonMenu  type="overlay" disabled={!menuEnabled} contentId="main">
      <IonContent forceOverscroll={false}>

        <IonList lines="none">
          <IonListHeader>{t('Account')}</IonListHeader>
          {isAuthenticated
            ? renderlistItems(routes.loggedInPages)
            : renderlistItems(routes.loggedOutPages)
          }
          {renderlistItems(routes.appPages)}
        </IonList>

        <IonList lines="none">
          {/*<IonListHeader>Tutorial</IonListHeader>
          <IonItem button onClick={() => {
            history.push('/tutorial')
          }}>
            <IonIcon slot="start" icon={hammer} />
            Show Tutorial
          </IonItem>*/}
        </IonList>
      </IonContent>
    </IonMenu>
  )
}

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin,
    menuEnabled: state.data.menuEnabled
  }),
  mapDispatchToProps: ({
    setDarkMode
  }),
  component: withRouter(Menu)
})
