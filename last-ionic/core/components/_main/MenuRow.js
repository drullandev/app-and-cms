import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { IonItem, IonLabel, IonSpinner } from '@ionic/react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import useUserStore from '../../classes/stores/user.store'; // Importa tu store de Zustand
// Style
import './styles/Menu.css';
import Icon from './Icon';
const MenuRow = ({ row }) => {
    const history = useHistory();
    const location = useLocation();
    const [path, setPath] = useState();
    const [menuClass, setMenuClass] = useState('');
    const [icon, setIcon] = useState('');
    const isLoggedIn = useUserStore((state) => state.isLoggedIn); // Usando Zustand para acceder a `isLoggedIn`
    useEffect(() => {
        if (row.path && row.path.slug) {
            /*
            restGet('paths', { slug: row.path.slug })
              .then(res => {
                var data = res.data[0];
                // An access page without roles are skipped
                if (!isAuth(data.roles)) return;
      
                setPath(data);
      
                if (data.component.icon !== undefined){
                  setIcon(data.component.icon ? data.component.icon : 'person');
                }
      
                var selected = location.pathname.startsWith(data.value)
                  || location.pathname.startsWith('/tabs' + data.value);
                setMenuClass(selected ? 'selected' : '');
      
              })
              .catch(err => { console.log(err) })
              */
        }
        // eslint-disable-next-line
    }, [location.pathname, row.path]);
    function isAuth(roles) {
        if (roles.length === 1) {
            if (roles[0].type === 'public' && !isLoggedIn) {
                return true;
            }
            else if (roles[0].type === 'authenticated' && isLoggedIn) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    return path ? (_jsxs(IonItem, { button: true, className: menuClass, onClick: () => {
            history.push(path.value);
        }, children: [_jsx(Icon, { slot: 'start', name: icon }), _jsx(IonLabel, { children: row.title })] }, path.slug)) : (_jsx(IonSpinner, { name: "dots" }));
};
export default MenuRow;
