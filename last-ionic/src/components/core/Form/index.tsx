import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { CreateAnimation, IonGrid, IonRow, IonCol, IonLabel, IonCheckbox, IonInput, IonItem, IonTextarea, IonText, IonSpinner, IonDatetime, IonRadio, IonSelect } from '@ionic/react'
import * as type from './types'

import Error from './Error'
import Button from './Button'
import Spinner from '../main/Spinner'
import '../../../pages/Styles.scss'
import { ErrorProps } from './Error';

/**
 * This component allows to create a form with validations ;)
 * David Rullán Díaz - 19-11-2022
 * @param formData 
 * @returns 
 */
const Form: React.FC<type.FormProps> = (formData) => {

  const validationSchema = formData.validation
  const { control, handleSubmit } = useForm<any>()
  const onSubmit = handleSubmit(formData.methods.onSubmit)

  const formAnimation = {
    delay: 1000,
    duration: 1000,    
    iterations: 1,
    fromTo: { property: 'opacity', fromValue: 0, toValue: 1 }
  }



  const renderLabel = (field: type.FieldProps) => {
    if (!field.label) return null;
    return (
      <>
        <IonLabel color={ field.color ? field.color : 'primary' } position={(field.fieldType !== 'check' || ! field.position) ? 'floating' : field.position}>
          {field.label}
          {field.fieldType === 'check' && field.required && <IonLabel slot='end' position='stacked'>*</IonLabel>}
        </IonLabel>
        {field.fieldType !== 'check' && field.required && <IonLabel slot='end' position='stacked'>*</IonLabel>}
      </>
    )
  }

  // Función que renderiza el componente basado en el tipo de campo y los props asociados
  const renderField = (field: type.FieldProps) => {
    
    // Define un objeto de configuración que mapea los tipos de campos a los componentes correspondientes y los props necesarios
    const componentMap: type.ComponentProps = {
      check: { component: <IonCheckbox />, props: {} },
      textarea: { component: <IonTextarea />, props: {} },
      spinner: { component: <IonSpinner />, props: {} },
      input: { component: <IonInput />, props: {} },
      select: { component: <IonSelect />, props: {} }, // Ejemplo de componente select
      radio: { component: <IonRadio />, props: {} }, // Ejemplo de componente radio
      datetime: { component: <IonDatetime />, props: {} }, // Ejemplo de componente datetime
    }

    // Si el tipo de campo está en el mapeo, renderiza el componente correspondiente con los props
    // De lo contrario, renderiza el componente por defecto con los props
    const { component, props } = componentMap[ field.fieldType || 'input']

    return React.cloneElement(component, { ...field, ...props })

  }


  return <CreateAnimation {...formAnimation}>
    <form noValidate id={formData.id} onSubmit={onSubmit}>
      <IonGrid>
        {
          formData.title.label &&
            <IonRow>
              <IonCol>
                <IonText>{formData.title.label}</IonText>
              </IonCol>
            </IonRow>
        }
        {
          formData.rows && Object.keys(formData.rows).map(
            (row: any, rowkey: number)=>        
              <IonRow key={'row-'+rowkey}>
                {row.cols && Object.keys(row.cols).map(
                  (col: any, colkey: number)=>  {
                    <IonCol key={'col-'+ colkey}>
                      {col.fields && Object.keys(col.fields).map(
                        (field: any, fieldkey: number)=>  {
                          <>
                            <IonItem>
                              {renderLabel(field)}                                     
                              <Controller
                                name={field.name}
                                control={control}
                                defaultValue={field.value} // Agrega defaultValue si es necesario
                                render={({ field }) => <>{renderField(field)}</>}
                              />
                            </IonItem>
                            <Error name={field.name} label={field.label} errors={errors}/>
                          </> 
                        }
                      )} 
                    </IonCol>
                  }
                )}
              </IonRow>
          )
        }
      </IonGrid>
    </form>
  </CreateAnimation>

}

export default Form