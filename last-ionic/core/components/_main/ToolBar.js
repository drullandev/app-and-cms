import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
/**
 *
 * @param param0
 * @returns
 */
const ToolBar = ({ label, slot }) => (_jsxs(IonToolbar, { children: [_jsx(IonButtons, { slot: slot ? slot : 'start', children: _jsx(IonMenuButton, {}) }), _jsx(IonTitle, { children: label })] }));
export default ToolBar;
