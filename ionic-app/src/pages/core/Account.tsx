
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { IonContent, IonImg, IonList, IonItem, IonLabel, IonAccordion, IonAccordionGroup, useIonToast } from '@ionic/react'

import { setUsername, setEmail, } from '../../data/user/user.actions'
import { connect } from '../../data/connect'
import * as icon from 'ionicons/icons'

// Extra required
import { useTranslation } from 'react-i18next'

import '../../pages/Styles.scss'
import { restCall } from '../../classes/core/axios'

// Are you testing this tools set && app?
let testingFeature = true
let testing = testingFeature && process.env.REACT_APP_TESTING

interface OwnProps extends RouteComponentProps { }

interface StateProps {
  nickname?: string
  userEmail?: string
}

interface DispatchProps {
  setNickname: typeof setUsername
  setUserEmail: typeof setEmail
}

interface AccountProps extends OwnProps, StateProps, DispatchProps {}

const Account: React.FC<AccountProps> = ({
  setNickname,
  nickname,
  setUserEmail,
  userEmail
}) => {

  const { t } = useTranslation()
  const [presentToast] = useIonToast()
  const [userData, setUserData] = useState()

  useEffect(()=>{
    if(testing){
      restCall({
        req: {
          url: 'api/users/'+process.env.REACT_APP_DEFAULT_ID+'?populate=*',
          method: 'GET',
        },
        onSuccess: {

          default: async (ret:any)=> {
            console.log('I did!', ret)    
            setUserData(ret)
          }

        },
        onError: {
          default: presentToast
        }

      })
    }
  },[])

  const [avatar, setAvatar] = useState('https://www.gravatar.com/avatar?d=mm&s=140') 

  let editOptions =[
    {
      name: 'personal-data',
      label: 'Personal data',
      icon: icon.accessibility,
      content: <>
        <IonItem>
          <IonLabel color='primary'>{t("Change Nickname")}</IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel color='primary'>{t("Change Email")}</IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel color='primary'>{t("Change Password")}</IonLabel>
        </IonItem>

        <IonItem routerLink='/logout' routerDirection='none'>
          <IonLabel color='primary'>{t("Logout")}</IonLabel>
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
    <>{userData &&

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

    </IonContent>

    }</>


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