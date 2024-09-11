import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonContent, IonFooter, IonSpinner } from '@ionic/react';
import { useLocation } from 'react-router-dom';
//import { restGet } from '../../../data/utils/strapi/strapi.calls'
import PageRow from './PageRow';
import '../styles/About.scss';
const Page = ({ match }) => {
    const location = useLocation();
    const testing = false;
    //const [page, setPage] = useState<PagePropsData>()
    const [slugIn, setSlugIn] = useState('');
    const [pageRows, setPageRows] = useState([]);
    useEffect(() => {
        /*
        restGet('pages', { slug: match.params.slug })
          .then(res => {
            if(testing) console.log('Recovered page', res.data)
            setSlugIn(res.data[0].slug)
            if (typeof res.data[0].rows !== 'undefined') setPageRows(res.data[0].rows)
          })
          */
    }, [match.params.slug]);
    const setArea = (type) => {
        return pageRows ? pageRows.map((row, i) => (row.section === type && getPageRow(row, i))) : _jsx(IonSpinner, { name: 'dots' });
    };
    const getPageRow = (row, i) => (_jsx(PageRow, { menu: row.menu, component: row.component, params: [] }, i));
    return (_jsxs(IonPage, { id: slugIn, children: [_jsx(IonHeader, { children: setArea('header') }), _jsx(IonContent, { children: setArea('content') }), _jsx(IonFooter, { children: setArea('footer') })] }));
};
export default React.memo(Page);
