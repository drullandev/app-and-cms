import React, { FC, useEffect, useState, useMemo } from 'react'
import { IonItem, IonLabel, IonInput, IonCheckbox, IonTextarea, IonSpinner } from '@ionic/react'
import { Controller } from 'react-hook-form'
import ContentCheck from './ContentCheck'

import Error from './Error'
import Button from './Button'

import { FieldNewProps } from './interfaces/FieldNewProps'

const FieldNew: FC<FieldNewProps> = (params) => {

  console.log(params)

  const [field, setField] = useState<any>()
  const [type, setType] = useState<any>()

  // Get the field settings
  useEffect(() => {
    setField(params)
    setType(params.type)
    /*restGet('fields', { slug: slug })
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

    returnField: () => {
      if (!field) return <IonSpinner name='dots' />
      switch (type) {
        case 'input':
          switch (field.type) {
            case 'check': return fieldControl.renderCheckbox()
            case 'textarea': return fieldControl.renderTextarea()
            case 'check_modal': return fieldControl.renderConditionsCheckbox()
            default: return fieldControl.renderInput()
          }
        case 'button': return fieldControl.renderButton()
        default: return <IonSpinner name='dots' />
      }
    },

    renderInput: () => (
      <IonItem>
        {params.label && <IonLabel position='floating' color='primary'>{params.label}</IonLabel>}
        {params.required && <IonLabel slot='end' position='stacked' color='primary'>*</IonLabel>}
        <Controller
          as={(
            <IonInput
              aria-invalid={params.errors && params.errors[field.name] ? 'true' : 'false'}
              aria-describedby={`${field.name}Error`}
              type={field.type}
            />
          )}
          name={params.name}
          control={params.control}
          onChangeName='onIonChange'
          onBlurName='onIonBlur'
        />
      </IonItem>
    ),
  
    renderCheckbox: () => (
      <IonItem style={{ paddingTop: '25px' }}>
        {params?.label && <IonLabel color='primary'>{params.label}</IonLabel>}
        <Controller
          as={(
            <IonCheckbox slot='end' name={field.label} />
          )}
          name={params.name}
          control={params.control}
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
          name={params.name}
          control={params.control}
          onChangeName='onIonChange'
          onBlurName='onIonBlur'
        />
      </IonItem>
    ),
  
    renderTextarea: () => (
      <IonItem>
        {params?.label && <IonLabel position='floating' color='primary'>{params.label}</IonLabel>}      
        <Controller
          as={(
            <IonTextarea value={field.name}></IonTextarea>
          )}
          name={params.name}
          control={params.control}
          onChangeName='onIonChange'
          onBlurName='onIonBlur'
        />
      </IonItem>
    ),
  
    renderButton: () => (
      <Button label={params.label} button={field} />
    )
  }

  return <>
    {type === 'input'
      ? fieldControl.returnField()
      : fieldControl.renderButton()}
    {type !== 'button' && <Error {...params} />}
  </>

}

export default React.memo(FieldNew)