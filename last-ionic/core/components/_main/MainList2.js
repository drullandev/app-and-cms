import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as AppConst from '../../app/config/env';
import { GraphQLFilter } from '../../classes/assets/GraphQLFilter';
import { IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonRefresher, IonRefresherContent, useIonToast } from '@ionic/react';
import { useState, useEffect, useRef } from 'react';
import Spinner from './Spinner';
import useSearchStore from '../../classes/stores/searcher.store'; // Import the new search store
const MainList = () => {
    const { searchString, searchOrder, orderField, filter, setSearchString, setSearchOrder, setOrderField, setFilter } = useSearchStore();
    // List params!!! TODO: Move to params jeje!!
    const slug = 'user-contents';
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(1);
    const ionRefresherRef = useRef(null);
    const [listData, setListData] = useState([]);
    const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
    const [setToast, dismissToast] = useIonToast();
    const getDataToCall = () => {
        return {
            model: slug,
            slug: slug,
            paginator: {
                limit: AppConst.paginator.size,
                start: 0,
            },
            direction: searchOrder,
            where: [{
                    type: 'string',
                    key: 'content',
                    action: 'contains',
                    value: searchString
                }],
            searchString: searchString ? searchString : '',
            orderField: orderField ? orderField : GraphQLFilter.fields.default,
            searchOrder: searchOrder ? searchOrder : GraphQLFilter.order.default,
            filter: filter, // Use filter from search store
            struct: {
                id: '',
                published_at: 'date',
                created_at: 'date',
                content: 'string',
                user: {
                    id: 'number',
                    username: 'string',
                    role: {
                        id: 'number'
                    },
                    avatar: {
                        id: 'number'
                    }
                }
            },
            content: {
                spinner: 'dots',
                content: 'Loading more listData...'
            }
        };
    };
    const launchToast = (header, message, color = 'light', position = 'bottom', duration = 3000) => {
        dismissToast();
        setToast({
            header: header,
            buttons: [{ text: 'x', handler: () => dismissToast() }],
            position: position,
            color: color,
            message: message,
            duration: duration,
            animated: true
        });
    };
    useEffect(() => {
        let dataCall = getDataToCall();
        // Simulating data fetch for maxPage calculation
        /*
        restGet(dataCall.slug+'/count')
        .then(res=>{
          setMaxPage(Math.floor( res.data / AppConst.paginator.size ))
        })
        */
    }, []);
    const pushPage = (page) => {
        let dataCall = getDataToCall();
        dataCall.paginator.start = AppConst.paginator.size * page;
        /*
        getGQL(dataCall)
        .then(res=>{
          switch(res.status){
            case 200:
              appendData(listData, res.data.data);
              setPage(page);
            break;
            default:
              launchToast('Oppps!!!', JSON.stringify(res));
              break;
          }
        })
        .catch((res: any) => {
          launchToast('Oppps!!!', JSON.stringify(res));
        })
        */
    };
    useEffect(() => {
        pushPage(page);
    }, [page]);
    const reloadData = () => {
        setListData([]);
    };
    useEffect(() => {
        pushPage(0);
    }, [searchString, searchOrder, orderField]);
    const appendData = (listData, data) => {
        var resData = data[Object.keys(data)[0]];
        const newData = listData ? listData : [];
        for (let i = 0; i < AppConst.paginator.size; i++) {
            newData.push(resData[i]);
        }
        setListData(newData);
    };
    const pushNextPage = (ev) => {
        setTimeout(() => {
            var newPage = page + 1;
            if (newPage === maxPage) {
                setInfiniteDisabled(true);
                return false;
            }
            else {
                pushPage(newPage);
                ev.target.complete();
            }
        }, AppConst.timeout.refresh);
    };
    const putTimeBar = (date = '') => {
        var now = new Date(date);
        let current = now.toDateString();
        return _jsx(IonLabel, { children: current });
    };
    const putABar = (listData) => {
        if (false) {
            return putTimeBar(listData.published_at);
        }
        else {
            return listData
                ? _jsx(IonItem, { routerLink: `/tabs/list/asdfasdfas/${listData.id}`, children: _jsxs(IonLabel, { children: [putContent(listData), putTimeline(listData)] }) })
                : _jsx(Spinner, { name: 'bubbles' });
        }
    };
    const putTimeline = (line) => {
        return _jsxs("p", { children: [line.created_at, "\u2014\u00A0", line.published_at, "\u2014\u00A0", line.published_at] });
    };
    const putContent = (line) => {
        return _jsx("h3", { children: line.id + ' - ' + line.content });
    };
    return (_jsxs(_Fragment, { children: [_jsx(IonRefresher, { slot: 'fixed', ref: ionRefresherRef, onIonRefresh: reloadData, children: _jsx(IonRefresherContent, {}) }), _jsx(IonList, { children: listData.map((row, index) => (putABar(listData[index]))) }), _jsx(IonInfiniteScroll, { threshold: '100px', onIonInfinite: pushNextPage, disabled: isInfiniteDisabled, children: _jsx(IonInfiniteScrollContent, { loadingText: getDataToCall().content.content }) })] }));
};
export default MainList;
