import * as AppConst from '../../../data/static/constants'

import { CreateAnimation, IonText, IonGrid, useIonLoading, useIonToast, getConfig, IonButton, IonRow, IonCol, IonCheckbox, IonInput, IonItem, IonLabel, IonSpinner, IonTextarea } from '@ionic/react'
import React, { FC, useState, useEffect, useRef } from 'react'

import {
  setisLoggedIn, 
  setDarkMode,
  setJwt
} from '../../../data/user/user.actions'
import { connect } from '../../../data/connect'

import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

// ABOUT FORMS VALIDATION 
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import axios from 'axios'

// Components
import FormNewRow from './FormNewRow'

// FORM INTERFACES
import { FormProps, FieldProps, RowProps } from './interfaces/FormProps2'

////import { restGet } from '../../../data/utils/rest/rest.utils'

// FORM STYLES
import '../main/styles/Form.scss'
import { ObjectShape } from 'yup/lib/object'


//import { FieldProps } from './interfaces/FormProps2'
import Button from './Button'

const validation = true

interface StateProps {
  mode: 'ios' | 'md'
  userJwt: string
  userNickname: string
  userDarkMode: boolean
  isLoggedIn: boolean,
  loading: boolean,
}

interface DispatchProps {}

interface MyFormProps extends FormProps, StateProps, DispatchProps {}


const FieldNew: FC<FieldProps> = (params) => {

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

    renderInput: (field: FieldProps) => {

      console.log('field',field)
      return <IonItem key={field.name}>
        <IonLabel position='floating' color='primary'>{field.label}</IonLabel>
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
      : null
    }
    {/*field.type !== 'button' && <Error {...params} />*/}
  </>

}

const Form: FC<MyFormProps> = ({
  rows,
  methods
}) => {

  const history = useHistory()
  const { t } = useTranslation()

  // Form Component settings...
  const [formTitle, setFormTitle] = useState([])
  const [formOpacity, setFormOpacity] = useState(0)

  // Form validation conditions...
  const [formValidation, setFormValidation] = useState<ObjectShape>({})
  const validationSchema = yup.object().shape(formValidation)
  const { control, register, handleSubmit, errors } = useForm({ validationSchema })

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

  useEffect(() => {
    launchLoading('Loading form...', 345)
    // eslint-disable-next-line
  }, [])

  const setValidations = async (rows: any) => {
    let rules : Array<any> = []
    for (let i = 0; i < rows.length; i++) {
      var columns = rows[i].columns
      for (var ii = 0; ii < columns.length; ii++) {

        var row = columns[ii]

        if (row.field.fieldType === 'input') {
          var type = row.field.type
          var rule = setFieldValidation(type)
          if (type === 'number') {
            //if (row.field.num_sign === 'positive') rule = rule.positive()
            //if (row.field.num_type === 'integer') rule = rule.integer()
          }

          if (row.field.regexp) {
            //rule = rule.matches(row.field.regexp, row.field.regexp_message)
          }

          if (row.required === true) {
            rule = rule.required()
          }

          //if (row.field.min) rule = rule.min(parseInt(row.field.min))
          //if (row.field.max) rule = rule.max(parseInt(row.field.max))

          rules[row.field.slug] = rule

        }
      }
    }
    setFormValidation(Object.assign(formValidation, rules))
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
            return <IonCol key={'col-'+field.name+i}>
              <FieldNew {...field}/>
            </IonCol>
          })}
        </IonRow>
      })}
    </IonGrid>
  }
  
  return <div className='ion-padding'>
    <CreateAnimation
      delay={ 1000 }
      duration={1000}
      iterations={1}
      fromTo={[{ property: 'opacity', fromValue: 0, toValue: 1 }]}
    >
      <form noValidate key={'aasdf'} name={'asfsadf'} onSubmit={handleSubmit(methods.onSubmit)}>
        {formTitle && <IonText color='primary' style={{ textAlign: 'center' }}>
          <h2>{formTitle}</h2>
        </IonText>}     
        <FormGrid {...rows}/>
      </form>
    </CreateAnimation>
  </div>  

}

export default connect<FormProps>({

  mapStateToProps: (state) => ({
    mode: getConfig()!.get('mode'),
    userJwt: state.user.userJwt,
    userDarkMode: state.user.userDarkMode,
    isLoggedIn: state.user.isLoggedIn,
  }),

  mapDispatchToProps: {
    //setUserMode,
    setJwt,
    setDarkMode,
    setisLoggedIn,
  },

  component: Form

})