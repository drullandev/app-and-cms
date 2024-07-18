import React, {
  //useEffect
 }  from 'react'
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, //IonIcon,
IonLabel } from '@ionic/react'
import { Route, Redirect } from 'react-router'
import SchedulePage from '../../../pages/extra/SchedulePage'
import SpeakerList from '../../../pages/extra/SpeakerList'
import SpeakerDetail from '../../../pages/extra/SpeakerDetail'
import SessionDetail from '../../../pages/extra/SessionDetail'
import MapView from '../../../pages/extra/MapView'
import About from '../../../pages/core/About'

import { MainMenu, TabProps } from '../../../data/static/mainMenu'

import Icon from './Icon'

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {

  // TODO:: USE THE COMPONENT INSTEAD !!!!
  const TabButton = (tab: TabProps) =>
    <IonTabButton key={tab.href + '-tab'} tab={tab.name} href={tab.href}>
      <Icon name={tab.icon}/>
      <IonLabel>{tab.label}</IonLabel>
    </IonTabButton>

  return <IonTabs>
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
      <Route path="/tabs/list" render={() => <About />} exact={true} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      {MainMenu && MainMenu.map(TabButton)}
    </IonTabBar>
  </IonTabs>

}

export default MainTabs
