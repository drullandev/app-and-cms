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

/* Theme variables */
import './theme/variables.css'

import { connect } from './data/connect'
import { AppContextProvider } from './data/AppContext'
import { loadConfData } from './data/sessions/sessions.actions'
import { loadUserData, setData, setIsLoggedIn } from './data/user/user.actions'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import Support from './pages/Support'
import MainTabs from './pages/MainTabs'
import Tutorial from './pages/Tutorial'

import { Schedule } from './models/Schedule'

import HomeOrTutorial from './components/HomeOrTutorial'
import RedirectToLogin from './components/RedirectToLogin'
import { initialUser } from './data/state'

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

  useEffect(() => {
    loadUserData()
    loadConfData()
    //setData(initialUser)
    // eslint-disable-next-line
  }, [])

  return (
    schedule.groups.length === 0 ? (
      <div></div>
    ) : (
      <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
        <IonReactRouter>
          <IonSplitPane contentId='main'>
            <Menu />
            <IonRouterOutlet id='main'>
              {/*
              We use IonRoute here to keep the tabs state intact,
              which makes transitions between tabs and non tab pages smooth
              */}
              <Route path='/tabs' render={() => <MainTabs />} />
              <Route path='/account' component={Account} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={Signup} />
              {/*<Route path='/support' component={Support} />*/}
              <Route path='/tutorial' component={Tutorial} />
              <Route path='/logout' render={() => {
                return <RedirectToLogin setData={setData}/>
              }} />
              <Route path='/' component={HomeOrTutorial} exact />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    )
  )
}

const App: React.FC = () => 
  <AppContextProvider>
    <IonicAppConnected />
  </AppContextProvider>

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
