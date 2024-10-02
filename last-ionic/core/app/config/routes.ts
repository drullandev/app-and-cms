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
  About
} from '../components';
import i18n from 'i18next'
import { IAppRoute } from '../../components/main/AppRouter';

/**
 * Routes settings
 */
export const AppRoutes: IAppRoute[] = [
  {
    title: i18n.t('Tabs'),//TODO: Move?
    path: '/tabs',
    component: TabItem,
    exact: true,
    icon: icon.person,
    logged: true,
    menu: true,
    tab: false,
  },
  {
    title: i18n.t('Tabs'),//TODO: Move?
    path: '/tabs/home/:id',
    component: TabItem,
    exact: true,
    icon: icon.person,
    logged: true,
    menu: true,
    tab: false,
  },
  {
    title: i18n.t('Tabs'),//TODO: Move?
    path: '/tabs/:slug',
    component: TabItem,
    exact: true,
    icon: icon.person,
    logged: true,
    menu: true,
    tab: false,
  },
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
    title: i18n.t('Home'),
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
    title: i18n.t(''),
    path: '/logout',
    component: SignOut,
    exact: true,
    icon: icon.person,
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
    path: '/tabs/about',
    component: About,
    exact: true,
    icon: icon.person,
    menu: false,
    logged: false,
    tab: true,
  },
  {
    title: i18n.t('Not found'),
    path: '/not-found',
    component: NotFound,
    exact: true,
    icon: icon.person,
    menu: false,
    logged: false,
    tab: false,
  },
  {
    title: i18n.t('Not found'),
    redirect: true,
    from: '*',
    to: '/not-found',
    icon: icon.person,
    menu: false,
    logged: false,
    tab: false,
  },
  {
    title: i18n.t('Tabs Home'),
    redirect: true,
    from: '/tabs',
    to: '/tabs/schedule',
    icon: icon.person,
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