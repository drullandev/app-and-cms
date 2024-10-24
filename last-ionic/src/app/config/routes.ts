import {
  NotFound,
  TabItem,
  SignIn,
  Account,
  Home,
  SignOut,
  Support,
  SignUp,
  About,
  ForgotPassword,
  ResetPassword
} from '../components';
import i18n from 'i18next';
import * as icon from 'ionicons/icons';

import { IAppRoute } from '../../components/main/AppRouter/types';
import ErrorPage from '../../pages/main/ErrorPage';

/**
 * App routes - Single list with multiple groups using `groups` array field
 */
export const appRoutes: IAppRoute[] = [
  // Rutas principales (Home)
  {
    title: i18n.t('Feed'),
    path: '/home',
    component: Home,
    exact: true,
    icon: icon.homeOutline,
    menu: true,
    logged: false,
    tab: false,
    groups: ['main', 'public', 'menu'],
  },
  // Rutas de autenticación
  {
    title: i18n.t('Sign in'),
    path: '/login',
    component: SignIn,
    exact: true,
    icon: icon.logInOutline,
    menu: true,
    logged: false,
    tab: false,
    groups: ['auth', 'public', 'menu'],
  },
  {
    title: i18n.t('Sign up'),
    path: '/',
    component: SignUp,
    exact: true,
    icon: icon.accessibilityOutline,
    menu: true,
    logged: false,
    tab: false,
    groups: ['auth', 'public', 'menu'],
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
    groups: ['auth', 'public', 'menu'],
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
    groups: ['auth', 'public', 'menu'],
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
    groups: ['auth', 'protected', 'menu'],
  },
  // Rutas protegidas
  {
    title: i18n.t('Account'),
    path: '/account',
    component: Account,
    exact: true,
    icon: icon.person,
    menu: true,
    logged: true,
    tab: false,
    groups: ['protected', 'menu'],
  },
  // Rutas de Tabs
  {
    title: i18n.t('Tabs'),
    path: '/tabs/home',
    component: ErrorPage,
    exact: true,
    icon: icon.person,
    logged: true,
    menu: false,
    tab: true,
    groups: ['tabs', 'main'],
  },
  // Rutas de error
  {
    title: i18n.t('Not found'),
    redirect: true,
    from: '*',
    to: '/not-found',
    icon: icon.warningOutline,
    menu: false,
    logged: false,
    tab: false,
    groups: ['error'],
  },
];
