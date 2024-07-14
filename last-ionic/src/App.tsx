
import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import Menu from './components/Menu'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Whole app style */
import './App.scss';

/* Theme variables */
import './theme/variables.css'

import { connect } from './reducer/src/connect'
import { loadConfData } from './reducer/data/sessions/sessions.actions'
import { loadUserData, setData } from './reducer/data/user/user.actions'

import TestForm from './pages/TestForm'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import ChangePassword from './pages/ChangePassword'
import Support from './pages/Support'
import ResetPassword from './pages/ChangePassword'
import Recover from './pages/Recover'

import Tutorial from './pages/Tutorial'

import Page from './components/Page'
import MainTabs from './components/main/MainTabs'
import Home from './components/HomeRedirect'
import Logout from './components/Logout'

import { Schedule } from './reducer/models/Schedule'
import { initialUser } from './reducer/state'
import DebugUtil from './classes/DebugUtil'

// Import the functions you need from the SDKs you need

//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { firebaseConfig } from './data/firebase'

// Are you testing this tools set && app?

let debug = DebugUtil.setDebug(false);

// https://ionicframework.com/docs/react/config#global-config
setupIonicReact({
  rippleEffect: true,
  animated: true
})

interface StateProps {
  darkMode: boolean
  schedule: Schedule
  hasLoggedIn: boolean
}

interface DispatchProps {
  loadConfData: typeof loadConfData
  loadUserData: typeof loadUserData
  setData: typeof setData
}

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({
  darkMode,
  setData,
  loadConfData,
}) => {

  // Initialize Firebase

  //const app = initializeApp(firebaseConfig)
  //const analytics = getAnalytics(app)

  useEffect(() => {
    loadConfData()
    //loadUserData()
    //setData(initialUser)
  }, [])

  return <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
    <IonReactRouter>
      <IonSplitPane contentId='main'>
        <Menu />
        <IonRouterOutlet id='main'>
          <Route path='/tabs' render={() => <MainTabs />} />
          <Route path='/:slug' component={Page} />
          <Route path='/tabs/home/:id' render={() => <MainTabs />} />
          <Route path='/tabs/:slug' render={() => <MainTabs />} />
          <Route path='/tutorial' component={Tutorial} />
          <Route path='/login' component={Login} />
          <Route path='/test' component={TestForm} />
          <Route path='/sign-up' component={Signup} />
          <Route path='/reset' component={ResetPassword} />
          <Route path='/recover' component={Recover} />
          <Route path='/support' component={Support} />
          <Route path='/account' component={Account} />
          <Route path='/change-password' component={ChangePassword} />
          <Route path='/logout' render={() => <Logout/>} />
          <Route path='/' component={Home} exact />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>

}

const App: React.FC = () => <>
  <IonicAppConnected />
</>

export default App

const connectProps = {
  mapStateToProps: (state:any) => ({
    darkMode: state.user.darkMode,
    schedule: state.data.schedule,
    hasLoggedIn: state.user.hasLoggedIn,
  }),
  mapDispatchToProps: {
    loadConfData,
    loadUserData,
    setData
  },
  component: IonicApp
}

const IonicAppConnected = connect<{}, StateProps, DispatchProps>(connectProps)
