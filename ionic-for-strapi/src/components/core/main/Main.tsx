import * as AppConst from '../../../static/constants'

import React, { useState, useEffect } from 'react'
import { IonToolbar, IonContent, IonButtons, IonMenuButton, IonTitle, IonButton, IonSelect, IonSelectOption, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonGrid, IonCol, IonRow, IonDatetime, IonTextarea, IonLabel, IonItem } from '@ionic/react'

//import { restGet, getGQL } from '../../../data/rest/rest.utils'
import { setSearchString, setSearchOrder, setOrderField, setFilter } from '../../../data/sessions/sessions.actions'
//import { SessionState } from '../../../data/sessions/sessions.actions'
import { empty } from '../../../data/utils/common'

import Icon from './Icon'
import FilterRow from './FilterRow'

import MainList from './MainList2'

import { connect } from '../../../data/connect'

import { Filter } from './interfaces/Filter'

export interface FilterModel {
  filterField?: string
  filterCondition?: string
  filterDate?: string
}

interface OwnProps { }
interface StateProps {
  mode: 'ios' | 'md'
  searchString: string
  searchOrder: 'asc' | 'desc'
  orderField: 'published_at' | string,
  filterDate: string,
  filterField: string,
  filterCondition: string,
  filter: Filter[]
}

interface DispatchProps {
  setSearchString: typeof setSearchString
  setSearchOrder: typeof setSearchOrder
  setOrderField: typeof setOrderField
  setFilter: typeof setFilter
}

type ThisProps = OwnProps & StateProps & DispatchProps

const Main: React.FC<ThisProps> = ({
  mode,
  setSearchString, searchString,
  setSearchOrder, searchOrder,
  setOrderField, orderField,
  setFilter, filter
}) => {

  const ios = (mode === 'ios')
  const md = (mode === 'md')

  const [showSearchbar, setShowSearchbar] = useState<boolean>(false)
  const [showFilterModal, setShowFilterModal] = useState<boolean>(true)

  const [filterRows, setFilterRows] = useState<any>([])

  useEffect(()=>{
    setSearchString('')
    setSearchOrder(AppConst.filter.order.default)
    setOrderField(AppConst.filter.fields.default)
    resetFilters()
  },[])

  const resetFilters = () => {
    setFilter([])
  }

  const addFilter = () => {
    let newFilter = filter      
    newFilter.push({
      key: Date.now(),
      type: 'string',
      field: AppConst.filter.fields.default,
      action: 'eq',
      value: ''
    })
    setFilterRows(newFilter)
  }

  return <IonContent>

    <IonHeader>

      <IonToolbar>

        <IonButtons slot='start'>
          <IonMenuButton />
        </IonButtons>

        {!ios && <IonTitle>Main friend</IonTitle>}

        {showSearchbar &&
          <IonSearchbar
            showCancelButton='always'
            placeholder='Search'
            onIonChange={(e: CustomEvent) => setSearchString(e.detail.value)}
            onIonCancel={() => setShowSearchbar(false)}>
          </IonSearchbar>
        }

        <IonButtons slot='end'>

          {showSearchbar && !ios &&
            <IonButton onClick={() => setShowSearchbar(true)}>
              <Icon slot='icon-only' name='search' />
            </IonButton>
          }

          <IonButton onClick={() => setShowFilterModal(true)}>
            <Icon slot='icon-only' name='options' />
          </IonButton>

        </IonButtons>

      </IonToolbar>

      <IonToolbar>
        <IonSearchbar
          placeholder='Search'
          value={searchString}
          onIonChange={(e: CustomEvent) => setSearchString(e.detail.value)}>
        </IonSearchbar>
      </IonToolbar>

      {showFilterModal &&
        <IonToolbar>          

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonSelect
                    key='field'
                    interface="popover"
                    placeholder='Order Field'
                    value={orderField}                  
                    onIonChange={(e: CustomEvent) => setOrderField(e.detail.value)}>
                    {AppConst.filter.fields.options.map((option: any, index: number) => (
                      <IonSelectOption key={'order-field-'+index} value={option.value}>
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
                    onIonChange={(e: CustomEvent) => setSearchOrder(e.detail.value)}>
                    {AppConst.filter.order.options.map((option: any, index: number) => (
                      <IonSelectOption key={'order-'+index} value={option.value}>
                        {option.label}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonCol>
              </IonRow>
            </IonGrid>

            <IonGrid>
              {filter && filter.map((row: any, index: number)=>{
                return <FilterRow key={index} filter={[]} setFilter={setFilter}/>
              })}
              <IonRow>
                <IonCol>
                  <IonButton expand='block' onClick={(e: any) => { addFilter() }}>Add filter</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>

        </IonToolbar>
      }

    </IonHeader>
    <IonContent>

      <MainList searchOrder={searchOrder} orderField={'asc'} filter={[]} setSearchString={setSearchString} setSearchOrder={setSearchOrder} setOrderField={setOrderField} setFilter={setFilter} />

    </IonContent>
    {/*<ShareSocialFab />*/}

  </IonContent>

}

export default connect<ThisProps>({
  mapStateToProps: (state) => ({
    mode: getConfig()!.get('mode'),
    searchString: state.data.searchString,
    searchOrder: state.data.searchOrder,
    orderField: state.data.orderField,
    filter: state.data.filter
  }),
  mapDispatchToProps: {
    setSearchString,
    setSearchOrder,
    setOrderField,
    setFilter
  },
  component: Main
})