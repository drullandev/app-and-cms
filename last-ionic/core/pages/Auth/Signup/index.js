import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
// Component imports
import './styles.scss';
import { signupForm } from './source';
// Used Components
import Page from '../../../components/Page';
import Header from '../../../components/Header';
import Form from '../../../components/Form';
// Component Reducer
const SignupPage = (pageProps) => {
    const { t } = useTranslation();
    const pageSettings = {
        settings: {
            id: 'signup-page',
            title: t('Sign up a new account!'),
        },
        header: () => {
            const headerProps = {
                title: t('Sign up!'),
                slot: 'start',
                loading: pageProps.loading || false
            };
            return _jsx(Header, { ...headerProps });
        },
        content: () => {
            return (_jsx(_Fragment, { children: _jsx(Form, { ...signupForm(pageProps) }) }));
        },
        footer: () => { return _jsx(_Fragment, {}); }
    };
    return _jsx(Page, { ...pageSettings });
};
export default SignupPage;
