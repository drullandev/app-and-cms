import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import BrowserUtils from '../classes/utils/BrowserUtils';
import RandomUtils from '../classes/utils/RandomUtils';

import './config';
import './styles';
import './types';

import {
  NotFound,
  ChangePassword,
  Login,
  Menu,
  Recover,
  ResetPassword,
  Signup,
  MainTabs,
  Page,
  Account,
  Home,
  Logout,
  Support  
} from './components';


import useUserStore from '../classes/stores/user.store';
import useAppStore from '../classes/stores/app.store'

import DebugUtils from '../classes/utils/DebugUtils';

const AppComponent: React.FC = () => {

  const debug = DebugUtils.setDebug(false);
  const { setSessionId } = useAppStore();
  const { darkMode } = useUserStore();
  const [ theme, setTheme ] = useState<string>('dark-mode');

  useEffect(() => {
    setTheme(darkMode ? 'dark-theme' : '');
  }, [darkMode]);

  useEffect(()=>{
    BrowserUtils.updatePageTitle('New Page Title');
    setSessionId(RandomUtils.getRandomUUID());
  },[])

  return (
    <IonApp className={theme}>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/tabs" render={() => <MainTabs />} />
            <Route path="/:slug" component={Page} />
            <Route path="/tabs/home/:id" render={() => <MainTabs />} />
            <Route path="/tabs/:slug" render={() => <MainTabs />} />
            <Route path="/account" component={Account} />
            <Route path="/support" component={Support} />
            <Route path="/logout" render={() => <Logout />} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={Signup} />
            <Route path="/reset" component={ResetPassword} />
            <Route path="/recover" component={Recover} />
            <Route path="/change-password" component={ChangePassword} />
            <Route path="/" component={Home} exact />
            <Route path="/not-found" component={NotFound} />
            <Route component={NotFound} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppComponent;