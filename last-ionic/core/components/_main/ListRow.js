import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IonMenuToggle, IonIcon, IonItem, IonLabel } from '@ionic/react';
const ListRow = (row) => (
//(isLoggedIn === false && p.roles.find(el => el.name === 'Public' && el.allowed === true) ) ||
//(isLoggedIn === true && p.roles.find(el => el.name === 'Authenticated' && el.allowed === true) ) 
//?
_jsx(IonMenuToggle, { "auto-hide": 'false', children: _jsxs(IonItem, { detail: false, routerLink: row.path, routerDirection: 'none', className: window.location.pathname.startsWith(row.path) ? 'selected' : undefined, children: [_jsx(IonIcon, { slot: row.slot, icon: row.icon }), _jsx(IonLabel, { children: row.title })] }, row.title) }, row.title));
export default ListRow;
