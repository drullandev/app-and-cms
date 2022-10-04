import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

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

/* Data variables */
import { connect } from './data/connect'
import { AppContextProvider } from './data/AppContext'
import { loadConfData } from './data/sessions/sessions.actions'
import { setIsLoggedIn, setNickname, loadUserData, setDarkMode, setUserJwt } from './data/user/user.actions'

/* Core pages */
import Page from './pages/core/Page'
import MainTabs from './components/core/main/MainTabs'
import Main from './components/core/main/Main'

/* Pages components */
import Menu from './components/core/main/Menu'
import RedirectToLogin from './pages/core/RedirectToLogin'

/* Pages models */
//import { Schedule } from './models/Schedule'

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  )
}

interface StateProps {
  userDarkMode: boolean
  //schedule: Schedule
}

interface DispatchProps {
  //setIsLoggedIn: typeof setIsLoggedIn
  //setNickname: typeof setNickname
  loadConfData: typeof loadConfData
  //loadUserData: typeof loadUserData
  setDarkMode: typeof setDarkMode
  //setUserJwt: typeof setUserJwt
}

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({
  userDarkMode,
  //schedule,
  //setIsLoggedIn,
  //setNickname,
  //loadConfData,
  //loadUserData,
  setDarkMode,
  //setUserJwt
}) => {

  //const [showLoading, setShowLoading] = useState(false)
  //const [paths, setPaths] = useState([])

  useEffect(() => {

    //setDarkMode(false)    
    //loadUserData()
    //loadUserData()
    //loadConfData()
    //restGet('settings').then(res => { parseSettings(res) })
    //restGet('paths').then(res => { console.log(res.data); setPaths(res.data) })
    //setShowLoading(false)

    // eslint-disable-next-line
  }, [])

  return (
    <IonApp className={userDarkMode ? 'dark-theme' : ''}>
      <IonReactRouter>
        <IonSplitPane contentId='main'>
  
          {/*<Menu key='mainMenu' slug={'sidenav'} />*/}
  
          <IonRouterOutlet id='main'>
            {/* TODO: Revisistate this case :: We use IonRoute here to keep the tabs state intact, which makes transitions between tabs and non tab pages smooth */}
            <Redirect path='/' to={'/home'} />
            {/*<Route path='/list' render={() => <Main />} />*/}
            <Route path='/tabs' render={() => <MainTabs />} />
            <Route path='/:slug' component={Page} />
            <Route path='/tabs/home/:id' render={() => <MainTabs />} />
            <Route path='/tabs/:slug' render={() => <MainTabs />} />
            <Route path='/logout' render={() => (
              <RedirectToLogin
                key='rtl'
                setIsLoggedIn={setIsLoggedIn}
                setNickname={setNickname}
                setDarkMode={setDarkMode} 
              />
            )}/>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  )
}

export default App

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({

  mapStateToProps: (state) => ({
    userDarkMode: state.user.userDarkMode,
    schedule: state.data.schedule
  }),

  mapDispatchToProps: {
    loadConfData,
    //loadUserData,
    //setIsLoggedIn,
    setDarkMode,
    //setNickname,
    //setUserJwt
  },

  component: IonicApp
  
})