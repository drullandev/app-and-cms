import React, { Component, lazy, Suspense, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useAppStore, useUserStore } from '../classes/stores/all.stores';

import DebugUtils from '../classes/utils/DebugUtils';
import RandomUtils from '../classes/utils/RandomUtils';
import BrowserUtils from '../classes/utils/BrowserUtils';

// Páginas con carga diferida
const NotFound = lazy(() => import('../pages/Main/NotFound'));
const ChangePassword = lazy(() => import('../pages/Auth/ChangePassword'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Menu = lazy(() => import('../components/Menu'));
const Recover = lazy(() => import('../pages/Auth/Recover'));
const ResetPassword = lazy(() => import('../pages/Auth/Reset'));
const Signup = lazy(() => import('../pages/Auth/Signup'));
const MainTabs = lazy(() => import('../components/_main/MainTabs'));
const Page = lazy(() => import('../components/Page'));
const Account = lazy(() => import('../pages/Auth/Account'));
const Home = lazy(() => import('../pages/Main/Home'));
const Logout = lazy(() => import('../pages/Auth/Logout'));
const Support = lazy(() => import('../pages/Main/Support'));

// ErrorBoundary con tipado correcto para `children`
interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Actualizar el estado para mostrar el fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
  }

  componentDidUpdate(prevProps: React.PropsWithChildren<{}>) {
    // Reinicia el estado de error si los hijos cambian (como una nueva ruta)
    if (prevProps.children !== this.props.children) {
      this.setState({ hasError: false });
    }
  }

  handleRetry = () => {
    // Forzar un reinicio de estado para reintentar la carga
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Error occurred while loading the page.</h2>
          <button onClick={this.handleRetry}>Retry</button>
        </div>
      );
    }

    return this.props.children;
  }
}


const AppComponent: React.FC = () => {
  const debug = DebugUtils.setDebug(false);
  const { setSessionId } = useAppStore();
  const { darkMode } = useUserStore();
  const [theme, setTheme] = useState<string>('dark-mode');

  useEffect(() => {
    setTheme(darkMode ? 'dark-theme' : '');
  }, [darkMode]);

  useEffect(() => {
    if (process.env.REACT_APP_GA4_TRACKING_ID) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA4_TRACKING_ID}`;
      script.async = true;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', process.env.REACT_APP_GA4_TRACKING_ID);
    }
  }, [process.env.REACT_APP_GA4_TRACKING_ID]);

  useEffect(() => {
    BrowserUtils.updatePageTitle('New Page Title');
    setSessionId(RandomUtils.getRandomUUID());
  }, []);

  return (
    <IonApp className={theme}>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>
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
              </Suspense>
            </ErrorBoundary>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppComponent;

