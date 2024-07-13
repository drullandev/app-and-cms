// TODO : MAKE IT WORK SOMEHOW!
import { RouteProps } from 'react-router-dom';
import MainTabs from '../components/core/main/MainTabs';
import Page from '../components/core/Page';
import Tutorial from '../pages/core/Tutorial';
import Login from '../pages/core/Login';
import TestForm from '../pages/extra/TestForm';
import Signup from '../pages/core/Signup';
import Recover from '../pages/core/Recover';
import Support from '../pages/core/Support';
import Account from '../pages/core/Account';
import ChangePassword from '../pages/core/ChangePassword';
import RedirectToLogin from '../pages/core/RedirectToLogin';
import HomeOrTutorial from '../pages/core/HomeOrTutorial';

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
  { path: '/logout', render: () => <RedirectToLogin setisLoggedIn={()=>{}}  setNickname={()=>{}}   setisLoggedIn={()=>{}}  /> },
  { path: '/', component: HomeOrTutorial, exact: true }
];

export default routes;
