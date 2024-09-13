// TODO : MAKE IT WORK SOMEHOW!
import { RouteProps } from 'react-router-dom';
import Page from '../../components/Page';
import Login from '../../pages/Auth/SignIn';
import SignUp from '../../pages/Auth/SignUp';
import Support from '../../pages/Main/Support';
import Account from '../../pages/Auth/Account';
//import Logout from '../../pages/Logout';
import Home from '../../pages/Index';

const routes: RouteProps[] = [
  { path: '/:slug', component: Page },
  { path: '/login', component: Login },
  { path: '/sign-up', component: SignUp },
  { path: '/support', component: Support },
  { path: '/account', component: Account },
  { path: '/logout', render: () => <></> },
  { path: '/', component: Home, exact: true }
];

export default routes;
