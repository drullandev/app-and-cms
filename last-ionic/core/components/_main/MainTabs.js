import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Route, Redirect } from 'react-router';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel } from '@ionic/react';
import About from '../../pages/Main/About';
import { MainMenu } from '../../app/config/env';
import Icon from './Icon';
const MainTabs = () => {
    const TabButton = (tab) => _jsxs(IonTabButton, { tab: tab.name, href: tab.href, children: [_jsx(Icon, { name: tab.icon }), _jsx(IonLabel, { children: tab.label })] }, tab.href + '-tab');
    return _jsxs(IonTabs, { children: [_jsxs(IonRouterOutlet, { children: [_jsx(Redirect, { exact: true, path: "/tabs", to: "/tabs/schedule" }), _jsx(Route, { path: "/tabs/map", render: () => _jsx(_Fragment, {}), exact: true }), _jsx(Route, { path: "/tabs/about", render: () => _jsx(About, {}), exact: true }), _jsx(Route, { path: "/tabs/list", render: () => _jsx(About, {}), exact: true })] }), _jsx(IonTabBar, { slot: "bottom", children: MainMenu && MainMenu.map(TabButton) })] });
};
export default MainTabs;
