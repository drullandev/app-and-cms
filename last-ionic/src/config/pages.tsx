// TODO : MAKE IT WORK SOMEHOW!
import { RouteProps } from 'react-router-dom';
import MainTabs from '../components/_main/MainTabs';
import Page from '../components/Page';
import Tutorial from '../pages/Tutorial';
import Login from '../pages/Login';
import TestForm from '../pages/TestForm';
import Signup from '../pages/Signup';
import Recover from '../pages/Recover';
import Support from '../pages/Support';
import Account from '../pages/Account';
import ChangePassword from '../pages/ChangePassword';
import Logout from '../pages/Logout';
import Home from '../pages/Home';

const routes: RouteProps[] = [
  { path: '/tabs', render: () => <MainTabs /> },
  { path: '/:slug', component: Page },
  { path: '/tabs/home/:id', render: () => <MainTabs /> },
  { path: '/tabs/:slug', render: () => <MainTabs /> },
  { path: '/tutorial', component: Tutorial },
  { path: '/login', component: Login },
  { path: '/test', component: TestForm },
  { path: '/sign-up', component: Signup },
  { path: '/recover', component: Recover },
  { path: '/support', component: Support },
  { path: '/account', component: Account },
  { path: '/change-password', component: ChangePassword },
  { path: '/logout', render: () => <Logout setisLogged={()=>{}}  setNickname={()=>{}}   setisLogged={()=>{}}  /> },
  { path: '/', component: Home, exact: true }
];

export default routes;
