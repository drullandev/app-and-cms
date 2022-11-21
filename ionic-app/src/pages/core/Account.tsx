
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
//import { restGet, setImage } from '../../data/utils/rest/rest.utils'
//import { editUserValue } from '../../data/user/user.calls'
import { IonContent, IonImg, IonList, IonItem, IonAlert, IonLabel, IonAccordion, IonAccordionGroup } from '@ionic/react'

import { setUsername, setEmail, } from '../../data/user/user.actions'
import { connect } from '../../data/connect'
import * as icon from 'ionicons/icons'

import '../../pages/Styles.scss'

interface OwnProps extends RouteComponentProps { }

interface StateProps {
  nickname?: string
  userEmail?: string
}

interface DispatchProps {
  setNickname: typeof setUsername
  setUserEmail: typeof setEmail
}

interface AccountProps extends OwnProps, StateProps, DispatchProps { }

const Account: React.FC<AccountProps> = ({ setNickname, nickname, setUserEmail, userEmail }) => {

  const user_id = 1

  const [showAlert, setShowAlert] = useState(false)
  const [userData, setUserData] = useState()

  const [avatar, setAvatar] = useState('https://www.gravatar.com/avatar?d=mm&s=140')

  const [alertButtons, setAlertButtons] = useState([])
  const [alertInputs, setAlertInputs] = useState([])
  const [alertHeader, setAlertHeader] = useState('Edition form')

  useEffect(() => {
    /*
    restGet('users', { id: user_id }) //TODO: Change with user/me when I i'm secure Bearer token is sending on each call ^_^
      .then(res => {
        console.log(res.data[0])
        setUserData(res.data[0])
        setAvatar(setImage(res.data[0].avatar.url))
      })
    */
  }, [])

  const [file, setFile] = useState([])

  /*
  useEffect(() => {
    if (!file[0]) return
    console.log('setting avatar!!', file[0].name)
    setAvatar(file[0].name)
  }, [file])

  const launchAlert = (title: string, slug: string, value: string = '') => {
    setAlertHeader(title)
    switch (slug) {

      case 'change-nickname':
        setAlertInputs([{
          type: 'text',
          name: 'nickname',
          value: value,
          placeholder: 'nickname'
        }])
        break;

      case 'change-email':
        setAlertInputs([{
          type: 'email',
          name: 'email',
          value: value,
          placeholder: 'email'
        }])
        break;

      case 'change-password':
        setAlertInputs([{
          type: 'password',
          name: 'password',
          value: value,
          placeholder: 'Please, put your password...'
        }, {
          type: 'password',
          name: 'password',
          value: value,
          placeholder: 'Set new password...'
        },
        {
          type: 'password2',
          name: 'password2',
          value: value,
          placeholder: 'Repeat new password...'
        }])
        break;

    }
    setAlertButtons([
      'Cancel',
      {
        text: 'Ok',
        handler: (data: any) => {
          setAction(slug, data)
        }
      }
    ])
    setShowAlert(true)

  }

  */

  const setAction = (slug: string, param: any) => {
    switch (slug) {
      case 'change-nickname':
        //editUserValue(user_id, 'username', param)
        break;
      case 'change-email':
        //editUserValue(user_id, 'email', param)
        break;
      case 'change-password':
        //editUserValue(user_id, 'passsword', param)
        break;
    }
  }

  let editOptions =[
    {
      name: 'personal-data',
      label: 'Personal data',
      icon: icon.accessibility,
      content: <>
        <IonItem>
          <IonLabel color='primary'>Change Nickname</IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel color='primary'>Change Email</IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel color='primary'>Change Password</IonLabel>
        </IonItem>

        <IonItem routerLink='/logout' routerDirection='none'>
          <IonLabel color='primary'>Logout</IonLabel>
        </IonItem>
      </>
    },
    {
      name: 'app-settings',
      label: 'App Settings',
      icon: icon.accessibility,
      content: <>
        <IonItem routerLink='/support' routerDirection='none'>
          <IonLabel color='primary'>Support</IonLabel>
        </IonItem>
      </>
    }
  ]


  return (
    <IonContent className='ion-padding-top ion-text-center'>

      <h2>{nickname}</h2>

      <IonList inset>

        <IonItem>
          <IonImg src={avatar} alt='avatar' />
        </IonItem>

        {/*<IonItem>
          <input type="file" onChange={(e) => setFile(e.target.files)} />
        </IonItem>

        <IonItem onClick={() => launchAlert('Change nickname', 'change-nickname', userData.username)}>
          <IonLabel color='primary'>Change Nickname</IonLabel>
        </IonItem>

        <IonItem onClick={() => launchAlert('Change email', 'change-email', userData.email)}>
          <IonLabel color='primary'>Change Email</IonLabel>
        </IonItem>

        <IonItem onClick={() => launchAlert('Change password', 'change-password')}>
          <IonLabel color='primary'>Change Password</IonLabel>
        </IonItem>

        <IonItem routerLink='/support' routerDirection='none'>
          <IonLabel color='primary'>Support</IonLabel>
        </IonItem>

        <IonItem routerLink='/logout' routerDirection='none'>
          <IonLabel color='primary'>Logout</IonLabel>
        </IonItem>
        */}

        <IonAccordionGroup>
          {Object.keys(editOptions).map((row: any, key: number)=>{
            let a = editOptions[key]
            return <IonAccordion  key={key} value={a.name}>
              <IonItem slot="header" color="light">
                <IonLabel>{a.label}</IonLabel>
              </IonItem>
              <div className="ion-padding" slot="content">
                {a.content}
              </div>
            </IonAccordion>
          })}
        </IonAccordionGroup>

      </IonList>

      <IonAlert
        isOpen={showAlert}
        header={alertHeader}
        buttons={alertButtons}
        inputs={alertInputs}
        onDidDismiss={() => setShowAlert(false)}
      />

    </IonContent>

  )

}

export default connect<OwnProps, {}, DispatchProps>({

  mapStateToProps: (state) => ({
    nickname: state.user.nickname
  }),

  //mapDispatchToProps: {
  //  setNickname,
  //},
  

  component: Account

})