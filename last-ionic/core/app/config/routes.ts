import React from 'react';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';
import * as icon from 'ionicons/icons';
import MainTabs from '../../components/main/MainTabs';
import { NotFound, SignIn, Account, Home, Logout, Support, SignUp } from '../components';

export interface IAppRoute {
  title: string;
  path?: string;
  icon: string;
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  logged: boolean;
  menu: boolean;
  exact?: boolean;
  redirect?: boolean;
  from?: string;
  to?: string;
}

/**
 * Configuración de rutas directamente en el archivo
 */
export const AppRoutes: IAppRoute[] = [
  {
    title: 'Tabs',
    path: '/tabs',
    component: MainTabs,
    exact: true,
    icon: icon.person,
    logged: true,
    menu: true,
  },
  {
    title: 'Tabs',
    path: '/tabs/home/:id',
    component: MainTabs,
    exact: true,
    icon: icon.person,
    logged: true,
    menu: true,
  },
  {
    title: 'Tabs',
    path: '/tabs/:slug',
    component: MainTabs,
    exact: true,
    icon: icon.person,
    logged: true,
    menu: true,
  },
  {
    title: 'Account',
    path: '/account',
    component: Account,
    exact: true,
    icon: icon.person,
    menu: true,
    logged: true,
  },
  {
    title: 'Help',
    path: '/support',
    component: Support,
    exact: true,
    icon: icon.help,
    menu: true,
    logged: false,
  },
  {
    title: 'Logout',
    path: '/logout',
    component: Logout,
    exact: true,
    icon: icon.person,
    menu: true,
    logged: true,
  },
  {
    title: 'Sign in',
    path: '/login',
    component: SignIn,
    exact: true,
    icon: icon.person,
    menu: true,
    logged: false,
  },
  {
    title: 'Sign up',
    path: '/sign-up',
    component: SignUp,
    exact: true,
    icon: icon.person,
    menu: true,
    logged: false,
  },
  {
    title: 'Home',
    path: '/',
    component: Home,
    exact: true,
    icon: icon.person,
    menu: true,
    logged: false,
  },
  {
    title: 'Not found',
    path: '/not-found',
    component: NotFound,
    exact: true,
    icon: icon.person,
    menu: false,
    logged: false,
  },
  {
    title: 'Not found',
    redirect: true,
    from: '*',
    to: '/not-found',
    icon: icon.person,
    menu: false,
    logged: false,
  },
];