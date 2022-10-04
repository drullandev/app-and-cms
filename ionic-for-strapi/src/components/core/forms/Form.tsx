import * as AppConst from '../../../static/constants'

import { CreateAnimation, IonText, IonGrid, useIonLoading, useIonToast, getConfig } from '@ionic/react'
import React, { FC, useState, useEffect, useRef } from 'react'

import { setIsLoggedIn, setNickname, setUserEmail, setUserId, setDarkMode, setLoading, setUserJwt } from '../../../data/user/user.actions'
import { connect } from '../../../data/connect'

import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

// ABOUT FORMS VALIDATION 
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import axios from 'axios'

// Components
import FormRow from './FormRow'

// FORM INTERFACES
import { FormProps } from './interfaces/FormProps'

import { restGet } from '../../../data/utils/rest/rest.utils'

// FORM STYLES
import '../main/styles/Form.scss'
import { ObjectShape } from 'yup/lib/object'

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
  setIsLoggedIn: typeof setIsLoggedIn
  setUserJwt: typeof setUserJwt
  setUserEmail: typeof setUserEmail
  setDarkMode: typeof setDarkMode
  setNickname: typeof setNickname
  setUserId: typeof setUserId
  setLoading: typeof setLoading
  //setUserData: typeof setUserData
  //loadConfData: typeof loadConfData
  //loadUserData: typeof loadUserData
}

interface MyFormProps extends FormProps, StateProps, DispatchProps { }

