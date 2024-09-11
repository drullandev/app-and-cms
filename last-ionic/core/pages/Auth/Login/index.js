import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { IonIcon, IonItem, IonText, IonFooter, IonContent } from '../../../components/Ionic/basic';
import { checkmarkCircleOutline } from 'ionicons/icons';
import Page from '../../../components/Page';
import Header from '../../../components/Header';
import Form from '../../../components/Form';
// Page imports
import { loginFormData } from './source';
import './styles.scss';
import './style.css';
const LoginPage = (pageProps) => {
    const { t } = useTranslation();
    const pageSettings = {
        settings: {
            id: 'login-page',
            title: 'Login page',
            //skeleton: true,
            //animated: "true",
        },
        ga4: {
            load: {
                category: 'auth',
                action: 'page-load',
                label: 'login-landing',
            }
        },
        header: () => {
            const headerProps = {
                title: t('Login'),
                showMenuButton: true,
                slot: 'start',
                loading: pageProps.loading || false,
            };
            return _jsx(Header, { ...headerProps });
        },
        content: () => {
            return (_jsxs(IonContent, { ariaLabel: t('Wellcome and login page!'), className: "login-content", children: [_jsxs(IonItem, { ariaLabel: "Welcome item", lines: "none", className: "welcome-item", role: "region", ariaLabelledby: "welcome-heading welcome-text", children: [_jsx(IonIcon, { icon: checkmarkCircleOutline, color: "success", className: "welcome-icon" }), _jsxs(IonText, { id: "welcome-text", children: [_jsx("h2", { id: "welcome-heading", children: t('Welcome to Festivore!') }), _jsx("p", { children: t('Join the community and enjoy the best culinary experiences. Login to your account to continue.') })] })] }), _jsx(IonItem, { ariaLabel: t("Login item"), lines: "none", className: "login-item", role: "region", ariaLabelledby: "login-heading login-text", children: _jsxs(IonText, { id: "login-text", children: [_jsx("h3", { id: "login-heading", children: t('Login to your account') }), _jsx("p", { children: t('Enter your credentials to access your account and start exploring the world of Festivore.') })] }) }), _jsx(Form, { ...loginFormData(pageProps) })] }));
        },
        footer: () => {
            return (_jsx(IonFooter, { className: "login-footer" }));
        }
    };
    return _jsx(Page, { ...pageSettings });
};
export default LoginPage;
