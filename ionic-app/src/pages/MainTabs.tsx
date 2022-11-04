import React, { 
  //useEffect
 }  from 'react'
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, //IonIcon, 
IonLabel } from '@ionic/react'
import { Route, Redirect } from 'react-router'
import SchedulePage from './SchedulePage'
import SpeakerList from './SpeakerList'
import SpeakerDetail from './SpeakerDetail'
import SessionDetail from './SessionDetail'
import MapView from './MapView'
import About from './About'

import Icon from '../components/core/main/Icon'

interface MainTabsProps { }

interface TabProps {
  name: string
  href: string
  icon: string
  label: string
}

const MainTabs: React.FC<MainTabsProps> = () => {

  let menu = [
    {
      name: 'schedule', 
      href: '/tabs/schedule',
      icon: 'calendar',
      label: 'Schedule'
    },
    {
      name: 'speakers', 
      href: '/tabs/speakers',
      icon: 'people',
      label: 'Speakers'
    },
    {
      name: 'map', 
      href: '/tabs/map',
      icon: 'location',
      label: 'Map'
    },
    {
      name: 'about', 
      href: '/tabs/about',
      icon: 'informationCircle',
      label: 'Speakers'
    }
  ]

  const TabButton = (tab: TabProps) =>
    <IonTabButton key={tab.href + '-tab'} tab={tab.name} href={tab.href}>
      <Icon name={tab.icon}/>
      <IonLabel>{tab.label}</IonLabel>
    </IonTabButton>

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/schedule" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/schedule" render={() => <SchedulePage />} exact={true} />
        <Route path="/tabs/speakers" render={() => <SpeakerList />} exact={true} />
        <Route path="/tabs/speakers/:id" component={SpeakerDetail} exact={true} />
        <Route path="/tabs/schedule/:id" component={SessionDetail} />
        <Route path="/tabs/speakers/sessions/:id" component={SessionDetail} />
        <Route path="/tabs/map" render={() => <MapView />} exact={true} />
        <Route path="/tabs/about" render={() => <About />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        {menu && menu.map((tab: TabProps)=> TabButton(tab) )}
      </IonTabBar>
    </IonTabs>
  )
}

export default MainTabs