const Form: FC<MyFormProps> = ({
  slug,
  setUserJwt,
  userDarkMode, setDarkMode,
  setIsLoggedIn}) => {

  const history = useHistory()
  const { t } = useTranslation()

  // Form Component settings...
  const [formTitle, setFormTitle] = useState([])
  const [formRows, setFormRows] = useState([])
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
    restGet('forms', { slug: slug })
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
    // eslint-disable-next-line
  }, [slug])

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
            if (row.field.num_sign === 'positive') rule = rule.positive()
            if (row.field.num_type === 'integer') rule = rule.integer()
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

  const onSubmit: SubmitHandler<any> = async (form: any) => {

    launchLoading('Sending form...', AppConst.timeout)

    switch (slug) {

      case 'login':

        axios
          .post(AppConst.RestAPI + '/auth/local', {
            identifier: form.identifier,
            password: form.password
          }).then((res: any) => {
            switch (res.status) {
              case 200:
                setIsLoggedIn(true)
                setTheUserData(res.data)
                axios
                  .put(AppConst.RestAPI+'/users/'+res.data.user.id, {
                    acceptedTerms: form.terms,
                    acceptedPrivacyPolicy: form.privacy,
                    userDarkMode: userDarkMode
                  }).then(()=>{
            
                  })
                launchToast('Welcome '+res.data.user.username+', you was logged!!!', 'success')
                launchLoading('Redirecting to Home page')
                launchHistory(AppConst.HOME)
              break
              default:
                setIsLoggedIn(false)
                launchToast('Status:' + res.status + ',' + res.data.message[0].messages[0].message, 'warning')
              break
            }
          }).catch((err:any) => {
            console.log(err)
            setIsLoggedIn(false)
            //launchToast(err.response.data.message[0].messages[0].message, 'danger')
          })

      break

      case 'signup':

        axios
          .post(AppConst.RestAPI + '/auth/local/register', {
            username: form.identifier,
            password: form.password,
            email: form.useremail
          }).then((res: any) => {
            switch (res.status) {
              case 200:
                setIsLoggedIn(true)
                setTheUserData(res.data)
                axios
                  .put(AppConst.RestAPI+'/users/'+res.data.user.id, {
                    acceptedTerms: form.terms,
                    acceptedPrivacyPolicy: form.privacy,
                    userDarkMode: userDarkMode,
                    hasSeenTutorial: false,
                  }).then(()=>{
            
                  })
                launchToast('Welcome ${form.identifier}, you was registered!!!', 'success')
                launchLoading('Great! Redirection to next step ;)')
                launchHistory(AppConst.ADD_DATA, 2000, { direction: 'none' })
              break
              default:
                setIsLoggedIn(false)
                launchToast('Status:' + res.status + ',' + res.response.data.message[0].messages[0].message, 'warning')
              break
            }
          }).catch(err => {
            setIsLoggedIn(false)
            launchToast(err.response.data.message[0].messages[0].message, 'danger')
          })

      break

      case 'recover':

        axios
          .post(AppConst.RestAPI + '/auth/forgot-password', {
            email: form.email
          }).then((res: any) => {
            dismissLoadingAlert()
            switch (res.status) {
              case 200:
                setTheUserData(res.data)
                launchToast('Welcome ${form.identifier}, you was registered!!!', 'success')
                launchHistory(AppConst.HOME, 2000, { direction: 'none' })
              break
              default:
                console.log('case', res.status)
                setIsLoggedIn(false)
                launchToast('Status:' + res.status + ',' + res.response.data.message[0].messages[0].message, 'warning')
              break
            }
          }).catch((res: any) => {
            setIsLoggedIn(false)
            launchToast(res.response.data.message[0].messages[0].message, 'danger')
          })

      break

      case 'reset-password':

        axios
          .post(AppConst.RestAPI + '/auth/reset-password', {
            email: form.email
          }).then((res: any) => {
            dismissLoadingAlert()
            switch (res.status) {
              case 200:
                setTheUserData(res.data)
                launchToast('Welcome ${form.identifier}, you was registered!!!', 'success')
                launchHistory(AppConst.HOME, 2000, { direction: 'none' })
              break
              default:
                console.log('case', res.status)
                setIsLoggedIn(false)
                launchToast('Status:' + res.status + ',' + res.response.data.message[0].messages[0].message, 'warning')
              break
            }
          }).catch((res: any) => {
            setIsLoggedIn(false)
            launchToast(res.response.data.message[0].messages[0].message, 'danger')
          })

      break

      case 'email-confirmation':

        axios
          .get(AppConst.RestAPI + '/auth/email-confirmation')
          .then((res: any) => {
            dismissLoadingAlert()
            switch (res.status) {
              case 200:
                setTheUserData(res.data)
                launchToast('Welcome ${form.identifier}, you was registered!!!', 'success')
                launchHistory(AppConst.HOME, 2000, { direction: 'none' })
              break
              default:
                console.log('case', res.status)
                setIsLoggedIn(false)
                launchToast('Status:' + res.status + ',' + res.response.data.message[0].messages[0].message, 'warning')
              break
            }
          }).catch((res: any) => {
            setIsLoggedIn(false)
            launchToast(res.response.data.message[0].messages[0].message, 'danger')
          })

      break

      case 'send-email-confirmation':

        axios
          .post(AppConst.RestAPI + '/auth/send-email-confirmation')
          .then((res: any) => {
            dismissLoadingAlert()
            switch (res.status) {
              case 200:
                setTheUserData(res.data)
                launchToast('Welcome ${form.identifier}, you was registered!!!', 'success')
                launchHistory(AppConst.HOME, 2000, { direction: 'none' })
              break
              default:
                console.log('case', res.status)
                setIsLoggedIn(false)
                launchToast('Status:' + res.status + ',' + res.response.data.message[0].messages[0].message, 'warning')
              break
            }
          }).catch((res: any) => {
            setIsLoggedIn(false)
            launchToast(res.response.data.message[0].messages[0].message, 'danger')
          })

      break

      default:
        launchToast('This action not exist...', 'danger')
      break

    }

    const setTheUserData = (data: any) => {

      setIsLoggedIn(true)
      setUserJwt(data.jwt)
      setNickname(data.user.username)
      setDarkMode(data.user.userDarkMode)
      //setUserEmail(data.user.email)
      //setUserId(data.user.id)   
      //setUserData(data.user)

      /*
      {
        "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTYzNTExMTM0MCwiZXhwIjoxNjM3NzAzMzQwfQ.Z9hoSs-EgQV4IXDn_KhppRaDIeKD4PFtAlX6TaUzP-M",
        "user": {
            "id": 21,
            "username": "qy4tw098er",
            "email": "87079yui.0v@gmail.com",
            "provider": "local",
            "confirmed": true,
            "blocked": null,
            "role": {
                "id": 1,
                "name": "Subscribed",
                "description": "Default role given to authenticated user.",
                "type": "authenticated",
                "path": 16
            },
            "created_at": "2021-10-24T21:35:41.000Z",
            "updated_at": "2021-10-24T21:35:41.000Z",
            "hasSeenTutorial": null,
            "userDarkMode": null,
            "acceptedTerms": null,
            "acceptedPrivacyPolicy": null,
            "avatar": null
        }
      }
      */

    }

  }

  return <div className='ion-padding'>
    <CreateAnimation
      delay={ 1000 }
      duration={1000}
      iterations={1}
      fromTo={[{ property: 'opacity', fromValue: 0, toValue: 1 }]}
    >
      <form noValidate key={slug} name={slug} onSubmit={handleSubmit(onSubmit)}>
        <IonText color='primary' style={{ textAlign: 'center' }}>
          <h2>{formTitle}</h2>
        </IonText>
        <IonGrid>
          {formRows.map((row: any, i: number) => (
            <FormRow key={i} columns={row.columns} control={control} errors={errors} />
          ))}
        </IonGrid>
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
    setUserJwt,
    setDarkMode,
    setIsLoggedIn,
  },

  component: Form

})