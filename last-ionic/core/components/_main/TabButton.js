import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { IonTabButton, IonLabel } from '@ionic/react';
//import { restGet } from '../../../data/utils/rest/rest.utils'
import Icon from './Icon';
/**
 *
 * @returns
 */
const TabButton = (tab) => {
    console.log('tab param TabButton', tab);
    const [path, setPath] = useState();
    useEffect(() => {
        /*restGet('paths', { slug: tab.path.slug })
          .then(res => {
            //console.log('loaded TabButton', res.data)
            setPath(res.data)
          })
          .catch(err => { console.log(err) })
          */
    }, []);
    //  console.log('TabButton', tab)
    return _jsxs(IonTabButton, { tab: tab.path.slug, href: tab.path.value, children: [_jsx(Icon, { slot: 'start', name: tab.icon }), _jsx(IonLabel, { children: tab.label })] }, tab.path.slug + '-tab');
};
export default TabButton;
