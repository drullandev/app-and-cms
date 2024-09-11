import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonToggle } from '@ionic/react';
import { moonOutline } from 'ionicons/icons';
import useUserStore from '../../classes/stores/user.store';
import SubMenu from './SubMenu';
import useConfStore from '../../classes/stores/sessions.store';
const Menu = ({ slug }) => {
    const [menu, setMenu] = useState();
    const [menus, setMenus] = useState([]);
    const [slot, setSlot] = useState('');
    // Obtener el estado y funciones del store de Zustand
    const { darkMode, menuEnabled, } = useUserStore();
    const { setMenuEnabled } = useConfStore();
    useEffect(() => {
        setSlot('start');
        // Aquí puedes reemplazar la llamada al API por una llamada a tu servicio de datos
        // restGet('menus', { slug: slug })
        //   .then(res => {
        //     setMenu(res.data[0])
        //     setMenus(res.data[0].rows)
        //   })
    }, [slug]);
    return (_jsx(IonMenu, { type: 'overlay', disabled: !menuEnabled, contentId: 'main', children: _jsxs(IonContent, { forceOverscroll: false, children: [menus.map((menu, i) => (_jsx(SubMenu, { menu: menu, slug: '', rows: [], title: '' }, i))), _jsx(IonList, { lines: 'none', children: _jsxs(IonItem, { children: [_jsx(IonIcon, { slot: slot, icon: moonOutline }), _jsxs(IonLabel, { children: ["Dark Mode ", darkMode ? 'true' : 'false'] }), _jsx(IonToggle, { checked: darkMode, onIonChange: () => null })] }, 'dark-mode-item') }, 'dark-mode')] }) }, slug));
};
export default withRouter(Menu);
