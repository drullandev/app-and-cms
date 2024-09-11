import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useMemo, useState } from 'react';
import { IonFooter, IonGrid, IonRow, IonCol, IonToolbar, IonImg, getConfig } from '@ionic/react';
//import { MenuProps } from '../../../data/models/Menu'
//import Storage from '../../classes/Storage'
import { useHistory } from "react-router";
//import { translate } from '../../../data/utils/translations'
import { appAssets } from '../../app/config/env';
const FooterMenu = ({ index = 0, path = '' }) => {
    const ios = 'ios' === getConfig().get('mode');
    const history = useHistory();
    const [mainMenu, setMainMenu] = useState([]);
    const [showFooter, setShowFooter] = useState(true);
    const [footerIndex, setFooterIndex] = useState(index);
    const imgUrl = (url) => {
        return appAssets + url.replace('uploads/', "");
        //return (onlineStatus ? apiUrl : 'assets/images') + url
    };
    const footer = useMemo(() => {
        return {
            load: (index, path) => {
                footer.toggleShowHide();
                //getStorage('mainMenu').then(footer.setMain)
                if (path !== '')
                    footer.toggleMenu(path);
            },
            setMain: (mainMenu) => {
                if (!mountedRef.current)
                    return; // Check if the component is still mounted before updating the state
                setMainMenu(mainMenu);
                // footer.boldSubmenu()
            },
            handleClick: (parent) => {
                footer.toggleShowHide();
                history.replace(parent);
            },
            toggleShowHide: () => {
                //let show = menuSettings.hiddenFooter.indexOf(history.location.pathname) === -1
                //if (!show) setShowFooter(show)
            },
            toggleMenu: (path) => {
                let p = path.split('/');
                switch (p[2]) {
                    case 'explore-and-equip':
                        setFooterIndex(1);
                        break;
                    case 'assistance':
                        setFooterIndex(3);
                        break;
                    case 'routes':
                        setFooterIndex(1);
                        break;
                }
            }
        };
    }, [history]);
    const mountedRef = React.useRef(false);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false; // Cleanup function to mark the component as unmounted
        };
    }, []);
    useEffect(() => {
        footer.load(footerIndex, path);
    }, [footerIndex, footer, path]);
    return (_jsx(IonFooter, { id: 'footer', slot: 'bottom', style: { display: showFooter ? 'block' : 'none' }, children: _jsx(IonToolbar, { style: { padding: ios ? '0 0 15px 0' : '0' }, children: _jsx(IonGrid, { style: { padding: '0' }, children: _jsx(IonRow, { children: mainMenu && mainMenu.map((r, i) => (_jsx(IonCol, { size: '3', style: { padding: '0' }, className: 'cursor-pointer ion-text-center ion-align-content-center', onClick: () => { footer.handleClick('/' + r.ionic_resource + '/' + r.slug); }, children: _jsx(IonImg, { id: 'button-' + r.slug, alt: '', style: { maxHeight: '90px', maxWidth: '70px', width: '80%', margin: '0 auto' }, className: 'cursor-pointer', src: footerIndex === i
                                ? imgUrl(r.icon.url)
                                : imgUrl(r.icon_inactive.url), onClick: () => { footer.handleClick('/' + r.ionic_resource + '/' + r.slug); } }) }, 'footer-alt-' + r.slug))) }) }) }) }));
};
export default React.memo(FooterMenu);
