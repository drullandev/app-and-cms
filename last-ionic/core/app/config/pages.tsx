// TODO : MAKE IT WORK SOMEHOW!
import { RouteProps } from 'react-router-dom';
import Page from '../../components/Page';
import Login from '../../pages/Auth/Login';
import Signup from '../../pages/Auth/Signup';
import Recover from '../../pages/Auth/Recover';
import Support from '../../pages/Main/Support';
import Account from '../../pages/Auth/Account';
import ChangePassword from '../../pages/Auth/ChangePassword';
//import Logout from '../../pages/Logout';
import Home from '../../pages/Index';

const routes: RouteProps[] = [
  { path: '/:slug', component: Page },
  { path: '/login', component: Login },
  { path: '/sign-up', component: Signup },
  { path: '/recover', component: Recover },
  { path: '/support', component: Support },
  { path: '/account', component: Account },
  { path: '/change-password', component: ChangePassword },
  { path: '/logout', render: () => <></> },// TODO: MOUNT LOGOUT PAGE FUCK !!! Is temporari to avoid all the errors in the project challenge!!
  { path: '/', component: Home, exact: true }
];

export default routes;
