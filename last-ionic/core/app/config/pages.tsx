// TODO : MAKE IT WORK SOMEHOW!
import { RouteProps } from 'react-router-dom';
import Page from '../../components/main/Page';
import Login from '../../pages/auth/SignIn';
import SignUp from '../../pages/auth/SignUp';
import Support from '../../pages/main/Support';
import Account from '../../pages/auth/Account';
import Home from '../../pages/Index';

const routes: RouteProps[] = [
  { path: '/:slug', component: Page },
  { path: '/login', component: Login },
  { path: '/sign-up', component: SignUp },
  { path: '/support', component: Support },
  { path: '/account', component: Account },
  { path: '/', component: Home, exact: true }
];

export default routes;
