import React, { useState, useEffect } from 'react';
import { IonToolbar, IonContent, IonButtons, IonMenuButton, IonTitle, IonButton, IonSelect, IonSelectOption, IonSearchbar, IonGrid, IonCol, IonRow, IonDatetime, IonTextarea, IonLabel, IonItem, IonToast, IonModal, IonHeader } from '@ionic/react';
import { GraphQLFilter } from '../../classes/assets/GraphQLFilter';
import useConfStore from '../../classes/stores/app.store';
import Icon from './Icon';
import FilterRow from './FilterRow';
import MainList from './MainList2';

const Main: React.FC = () => {

  const {
    searchString,
    searchOrder,
    orderField,
    filter,
    setSearchString,
    setSearchOrder,
    setOrderField,
    setFilter,
    getMode
  } = useConfStore((state: any) => ({
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

  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(true);
  const [filterRows, setFilterRows] = useState<any>([]);

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

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          {getMode() !== 'ios' && <IonTitle>Main friend</IonTitle>}
          {showSearchbar && (
            <IonSearchbar
              showCancelButton='always'
              placeholder='Search'
              value={searchString}
              onIonChange={(e: CustomEvent) => setSearchString(e.detail.value)}
              onIonCancel={() => setShowSearchbar(false)}
            />
          )}
          <IonButtons slot='end'>
            {showSearchbar && getMode() !== 'ios' && (
              <IonButton onClick={() => setShowSearchbar(true)}>
                <Icon slot='icon-only' name='search' />
              </IonButton>
            )}
            <IonButton onClick={() => setShowFilterModal(true)}>
              <Icon slot='icon-only' name='options' />
            </IonButton>
          </IonButtons>
        </IonToolbar>

        {showFilterModal && (
          <IonToolbar>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonSelect
                    key='field'
                    interface="popover"
                    placeholder='Order Field'
                    value={orderField}
                    onIonChange={(e: CustomEvent) => setOrderField(e.detail.value)}
                  >
                    {GraphQLFilter.fields.options.map((option: any, index: number) => (
                      <IonSelectOption key={'order-field-' + index} value={option.value}>
                        {option.label}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonCol>
                <IonCol>
                  <IonSelect
                    key='searchOrder'
                    interface="popover"
                    placeholder='Direction'
                    value={searchOrder}
                    onIonChange={(e: CustomEvent) => setSearchOrder(e.detail.value)}
                  >
                    {GraphQLFilter.order.options.map((option: any, index: number) => (
                      <IonSelectOption key={'order-' + index} value={option.value}>
                        {option.label}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonCol>
              </IonRow>
            </IonGrid>

            <IonGrid>
              {filter.map((row: any, index: number) => (
                <FilterRow key={index} filter={[]} setFilter={setFilter} />
              ))}
              <IonRow>
                <IonCol>
                  <IonButton expand='block' onClick={() => addFilter()}>
                    Add filter
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
        )}
      </IonHeader>
      <IonContent>
        <MainList />
      </IonContent>
    </IonContent>
  );
};

export default Main;
