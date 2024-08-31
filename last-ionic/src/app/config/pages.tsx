// TODO : MAKE IT WORK SOMEHOW!
import { RouteProps } from 'react-router-dom';
import Page from '../../components/Page';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Recover from '../../pages/Recover';
import Support from '../../pages/Support';
import Account from '../../pages/Account';
import ChangePassword from '../../pages/ChangePassword';
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
