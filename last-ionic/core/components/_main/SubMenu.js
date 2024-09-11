import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { IonList, IonListHeader } from '@ionic/react';
import MenuRow from './MenuRow';
const SubMenu = ({ menu }) => {
    //console.log('setSubMenu', menu.menu.slug) 
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        /*
        restGet('menus', { slug: menu.menu.slug })
          .then(res => {
            //console.log('SubMenu::Res', res.data[0])
            if (res.data[0].rows) setMenus(res.data[0].rows)
          })
          */
    }, [menu.menu.slug]);
    //console.log('SubMenu', { menus })
    return (_jsxs(_Fragment, { children: [_jsx(IonListHeader, {}), _jsx(IonList, { lines: 'none', children: menus.map((row, i) => (_jsx(MenuRow, { row: row }, i.toString()))) }, menu.menu.slug)] }));
};
export default SubMenu;
