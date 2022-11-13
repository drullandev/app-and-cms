import * as AppConst from '../../../data/static/constants'

import { CreateAnimation, IonText, IonGrid, useIonLoading, useIonToast, getConfig, IonButton, IonRow, IonCol } from '@ionic/react'
import React, { FC, useState, useEffect, useRef } from 'react'

import {
  setisLoggedIn, 
  setUsername,
  setEmail,
  setId,
  setDarkMode,
  setLoading,
  setJwt
} from '../../../data/user/user.actions'
import { connect } from '../../../data/connect'

import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

// ABOUT FORMS VALIDATION 
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import axios from 'axios'

// Components
import FormNewRow from './FormNewRow'

// FORM INTERFACES
import { FormNewProps } from './interfaces/FormNewProps'

////import { restGet } from '../../../data/utils/rest/rest.utils'

// FORM STYLES
import '../main/styles/Form.scss'
import { ObjectShape } from 'yup/lib/object'
import { FieldNewProps } from './interfaces/FieldNewProps'
import FieldNew from './FieldNew'

const validation = true

interface StateProps {
  mode: 'ios' | 'md'
  userJwt: string
  userNickname: string
  userDarkMode: boolean
  isLoggedIn: boolean,
  loading: boolean,
  //userData: object
  //userEmail: string
  //userId: number
}

interface DispatchProps {
  /*setisLoggedIn: typeof setisLoggedIn
  setUserJwt: typeof setUserJwt
  setUserEmail: typeof setUserEmail
  setDarkMode: typeof setDarkMode
  setNickname: typeof setNickname
  setUserId: typeof setUserId
  setLoading: typeof setLoading*/
  //setUserData: typeof setUserData
  //loadConfData: typeof loadConfData
  //loadUserData: typeof loadUserData
}

interface MyFormProps extends FormNewProps, StateProps, DispatchProps {}

const FormNew: FC<MyFormProps> = ({
  onSubmit,
  rows
  /* 
  params,
  setUserJwt,
  userDarkMode, setDarkMode,
  setisLoggedIn*/
}) => {

  const history = useHistory()
  const { t } = useTranslation()

  // Form Component settings...
  const [formTitle, setFormTitle] = useState([])
  const [formOpacity, setFormOpacity] = useState(0)

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

  useEffect(() => {
    launchLoading('Loading form...', 345)
    
    /*restGet('forms', { slug: slug })
      .then(res => {
        switch (res.status) {
          case 200:
            setFormTitle(res.data[0].title)
            if (validation) setValidations(res.data[0].rows) //XXX Please, before set rows ;)
            setFormRows(res.data[0].rows)
          break
          default:
            launchToast(res.data.message[0].messages[0].message, 'warning')
          break
        }
      })
      .catch(err => {
        launchToast(err.response.data.message[0].messages[0].message, 'danger')
      })
    */
   
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

  const FieldRow = (row:any)=>{
    return <IonRow>{FieldColumns(row)}</IonRow>
  }

  const FieldColumns = (columns: any) =>{
    return <>{columns.map((field: any, i: number) => {  
      return <IonCol><FieldNew {...field}/></IonCol>
    })}</>
  }

  return <div className='ion-padding'>
    <CreateAnimation
      delay={ 1000 }
      duration={1000}
      iterations={1}
      fromTo={[{ property: 'opacity', fromValue: 0, toValue: 1 }]}
    >
      <form noValidate key={'aasdf'} name={'asfsadf'} onSubmit={handleSubmit(onSubmit)}>
        {formTitle && <IonText color='primary' style={{ textAlign: 'center' }}>
          <h2>{formTitle}</h2>
        </IonText>}
        {/*<IonGrid>
          {fields.map((row: any, i: number) => {  
            return  <FormNewRow key={i} {...row} control={control} errors={errors} />
          })}
        </IonGrid>*/}
        <IonGrid>
          {rows.map((field: any, i: number) => {                
              return <IonCol key={i+'-'+field.name}><FieldNew {...field}/></IonCol>
          })}          
        </IonGrid>
      </form>
    </CreateAnimation>
  </div>
  

}

export default connect<FormNewProps>({

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

  component: FormNew

})