import React, { FC, useEffect, useState } from 'react'
import { IonItem, IonLabel, IonInput, IonCheckbox, IonTextarea, IonSpinner } from '@ionic/react'
import { Controller } from 'react-hook-form'

import Error from './Error'
import Button from './Button'

import { FieldProps } from './interfaces/FormProps'

const FieldNew: FC<FieldProps> = (params) => {

  const [field, setField] = useState<FieldProps>(params)
  useEffect(() => {    
    setField(params)
  }, [params])

  const getField = {

    returnField: (field: FieldProps) => {      
      if (!field) return <IonSpinner name='dots' />
      switch (field.type) {
        case 'input':
          switch (field.fieldType) {
            case 'check': return getField.render.Checkbox(field)
            case 'textarea': return getField.render.Textarea(field)
            case 'check_modal': return getField.render.ConditionsCheckbox(field)
            default: return getField.render.Input(field)
          }
        case 'button': return getField.render.Button(field)
        default: return <IonSpinner name='dots' />
      }
    },

    render: {

      Input: (field: FieldProps) => (
        <IonItem key={field.name}>
          <IonLabel position='floating' color='primary'>{field.label}</IonLabel>
          {field.required && field.required === true && <IonLabel slot='end' position='stacked' color='primary'>*</IonLabel>}
          <Controller
            as={<>
              <IonInput
                aria-invalid={field.errors && field.errors[field.name] ? 'true' : 'false'}
                aria-describedby={`${field.name}Error`}
                type={field.fieldType}
              />
              <Error {...field} />
            </>}
            name={field.name}
            control={field.control}
            onChangeName='onIonChange'
            onBlurName='onIonBlur'
          />
        </IonItem>
      ),
    
      Checkbox: (field: FieldProps) => (
        <IonItem style={{ paddingTop: '25px' }}>
          {params?.label && <IonLabel color='primary'>{field.label}</IonLabel>}
          <Controller
            as={<>
              <IonCheckbox slot='end' name={field.label} />
              <Error {...field} />
            </>}
            name={field.name}
            control={field.control}
            onChangeName='onIonChange'
            onBlurName='onIonBlur'
          />
        </IonItem>
      ),

      ConditionsCheckbox: (field: FieldProps) => (
        <IonItem style={{ paddingTop: '25px' }}>
          {/*<ContentCheck name={field.label} label={label} slug={field.slug} />*/}
          <Controller
            as={<>
              <IonCheckbox slot='end' name={field.label} />
              <Error {...field} />
            </>}
            name={field.name}
            control={field.control}
            onChangeName='onIonChange'
            onBlurName='onIonBlur'
          />
        </IonItem>
      ),
    
      Textarea: (field: FieldProps) => (
        <IonItem>
          {params?.label && <IonLabel position='floating' color='primary'>{field.label}</IonLabel>}      
          <Controller
            as={<>
              <IonTextarea value={field.name}></IonTextarea>
              <Error {...field} />
            </>}
            name={field.name}
            control={field.control}
            onChangeName='onIonChange'
            onBlurName='onIonBlur'
          />
        </IonItem>
      ),
    
      Button: (field: FieldProps) => (
        <>    
          <Controller
            as={<>
              <Button {...field}/>
              <Error {...field}/>
            </>}
            name={field.name}
            control={field.control}
            onChangeName='onIonChange'
            onClick='onIonClick'
            onBlurName='onIonBlur'
          />
        </>
      )
  
    }
  
  }

  return getField.returnField(field)

}

export default React.memo(FieldNew)