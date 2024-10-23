import * as icon from 'ionicons/icons';
import {
  NotFound,
  SignIn,
  Account,
  Home,
  SignOut,
  Support,
  SignUp,
  TabItem,
  About,
  ForgotPassword,
  ResetPassword
} from '../components';  // Asegúrate de tener estos componentes definidos y exportados correctamente.
import i18n from 'i18next';

import { IMenu } from '../../components/main/Menu';
import { IAppRoute } from '../../components/main/AppRouter/types';
import ErrorPage from '../../pages/main/ErrorPage';

/**
 * Routes settings
 */
export const appRoutes: IAppRoute[] = [
  {
    title: i18n.t('Tabs'),
    path: '/tabs/home',
    component: ErrorPage,
    exact: true,
    icon: icon.person,
    logged: true,
    menu: false,
    tab: true,
  },
  /*{
    title: i18n.t('Tabs'),
    path: '/tabs/:slug',
    component: Home,
    exact: true,
    icon: icon.person,
    logged: true,
    menu: false,
    tab: true,
  },
  {
    title: i18n.t('Tabs Home'),
    component: Home,
    redirect: true,
    from: '/tabs',
    to: '/tabs/schedule',
    icon: icon.person,
    menu: false,
    logged: false,
    tab: true,
  },*/
  {
    title: i18n.t('Account'),
    path: '/account',
    component: Account,
    exact: true,
    icon: icon.person,
    menu: true,
    logged: true,
    tab: false,
  },
  {
    title: i18n.t('Feed'),
    path: '/home',
    component: Home,
    exact: true,
    icon: icon.homeOutline,
    menu: true,
    logged: false,
    tab: false,
    isHome: true,
  },
  {
    title: i18n.t('Sign in'),
    path: '/login',
    component: SignIn,
    exact: true,
    icon: icon.logInOutline,
    menu: true,
    logged: false,
    tab: false,
  },
  {
    title: i18n.t('Sign up'),
    path: '/sign-up',
    component: SignUp,
    exact: true,
    icon: icon.accessibilityOutline,
    menu: true,
    logged: false,
    tab: false,
  },
  {
    title: i18n.t('Forgot Password'), 
    path: '/forgot-password',
    component: ForgotPassword,
    exact: true,
    icon: icon.mailOutline,
    menu: true,
    logged: false,
    tab: false,
  },
  {
    title: i18n.t('Reset Password'), 
    path: '/reset-password/:token',
    component: ResetPassword,
    exact: true,
    icon: icon.lockClosedOutline,
    menu: true,
    logged: false,
    tab: false,
  },
  {
    title: i18n.t('Sign out'),
    path: '/logout',
    component: SignOut,
    exact: true,
    icon: icon.logOutOutline,
    menu: true,
    logged: true,
    tab: false,
  },
  {
    title: i18n.t('Help'),
    path: '/support',
    component: Support,
    exact: true,
    icon: icon.help,
    menu: true,
    logged: false,
    tab: false,
  },
  {
    title: i18n.t('About'),
    path: '/about',
    component: About,
    exact: true,
    icon: icon.informationCircleOutline,
    menu: false,
    logged: false,
    tab: false,
  },
  {
    title: i18n.t('Not found'),
    redirect: true,
    from: '*',
    to: '/not-found',
    icon: icon.warningOutline,
    menu: false,
    logged: false,
    tab: false,
  },
];

/**
 * Finds and returns the route with `isHome` set to true.
 *
 * @param routes - The array of app routes to search in.
 * @returns The route object with `isHome: true` or `undefined` if not found.
 */
export const getHomeRoute = (routes: IAppRoute[]): IAppRoute | undefined => {
  return routes.find(route => route.isHome === true);
};

/**
 * Finds and returns all routes with `tab: true`.
 *
 * @param routes - The array of app routes to search in.
 * @returns The routes that have `tab: true`.
 */
export const getTabRoutes = (): IAppRoute[] => {
  return appRoutes.filter(route => route.tab === true);
};

/**
 * Finds and returns all routes with `menu: true`.
 *
 * @param routes - The array of app routes to search in.
 * @returns The routes that have `menu: true` or an empty array if none are found.
 */
export const getMenuRoutes = (): IAppRoute[] => {
  return appRoutes.filter(route => route.menu === true) || [];
};


