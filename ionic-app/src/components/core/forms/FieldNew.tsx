import React, { FC, useEffect, useState, useMemo } from 'react'
import { IonItem, IonLabel, IonInput, IonCheckbox, IonTextarea, IonSpinner } from '@ionic/react'
import { Controller } from 'react-hook-form'
import ContentCheck from './ContentCheck'

import Error from './Error'
import Button from './Button'

import { FieldNewProps } from './interfaces/FieldNewProps'

const FieldNew: FC<FieldNewProps> = (params) => {

  //console.log('FieldNew', params)

  const [field, setField] = useState<any>(params)
  const [type, setType] = useState<any>(params.type)

  // Get the field settings
  useEffect(() => {    
    setField(params)
    /* 

    setType(field.type)
    restGet('fields', { slug: slug })
      .then(res => {
        switch(res.status) {
          case 200:
            setField(res.data[0])
            
          break
          default:
            console.error('call error', res)
          break
        }})
      .catch(error => console.error(error))
      */
  }, [params])

  const fieldControl = {

    returnField: (field: any) => {      
      if (!field) return <IonSpinner name='dots' />
      switch (field.type) {
        case 'input':
          switch (field.fieldType) {
            //case 'check': return fieldControl.renderCheckbox(field)
            //case 'textarea': return fieldControl.renderTextarea(field)
            //case 'check_modal': return fieldControl.renderConditionsCheckbox(field)
            default: return fieldControl.renderInput(field)
          }
        //case 'button': return fieldControl.renderButton(field)
        default: return <IonSpinner name='dots' />
      }
    },

    renderInput: (field:any) => {
      return <IonItem>
        {field.label && <IonLabel position='floating' color='primary'>{field.label}</IonLabel>}
        {field.required && <IonLabel slot='end' position='stacked' color='primary'>*</IonLabel>}
        <Controller
          as={(
            <IonInput
              aria-invalid={field.errors && field.errors[field.name] ? 'true' : 'false'}
              aria-describedby={`${field.name}Error`}
              type={field.type}
            />
          )}
          name={field.name}
          control={field.control}
          onChangeName='onIonChange'
          onBlurName='onIonBlur'
        />
      </IonItem>
    },
  
    renderCheckbox: () => (
      <IonItem style={{ paddingTop: '25px' }}>
        {params?.label && <IonLabel color='primary'>{field.label}</IonLabel>}
        <Controller
          as={(
            <IonCheckbox slot='end' name={field.label} />
          )}
          name={field.name}
          control={field.control}
          onChangeName='onIonChange'
          onBlurName='onIonBlur'
        />
      </IonItem>
    ),
  
    renderConditionsCheckbox: () => (
      <IonItem style={{ paddingTop: '25px' }}>
        {/*<ContentCheck name={field.label} label={label} slug={field.slug} />*/}
        <Controller
          as={(
            <IonCheckbox slot='end' name={field.label} />
          )}
          name={field.name}
          control={field.control}
          onChangeName='onIonChange'
          onBlurName='onIonBlur'
        />
      </IonItem>
    ),
  
    renderTextarea: () => (
      <IonItem>
        {params?.label && <IonLabel position='floating' color='primary'>{field.label}</IonLabel>}      
        <Controller
          as={(
            <IonTextarea value={field.name}></IonTextarea>
          )}
          name={field.name}
          control={field.control}
          onChangeName='onIonChange'
          onBlurName='onIonBlur'
        />
      </IonItem>
    ),
  
    renderButton: (field:any) => (
      <Button label={field.label} button={field} />
    )
  }

  return <>
    {field.type === 'input'
      ? fieldControl.returnField(field)
      : fieldControl.renderButton(field)
    }
    {field.type !== 'button' && <Error {...params} />}
  </>

}

export default React.memo(FieldNew)