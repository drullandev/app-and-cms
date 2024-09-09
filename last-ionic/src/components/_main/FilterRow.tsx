import React, { useEffect, useState } from 'react'

import { GraphQLFilter } from '../../classes/assets/GraphQLFilter'
import { IonSelect, IonSelectOption, IonCol, IonRow, IonDatetime, IonTextarea, IonItem, IonInput, IonButton } from '@ionic/react'
import useConfStore from '../../classes/stores/sessions.store'
import { Filter } from '../../interfaces/Filter'

const FilterRow: React.FC<any> = ({ filter }) => {

  const [key, setKey] = useState(Date.now())

  const [filterField, setFilterField] = useState(GraphQLFilter.fields.default)
  const [filterCondition, setFilterCondition] = useState(GraphQLFilter.conditions.default)
  const [filterType, setFilterType] = useState('date')
  const [filterValue, setFilterValue] = useState('')
  const { } = useConfStore();

  const resetFilterField = (fieldName: string) => {
    setFilterField(fieldName)
    resetFilter(fieldName)
  }

  const resetFilterCondition = (condition: string) => {
    setFilterCondition(condition)
  }

  const resetFilter = (filterField: string) => {
    GraphQLFilter.fields.options.forEach((field: any) => {
      if(field.value === filterField ){
        setFilterType(field.type)
      } 
    })
  }

  useEffect(() => {
    if(filterField === '' || filterCondition === '') return
    updateFilter(key, { key: key, type: filterType, field: filterField, action: filterCondition, value: filterValue })
  },[filterField, filterCondition, filterValue])

  const keyExist = (newFilter: Filter) => {
    return filter.filter((row:any, index: number) => {
      if( row.key === newFilter.key ) return newFilter.key
    })
  }

  const updateFilter = (key: number, values: Filter) => {
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
  }

  return <>
    <IonRow>
      <IonCol>
        <IonSelect
          key='filterField'
          interface="popover"
          placeholder='Field'
          value={filterField}
          onIonChange={(e: CustomEvent) => resetFilterField(e.detail.value)}>
          {GraphQLFilter.fields.options.map((option: any, index: number) => (
            <IonSelectOption key={'filter-field-' + index} value={option.value}>
              {option.label}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonCol>
      <IonCol>
        <IonSelect
          key='filterFieldCondition'
          interface="popover"
          value={filterCondition}
          placeholder='Condition'
          onIonChange={(e: CustomEvent) => resetFilterCondition(e.detail.value)}>
          {GraphQLFilter.conditions.options.map((option: any, index: number) => (
            <IonSelectOption key={'filter-field-condition-' + index} value={option.value}>
              {option.label}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonCol>
    </IonRow>
    <IonRow>
      <IonCol>
        { filterType === 'string'
        ? <IonItem>
            <IonTextarea
              placeholder={'Set extra filter...'}
              onIonChange={(e: any) => setFilterValue(e.detail.value!)}>
            </IonTextarea>
          </IonItem>
        : <IonDatetime
            //displayFormat="DD:MM:YY - mm:ss"
            value={filterValue}
            //</IonCol>onIonChange={e => setFilterValue(e.detail.value!)}
          >
          </IonDatetime>
        }
      </IonCol>
      <IonCol>
        <IonButton  onClick={(e: any) => { console.log('remove '+key) }}>x</IonButton>
      </IonCol>
    </IonRow>

  </>
}

export default FilterRow;