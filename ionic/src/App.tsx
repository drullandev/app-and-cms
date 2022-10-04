import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { useEffect } from 'react';
import { IonReactRouter } from '@ionic/react-router';

import { ellipse, square, triangle } from 'ionicons/icons';

import './styles'


import { getMenuById } from './calls/menus';

import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';


/* Data variables */
//import { connect } from './data/connect'
//import { AppContextProvider } from './data/AppContext'
//import { loadConfData } from './data/sessions/sessions.actions'
//import { setIsLoggedIn, setNickname, serUserData, setDarkMode, setUserJwt } from './data/user/user.actions'

setupIonicReact();

const App: React.FC = () => {

  useEffect(() =>{
    console.log(getMenuById(1, ()=>console.log('success menu'), ()=>console.log('ERror menu')))
  },[])


  return <IonApp>
    <IonReactRouter>
      <IonTabs>
        
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar>



      </IonTabs>
    </IonReactRouter>
  </IonApp>

}

export default App;