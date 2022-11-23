
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { IonContent, IonImg, IonList, IonItem, IonLabel, IonAccordion, IonAccordionGroup, useIonToast, IonIcon } from '@ionic/react'

import { setUsername, setEmail, } from '../../data/user/user.actions'
import { connect } from '../../data/connect'
import * as icon from 'ionicons/icons'

// Extra required
import { useTranslation } from 'react-i18next'

import '../../pages/Styles.scss'
import { restCallAsync } from '../../classes/core/axios'
import { UserState } from '../../data/user/user.state'
import Alert from '../../components/core/Alert'


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
  const [userData, setUserData] = useState<UserState>()
  const [avatar, setAvatar] = useState('https://www.gravatar.com/avatar?d=mm&s=140') 

  useEffect(()=>{
    restCallAsync({
      req: {
        url: 'api/users/1',
        method: 'GET',
        //headers: {}
      },
      onSuccess: {
        default: async (ret:any)=> {
          console.log(ret.data)
          setUserData(ret.data)
        }
      },
      onError: {
        default: presentToast
      }

    })
  },[])


  let editOptions = [
    {
      name: 'personal-data',
      label: 'Personal data',
      icon: icon.accessibility,
      content: <>
        <IonItem>
          <IonIcon icon={icon.happy}/>
          <IonLabel color='primary'>{t("Change Nickname")}</IonLabel>
        </IonItem>

        <IonItem>
          <IonIcon icon={icon.at}/>
          <IonLabel color='primary'>{t("Change Email")}</IonLabel>
          <IonLabel>{userData?.email}</IonLabel>
        </IonItem>

        <IonItem>
          <IonIcon icon={icon.lockClosed}/>
          <IonLabel color='primary'>{t("Change Password")}</IonLabel>
          <IonLabel>*******</IonLabel>
        </IonItem>

        <IonItem routerLink='/logout' routerDirection='none'>
          <IonIcon icon={icon.arrowUndo}/>
          <IonLabel color='primary'>{t("Logout")}</IonLabel>
        </IonItem>

        <IonItem onClick={()=> console.log('on click')}>
          <IonIcon icon={icon.arrowUndo}/>
          <IonLabel color='primary'>{t("TestClick")}</IonLabel>
        </IonItem>

      </>      
    },
    {
      name: 'app-settings',
      label: 'App Settings',
      icon: icon.accessibility,
      content: <>
        <IonItem routerLink='/support' routerDirection='none'>
          <IonIcon icon={icon.helpBuoy}/>
          <IonLabel color='primary'>Support</IonLabel>
        </IonItem>
        <IonItem>
          <IonIcon icon={icon.contrast}/>
          <IonLabel color='primary'>DarkMode</IonLabel>
          <IonLabel>{userData?.darkMode}</IonLabel>
        </IonItem>
      </>
    }
  ]

  return (
    <>{userData &&

      <IonContent className='ion-padding-top ion-text-center'>

      <h2>{userData.username}</h2>

      <IonList inset>

        <IonItem><IonImg src={process.env.REACT_APP_HOST+userData?.caret?.formats?.medium?.url} alt='avatar' /></IonItem>

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