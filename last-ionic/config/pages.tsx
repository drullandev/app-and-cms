// TODO : MAKE IT WORK SOMEHOW!
import { RouteProps } from 'react-router-dom';
import MainTabs from '../src/components/core/main/MainTabs';
import Page from '../src/components/core/Page';
import Tutorial from '../src/pages/core/Tutorial';
import Login from '../src/pages/core/Login';
import TestForm from '../src/pages/extra/TestForm';
import Signup from '../src/pages/core/Signup';
import Recover from '../src/pages/core/Recover';
import Support from '../src/pages/core/Support';
import Account from '../src/pages/core/Account';
import ChangePassword from '../src/pages/core/ChangePassword';
import RedirectToLogin from '../src/pages/core/RedirectToLogin';
import HomeOrTutorial from '../src/pages/core/HomeOrTutorial';

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
