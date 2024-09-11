import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
// Component Reducer
const LogoutPage = ({ setData }) => {
    useEffect(() => {
        setData(null);
        // eslint-disable-next-line
    }, [setData]);
    return _jsx(Redirect, { to: "/login" });
};
export default LogoutPage;
