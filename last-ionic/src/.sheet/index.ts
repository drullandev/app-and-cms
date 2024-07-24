import React, { useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// Import configurations and utilities
import './config';
import './styles';
import './types';
import DebugUtil from './../classes/DebugUtil';
import Logger from '../classes/LoggerClass';
import { withLifecycleHooks, LifecycleHooks } from '../interfaces/LifecycleHooks';

// Import Redux-related utilities and actions
import { connect } from './../reducer/src/connect';
import { OwnProps, ComponentProps, StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from './reducer';

// Import application pages and components
import { Account, ChangePassword, Home, Login, Logout, MainTabs, Menu, Page, Recover, ResetPassword, Signup, Support, TestForm, Tutorial } from './components';

// App component
const App: React.FC<ComponentProps & LifecycleHooks> = (props) => {
  const { darkMode, loadConfData, loadUserData, setData, initialUser, onLoad, afterMount, beforeUpdate, afterUpdate, beforeDismount, onError } = props;

  const debug = DebugUtil.setDebug(false);
  const prevPropsRef = useRef<ComponentProps>(props);
  const prevStateRef = useRef<any>(null);

  useEffect(() => {
    console.log('onLoad effect triggered');
    if (onLoad) {
      onLoad(() => {
        Logger.log('onLoad callback executed');
        loadConfData();
        loadUserData();
        setData(initialUser);
      });
    }
  }, [onLoad, loadConfData, loadUserData, setData, initialUser]);

  useEffect(() => {
    console.log('afterMount effect triggered');
    if (afterMount) {
      afterMount(() => {
        Logger.log('afterMount callback executed');
      });
    }
  }, [afterMount]);

  useEffect(() => {
    if (beforeUpdate) {
      beforeUpdate(prevPropsRef.current, prevStateRef.current, () => {
        Logger.log('beforeUpdate callback executed');
      });
    }
    if (afterUpdate) {
      afterUpdate(prevPropsRef.current, prevStateRef.current, () => {
        Logger.log('afterUpdate callback executed');
      });
    }
    prevPropsRef.current = props;
    prevStateRef.current = null;
  }, [props, beforeUpdate, afterUpdate]);

  useEffect(() => {
    return () => {
      if (beforeDismount) {
        beforeDismount(() => {
          Logger.log('beforeDismount callback executed');
        });
      }
    };
  }, [beforeDismount]);

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

const AppWithLifecycleHooks = withLifecycleHooks(App);

const ConnectedApp: React.FC = () => <AppWithLifecycleHooks />;

export default ConnectedApp;

const ConnectedAppWithRedux = connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps,
  mapDispatchToProps,
  component: AppWithLifecycleHooks,
});
