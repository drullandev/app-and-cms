import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { GraphQLFilter } from '../../classes/assets/GraphQLFilter';
import { IonSelect, IonSelectOption, IonCol, IonRow, IonDatetime, IonTextarea, IonItem, IonButton } from '@ionic/react';
import useConfStore from '../../classes/stores/sessions.store';
const FilterRow = ({ filter }) => {
    const [key, setKey] = useState(Date.now());
    const [filterField, setFilterField] = useState(GraphQLFilter.fields.default);
    const [filterCondition, setFilterCondition] = useState(GraphQLFilter.conditions.default);
    const [filterType, setFilterType] = useState('date');
    const [filterValue, setFilterValue] = useState('');
    const {} = useConfStore();
    const resetFilterField = (fieldName) => {
        setFilterField(fieldName);
        resetFilter(fieldName);
    };
    const resetFilterCondition = (condition) => {
        setFilterCondition(condition);
    };
    const resetFilter = (filterField) => {
        GraphQLFilter.fields.options.forEach((field) => {
            if (field.value === filterField) {
                setFilterType(field.type);
            }
        });
    };
    useEffect(() => {
        if (filterField === '' || filterCondition === '')
            return;
        updateFilter(key, { key: key, type: filterType, field: filterField, action: filterCondition, value: filterValue });
    }, [filterField, filterCondition, filterValue]);
    const keyExist = (newFilter) => {
        return filter.filter((row, index) => {
            if (row.key === newFilter.key)
                return newFilter.key;
        });
    };
    const updateFilter = (key, values) => {
        /*console.log('values', values)
        var newFilter = []
        for (var i = 0; i < filter.length; i++) {
          console.log(filter[i].key+'==='+key)
          if (filter[i].key === key) {
            newFilter.push(values)
          }else{
            newFilter.push(filter[i])
          }
        }
        setFilter(newFilter)
        console.log('the new filter', newFilter)
        */
    };
    return _jsxs(_Fragment, { children: [_jsxs(IonRow, { children: [_jsx(IonCol, { children: _jsx(IonSelect, { interface: "popover", placeholder: 'Field', value: filterField, onIonChange: (e) => resetFilterField(e.detail.value), children: GraphQLFilter.fields.options.map((option, index) => (_jsx(IonSelectOption, { value: option.value, children: option.label }, 'filter-field-' + index))) }, 'filterField') }), _jsx(IonCol, { children: _jsx(IonSelect, { interface: "popover", value: filterCondition, placeholder: 'Condition', onIonChange: (e) => resetFilterCondition(e.detail.value), children: GraphQLFilter.conditions.options.map((option, index) => (_jsx(IonSelectOption, { value: option.value, children: option.label }, 'filter-field-condition-' + index))) }, 'filterFieldCondition') })] }), _jsxs(IonRow, { children: [_jsx(IonCol, { children: filterType === 'string'
                            ? _jsx(IonItem, { children: _jsx(IonTextarea, { placeholder: 'Set extra filter...', onIonChange: (e) => setFilterValue(e.detail.value) }) })
                            : _jsx(IonDatetime
                            //displayFormat="DD:MM:YY - mm:ss"
                            , { 
                                //displayFormat="DD:MM:YY - mm:ss"
                                value: filterValue }) }), _jsx(IonCol, { children: _jsx(IonButton, { onClick: (e) => { console.log('remove ' + key); }, children: "x" }) })] })] });
};
export default FilterRow;
