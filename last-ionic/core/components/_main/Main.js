import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { IonToolbar, IonContent, IonButtons, IonMenuButton, IonTitle, IonButton, IonSelect, IonSelectOption, IonSearchbar, IonGrid, IonCol, IonRow, IonHeader } from '@ionic/react';
import { GraphQLFilter } from '../../classes/assets/GraphQLFilter';
import useConfStore from '../../classes/stores/sessions.store';
import Icon from './Icon';
import FilterRow from './FilterRow';
import MainList from './MainList2';
const Main = () => {
    const { searchString, searchOrder, orderField, filter, setSearchString, setSearchOrder, setOrderField, setFilter, getMode } = useConfStore((state) => ({
        searchString: state.searchString,
        searchOrder: state.searchOrder,
        orderField: state.orderField,
        filter: state.filter,
        setSearchString: state.setSearchString,
        setSearchOrder: state.setSearchOrder,
        setOrderField: state.setOrderField,
        setFilter: state.setFilter,
        getMode: state.mode,
    }));
    const [showSearchbar, setShowSearchbar] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(true);
    const [filterRows, setFilterRows] = useState([]);
    useEffect(() => {
        setSearchString('');
        setSearchOrder(GraphQLFilter.order.default);
        setOrderField(GraphQLFilter.fields.default);
        resetFilters();
    }, [setSearchString, setSearchOrder, setOrderField, setFilter]);
    const resetFilters = () => {
        setFilter([]);
    };
    const addFilter = () => {
        let newFilter = [...filter];
        newFilter.push({
            key: Date.now(),
            type: 'string',
            field: GraphQLFilter.fields.default,
            action: 'eq',
            value: ''
        });
        setFilter(newFilter);
    };
    return (_jsxs(IonContent, { children: [_jsxs(IonHeader, { children: [_jsxs(IonToolbar, { children: [_jsx(IonButtons, { slot: 'start', children: _jsx(IonMenuButton, {}) }), getMode() !== 'ios' && _jsx(IonTitle, { children: "Main friend" }), showSearchbar && (_jsx(IonSearchbar, { showCancelButton: 'always', placeholder: 'Search', value: searchString, onIonChange: (e) => setSearchString(e.detail.value), onIonCancel: () => setShowSearchbar(false) })), _jsxs(IonButtons, { slot: 'end', children: [showSearchbar && getMode() !== 'ios' && (_jsx(IonButton, { onClick: () => setShowSearchbar(true), children: _jsx(Icon, { slot: 'icon-only', name: 'search' }) })), _jsx(IonButton, { onClick: () => setShowFilterModal(true), children: _jsx(Icon, { slot: 'icon-only', name: 'options' }) })] })] }), showFilterModal && (_jsxs(IonToolbar, { children: [_jsx(IonGrid, { children: _jsxs(IonRow, { children: [_jsx(IonCol, { children: _jsx(IonSelect, { interface: "popover", placeholder: 'Order Field', value: orderField, onIonChange: (e) => setOrderField(e.detail.value), children: GraphQLFilter.fields.options.map((option, index) => (_jsx(IonSelectOption, { value: option.value, children: option.label }, 'order-field-' + index))) }, 'field') }), _jsx(IonCol, { children: _jsx(IonSelect, { interface: "popover", placeholder: 'Direction', value: searchOrder, onIonChange: (e) => setSearchOrder(e.detail.value), children: GraphQLFilter.order.options.map((option, index) => (_jsx(IonSelectOption, { value: option.value, children: option.label }, 'order-' + index))) }, 'searchOrder') })] }) }), _jsxs(IonGrid, { children: [filter.map((row, index) => (_jsx(FilterRow, { filter: [], setFilter: setFilter }, index))), _jsx(IonRow, { children: _jsx(IonCol, { children: _jsx(IonButton, { expand: 'block', onClick: () => addFilter(), children: "Add filter" }) }) })] })] }))] }), _jsx(IonContent, { children: _jsx(MainList, {}) })] }));
};
export default Main;
