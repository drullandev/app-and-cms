import { IAppRoute } from '../../components/main/AppRouter/types';
import { appRoutes } from './routes';

/**
 * Finds and returns the first route with `isHome` set to true. If no such route is found, returns the default route with path `/`.
 *
 * @returns The route object with `isHome: true` or the default `/` route.
 */
export const getHomeRoute = (): IAppRoute => {
  return appRoutes.find(route => route.groups.includes('main')) ?? appRoutes.find(route => route.path === '/');
};

/**
 * Finds and returns the route with `isHome` set to false. If no such route is found, returns the default route with path `/`.
 *
 * @returns The route object with `isHome: false` or the default `/` route.
 */
export const getNotFoundRoute = (): IAppRoute => {
  return appRoutes.find(route => route.isHome === false) ?? appRoutes.find(route => route.path === '/not-found');
};

/**
 * Finds and returns all routes belonging to the group `tabs`.
 *
 * @returns The routes that belong to the `tabs` group.
 */
export const getTabRoutes = (): IAppRoute[] => {
  return appRoutes.filter(route => route.groups.includes('tabs') && route.menu !== true);
};

/**
 * Finds and returns all routes that have `menu: true` and do not belong to the `tabs` group.
 *
 * @returns The routes that have `menu: true` or an empty array if none are found.
 */
export const getMenuRoutes = (): IAppRoute[] => {
  return appRoutes.filter(route => route.menu === true && !route.groups.includes('tabs'));
};

/**
 * Finds and returns all routes that are hidden (not in menu and not in tabs).
 *
 * @returns The routes that are hidden.
 */
export const hiddenRoutes = (): IAppRoute[] => {
  return appRoutes.filter(route => !route.menu && !route.groups.includes('tabs'));
};
