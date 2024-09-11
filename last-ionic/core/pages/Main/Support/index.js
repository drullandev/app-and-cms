import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import Page from '../../../components/Page';
import Header from '../../../components/Header';
import Chat from '../../../components/Chat';
const SupportPage = (pageProps) => {
    const { t } = useTranslation();
    const pageSettings = {
        settings: {
            id: 'support-page',
            title: t('Do you have some problem?'),
        },
        ga4: {
            load: {
                category: 'support',
                action: 'page-load',
                label: 'support-landing',
            }
        },
        header: () => {
            const headerProps = {
                title: t('Support'),
                slot: 'start',
            };
            return _jsx(Header, { ...headerProps });
        },
        content: () => {
            return _jsx(Chat, {});
        },
        footer: () => { return _jsx(_Fragment, {}); }
    };
    return (_jsx(Page, { ...pageSettings }));
};
export default SupportPage;
