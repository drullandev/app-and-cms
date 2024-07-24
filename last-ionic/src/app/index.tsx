import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// Importing centraliced configs
import './config';  // Importing centraliced app configs
import './styles'; // Importing centraliced styles
import './types';  // Importing centraliced types

// Reducer settings
import { connect } from './../reducer/src/connect';
import { OwnProps, ComponentProps, StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from './reducer';

// Reducer options
import { loadConfData } from './../reducer/data/sessions/sessions.actions';
import { loadUserData, setData } from './../reducer/data/user/user.actions';
import { initialUser } from './../reducer/state';

// Pages
import { Account, ChangePassword, Home, Login, Logout, MainTabs, Menu, Page, Recover, ResetPassword, Signup, Support, TestForm, Tutorial } from './components'

// Classes
import DebugUtil from './../classes/DebugUtil';
import Logger from '../classes/LoggerClass';

// Interfaces
import { withLifecycleHooks, LifecycleHooks } from '../interfaces/LifecycleHooks';

/**
 * 
 * @param param0 {ComponentProps & ComponentProps}
 * @returns 
 */
const App: React.FC<ComponentProps & LifecycleHooks> = ({
  darkMode,
  schedule,
  loadConfData,
  onLoad,
  afterMount,
  beforeUpdate,
  afterUpdate,
  beforeDismount,
  onError
}) => {

  // Configura el modo de depuración
  let debug = DebugUtil.setDebug(false);

  // Inicializa configuraciones y datos
  onLoad = () => {
    Logger.log('diselo!')
    loadConfData();
    loadUserData();
    setData(initialUser);
  };

  return (
    <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
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
            <Route path='/logout' render={() => <Logout />} />
          <Route path='/' component={Home} exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

// Envuelve el componente App con los hooks de ciclo de vida
const AppWithLifecycleHooks = withLifecycleHooks(App);

const ConnectedApp: React.FC = () => <AppWithLifecycleHooks />;

export default ConnectedApp;

// Conecta el componente AppWithLifecycleHooks con Redux
const ConnectedAppWithRedux = connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps,
  mapDispatchToProps,
  component: AppWithLifecycleHooks,
});
