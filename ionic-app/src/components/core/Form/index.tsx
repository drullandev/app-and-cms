import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CreateAnimation, IonGrid, IonRow, IonCol, IonLabel, IonCheckbox, IonInput, IonItem, IonTextarea, IonText } from '@ionic/react'
import * as type from './types'

import Error from './Error'
import Button from './Button'
import Spinner from '../main/Spinner'
import './styles.scss'

/**
 * This component allows to create a form with validations ;)
 * David Rullán Díaz - 19-11-2022
 * @param formData 
 * @returns 
 */
const Form: React.FC<type.FormProps> = (formData) => {

  const validationSchema = formData.validation()  
  const { control, handleSubmit, errors } = useForm<any>({validationSchema})
  const onSubmit = handleSubmit(formData.methods.onSubmit)

  const formAnimation = {
    delay: 1000,
    duration: 1000,
    iterations: 1,
    fromTo: { property: 'opacity', fromValue: 0, toValue: 1 }
  }

  return <CreateAnimation {...formAnimation}>
    <form noValidate id={formData.id} onSubmit={onSubmit}>
      <IonGrid>
        {formData.title.label && <IonRow>
          <IonCol>
            <IonText>{formData.title.label}</IonText>
          </IonCol>
        </IonRow>}
        {Object.keys(formData.rows).map((row: any, key: number)=>        
        <IonRow key={'row-'+key}>{formData.rows[key].cols.map((field: type.FieldProps, i: number) =>
          {field.type === 'input' 
            ? <IonCol key={'col-'+field.name+i}>
                <IonItem>
                  {field.type === 'input' 
                    ? <>
                        <IonLabel position='floating' color='primary'>{field.label}</IonLabel>     
                        {field.required === true && <IonLabel slot='end' position='stacked' color='primary'>*</IonLabel>}               
                      </>
                    : field.type === 'check' 
                      ? field.label !== undefined 
                        ? <IonLabel color='primary'>{field.label}</IonLabel>
                        : <></>
                      : <></>
                  }                                     
                  <Controller
                    as={ field.fieldType === 'check'
                        ? <IonCheckbox slot='end' {...field}/>                             
                        : field.fieldType === 'textarea'
                          ? <IonTextarea {...field}/>                                
                          : field.fieldType === 'spinner'
                            ? <Spinner name='dots'/>
                            : <IonInput 
                                aria-invalid={errors && errors[field.name] ? 'true' : 'false'}
                                aria-describedby={`${field.name}Error`}
                                type={field.fieldType}               
                              />                                   
                    }
                    name={field.name}
                    control={control}
                    onChangeName='onIonChange'
                    onBlurName='onIonBlur'
                  />
                </IonItem>
                <Error name={field.name} label={field.label} errors={errors}/>
              </IonCol>
            : field.type === 'button'
              ? <IonCol key={'col-'+field.name+i}><Button {...field}/></IonCol>
              : <IonCol key={'col-'+field.name+i}><Spinner name='dots'/></IonCol>              
          }
        )}</IonRow>
      )}</IonGrid>
    </form>
  </CreateAnimation>

}

export default Form