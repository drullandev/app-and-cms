// Used inspirations...
//https://www.smashingmagazine.com/2020/08/forms-validation-ionic-react/

import * as AppConst from '../../../data/static/constants'

import { CreateAnimation, IonText, IonGrid, useIonLoading, useIonToast, getConfig, IonRow, IonCol, IonLabel, IonCheckbox, IonInput, IonItem, IonSpinner, IonTextarea } from '@ionic/react'
import React, { FC, useState, useEffect } from 'react'
import { connect } from '../../../data/connect'

import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

// ABOUT FORMS VALIDATION 
import { Controller, FieldValues, OnSubmit, useForm } from 'react-hook-form'
import * as yup from 'yup'


// FORM INTERFACES
import { FormProps, FieldProps, RowProps } from './FormProps'

// FORM STYLES
import '../main/styles/Form.scss'
import { ObjectShape } from 'yup/lib/object'

//import { FieldProps } from './interfaces/FormProps'
import Button from './Button'
import Error from './Error'

const testingForm = true
const testing = testingForm && process.env.REACT_APP_TESTING
//const validation = true

const Form: FC<FormProps> = ({
  rows,
  methods,
  validation
}) => {

  const history = useHistory()
  const { t } = useTranslation()
  
  // Form Component settings...
  //const [formTitle, setFormTitle] = useState([])
  //const [formOpacity, setFormOpacity] = useState(0)

  // Form validation conditions...
  // Form validation conditions...
  const [formValidation, setFormValidation] = useState<ObjectShape>({})
  const validationSchema = yup.object().shape(formValidation)
  const { control, handleSubmit, errors } = useForm({ validationSchema })


  // Form and window actions
  const [setLoadingAlert, dismissLoadingAlert] = useIonLoading()
  const [setToast, dismissToast] = useIonToast()

  const launchLoading = (message: string, duration: number = 3000) => {
    dismissLoadingAlert()
    setLoadingAlert({ message: t(message), duration: duration })
  }
  
  const launchToast = (
    message: string,
    color: string = 'light',
    position: 'top' | 'bottom' | 'middle' = 'bottom',
    duration: number =  AppConst.timeout.readToast
  ) => {
    dismissToast()
    setToast({
      buttons: [{ text: 'x', handler: () => dismissToast() }],
      position: position,
      color: color,
      message: t(message),
      duration: duration,
      animated: true
    })
  }

  const launchHistory = (
    uri: string,
    timeout: number = AppConst.timeout.redirect,
    params: any = { direction: 'none' }
  ) => {
    setTimeout(() => {
      history.push(uri, params)
    }, timeout)
  }

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
            as={<IonInput 
              aria-invalid={field.errors && field.errors[field.name] ? 'true' : 'false'}
              aria-describedby={`${field.name}Error`}
              type={field.fieldType}               
            />}
            name={field.name}
            control={control}
            onChangeName='onIonChange'
            onBlurName='onIonBlur'
          />
          <Error name={field.name} label={field.name} errors={errors} />  
        </IonItem>
      ),
    
      Checkbox: (field: FieldProps) => (
        <IonItem style={{ paddingTop: '25px' }}>
          {field?.label && <IonLabel color='primary'>{field.label}</IonLabel>}
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
          {field?.label && <IonLabel position='floating' color='primary'>{field.label}</IonLabel>}      
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

      Button: (field: FieldProps) => <Button {...field}/>

    }
  
  }

  const setValidations = async (rows: RowProps[]) => {
console.log(rows)
    let rules : Array<any> = []
    /*for (let i = 0; i < rows.length; i++) {

      var columns = rows[i].cols
      for (var ii = 0; ii < columns.length; ii++) {

        var field = columns[ii]
        if (field.fieldType === 'input') {

          var rule = setFieldValidation(field.type)

          //if (field.type === 'number') {
          //  if (field.min) rule = rule.min(parseInt(field.min))
          //  if (field.max) rule = rule.max(parseInt(field.max))
          //  if (field.num_sign === 'positive') rule = rule.positive()
          //  if (field.num_type === 'integer') rule = rule.integer()
          //}

          //if (row.regexp) {
            //rule = rule.matches(field.regexp, row.regexp_message)
          //}

          //if (field.required === true) {
          //  rule = rule.required()
          //}


          rules[ii] = rule

        }
      }
    }
    setFormValidation(Object.assign(formValidation, rules))
    */
  }

  const setFieldValidation = (type: string) => {
    return type === 'text' ? yup.string() :
      type === 'email' ? yup.string().email() :
        type === 'check' ? yup.boolean().default(false).oneOf([true], 'You must accept this check...') :
          type === 'check_modal' ? yup.boolean().default(false).oneOf([true], 'You must accept this check...') :
            type === 'password' ? yup.string() :
              type === 'number' ? yup.number() : yup.string()
  }

  const FormGrid = (rows: RowProps[]) => {
    return <IonGrid>
      {Object.keys(rows).map((row: any, key: number)=>{
        return <IonRow key={'row-'+key}>
          {rows[key].cols.map((field: FieldProps, i: number) => {
            let cField = field  
            cField.control = control
            return <IonCol key={'col-'+cField.name+i}>
              {getField.returnField(cField)}
            </IonCol>
          })}
        </IonRow>
      })}
    </IonGrid>
  }


  useEffect(() => {
    launchLoading('Loading form...', 345)
    console.log('setting', validation)
    setFormValidation(validation)
    //setValidations(validation)    
    // eslint-disable-next-line
  }, [validation])


  const onSubmit = handleSubmit(({ props }) => {
    console.log( 'SubmitForm', props );
  })

  return <div className='ion-padding'>
    <CreateAnimation
      delay={1000}
      duration={1000}
      iterations={1}
      fromTo={{ property: 'opacity', fromValue: 0, toValue: 1 }}
    >
      <form noValidate onSubmit={onSubmit}>
        {/*formTitle && <IonText color='primary' style={{ textAlign: 'center' }}>
          <h2>{formTitle}</h2>
        </IonText>*/}     
        {rows && <FormGrid {...rows}/>}

        {testing && errors && <IonItem>{JSON.stringify(errors)}</IonItem>}
      </form>
    </CreateAnimation>
  </div>  

}

export default  Form