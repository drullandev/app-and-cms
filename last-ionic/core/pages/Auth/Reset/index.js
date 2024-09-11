import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { IonItem } from '@ionic/react';
import Form from '../../../components/Form';
import Page from '../../../components/Page';
import Header from '../../../components/Header';
// The component imports
import resetFormData from './source';
// Component Reducer
const ResetPage = (pageProps) => {
    const { t } = useTranslation();
    const resetPageData = {
        settings: {
            title: t('Reset your password'),
            id: 'reset-page',
        },
        captcha: false,
        header: () => {
            const headerProps = {
                title: t('Reset Password'),
                slot: 'start',
                loading: pageProps.loading || false
            };
            return _jsx(Header, { ...headerProps });
        },
        content: () => {
            return _jsxs(_Fragment, { children: [_jsx(IonItem, { children: t('Please include here you account mail to recover your account') }), _jsx(IonItem, { children: t('After that check your email box') }), _jsx(Form, { ...resetFormData() })] });
        },
        footer: () => {
            return _jsx(_Fragment, {});
        }
    };
    return _jsx(Page, { ...resetPageData });
};
export default ResetPage;
