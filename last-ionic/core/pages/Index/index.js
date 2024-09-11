import { jsx as _jsx } from "react/jsx-runtime";
import { Redirect } from 'react-router';
const Home = ({ hasSeenTutorial }) => (hasSeenTutorial
    ? _jsx(Redirect, { to: process.env.REACT_APP_HOME_PATH })
    : _jsx(Redirect, { to: process.env.REACT_APP_AUTH_LOGIN }));
export default Home;
