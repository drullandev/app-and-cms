import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
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

/* Theme variables */
import './theme/variables.css'

import { connect } from './data/connect'
import { AppContextProvider } from './data/AppContext'
import { loadConfData } from './data/sessions/sessions.actions'
import { loadUserData, setData } from './data/user/user.actions'

import Login from './pages/core/Login'
import Signup from './pages/core/Signup'
import Account from './pages/core/Account'
import ChangePassword from './pages/core/ChangePassword'
import Support from './pages/core/Support'
import ResetPassword from './pages/core/ChangePassword'
import Recover from './pages/core/Recover'

import Tutorial from './pages/extra/Tutorial'

import Page from './components/core/Page'
import MainTabs from './components/core/main/MainTabs'
import HomeOrTutorial from './components/HomeOrTutorial'
import RedirectToLogin from './components/RedirectToLogin'

import { Schedule } from './models/Schedule'
import { initialUser } from './data/state'

// Import the functions you need from the SDKs you need

//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { firebaseConfig } from './data/firebase'

// Are you testing this tools set && app?
let testingFeature = true
let testing = testingFeature && import.meta.env.REACT_APP_TESTING

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
  schedule,
  hasLoggedIn,
  setData,
  loadConfData,
  loadUserData
}) => {

  // Initialize Firebase

  //const app = initializeApp(firebaseConfig)
  //const analytics = getAnalytics(app)

  useEffect(() => {
    loadUserData()
    loadConfData()
    setData(initialUser)

    // eslint-disable-next-line
  }, [])

  return <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
    <IonReactRouter>
      <IonSplitPane contentId='main'>
        <Menu />
        <IonRouterOutlet id='main'>
          {/*
            We use IonRoute here to keep the tabs state intact,
            which makes transitions between tabs and non tab pages smooth
          */}
          <Route path='/tabs' render={() => <MainTabs />} />
          <Route path='/:slug' component={Page} />
          <Route path='/tabs/home/:id' render={() => <MainTabs />} />
          <Route path='/tabs/:slug' render={() => <MainTabs />} />
          <Route path='/tutorial' component={Tutorial} />

          <Route path='/login' component={Login} />
          <Route path='/sign-up' component={Signup} />
          <Route path='/reset' component={ResetPassword} />
          <Route path='/recover' component={Recover} />
          <Route path='/support' component={Support} />
          <Route path='/account' component={Account} />
          <Route path='/change-password' component={ChangePassword} />
          <Route path='/logout' render={() =>
            <RedirectToLogin setData={setData}/>
          } />
          <Route path='/' component={HomeOrTutorial} exact />
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
