import React from 'react'
import { RouteComponentProps } from 'react-router'

import { IonContent, useIonToast } from '@ionic/react'
import { useTranslation } from 'react-i18next'

import { DeepMap, FieldError } from 'react-hook-form'
import * as yup from 'yup'

import * as icon from 'ionicons/icons'

import { setisLoggedIn, setUsername } from '../../../reducer/data/user/user.actions'
import { connect } from '../../../reducer/src/connect'

import '../../../styles/index.scss'
import RestAPI from '../../../classes/Rest'

import { PageProps } from '../../../components/core/Page/types'
import Form from '../../../components/core/Form'
import Page from '../../../components/core/Page'
import Header from '../../../components/core/main/Header'
import { FormProps } from '../../../components/core/Form/types'
import { recover } from './source';

let testingRecover = true
let testing = testingRecover && import.meta.env.REACT_APP_TESTING

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setisLoggedIn: typeof setisLoggedIn
  setUsername: typeof setUsername
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Recover: React.FC<LoginProps> = ({
  setisLoggedIn,
  history,
}) => {

  const { t } = useTranslation()
  const [presentToast] = useIonToast()
 
  const pageSettings: PageProps = {

    id: 'recover-page',
    header: ()=> <Header label={"Recover"} slot="start"/>,
    content: ()=>{


      return <IonContent>
          <Form {...recover()} />
      </IonContent>

    },
    footer: ()=>{
      return <></>
    }

  }

  return <Page {...pageSettings}/>

}

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setisLoggedIn,
    setUsername
  },
  component: Recover
})