
import React, { useEffect, useState } from 'react'
import { IonContent, IonImg, IonList, IonItem, IonLabel, IonAccordion, IonAccordionGroup, useIonToast, IonIcon, IonAlert } from '@ionic/react'
import { ReactControllerProps } from '@ionic/react/dist/types/components/createControllerComponent'
import { RouteComponentProps } from 'react-router'
<<<<<<< HEAD
import { IonContent, IonList, IonItem, IonLabel, IonAccordion, IonAccordionGroup, useIonToast, IonIcon, IonAvatar, IonGrid, IonCol, IonRow } from '@ionic/react'
=======
>>>>>>> f8e60e9f112f2029aaec0ac63e1e1397462d8db0

import { setUsername, setLoading } from '../../data/user/user.actions'
import { connect } from '../../data/connect'
import * as icon from 'ionicons/icons'

// Extra required
import { useTranslation } from 'react-i18next'

import { restCallAsync } from '../../classes/core/axios'
import { UserState } from '../../data/user/user.state'
import Alert from '../../components/core/Alert'
import '../../pages/Styles.scss'
import { messages } from '../../../../ionic-for-strapi/src/static/constants';

// Are you testing this tools set && app?
let testingFeature = true
let testing = testingFeature && process.env.REACT_APP_TESTING

interface OwnProps extends RouteComponentProps { }


interface StateProps {
  nickname?: string
  userEmail?: string
  caret?: any
}
interface DispatchProps {
  setLoading: typeof setLoading
}

interface AccountProps extends OwnProps, StateProps, DispatchProps {}

const Account: React.FC<AccountProps> = ({
  setLoading,
}) => {

  const { t } = useTranslation()
  const [presentToast] = useIonToast()
  const [userData, setUserData] = useState<UserState>()
<<<<<<< HEAD

=======
  const [avatar, setAvatar] = useState('https://www.gravatar.com/avatar?d=mm&s=140') 
>>>>>>> f8e60e9f112f2029aaec0ac63e1e1397462d8db0
  const [showAlert, setShowAlert] = useState(false)
  const [alert, setAlert] = useState<ReactControllerProps>({isOpen: false})

  const onLoad = () => {
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
  }

  useEffect(onLoad,[])


  const openAlert=()=>{
    setShowAlert(true)
  }

  let editOptions = [
    {
      name: 'personal-data',
      label: 'Personal data',
      icon: icon.accessibility,
      content: <IonGrid>
        <IonRow>
          <IonCol>
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

        <IonItem onClick={()=> openAlert()}>
          <IonIcon icon={icon.arrowUndo}/>
          <IonLabel color='primary'>{t("TestClick")}</IonLabel>
        </IonItem>
          </IonCol>
        </IonRow>

      </IonGrid>      
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

  return <IonContent className='ion-padding-top ion-text-center'>{userData &&
<<<<<<< HEAD
    <>    
      <IonAvatar>
        <img src={process.env.REACT_APP_HOST+userData?.caret?.formats?.medium?.url} alt={userData.username}/>
      </IonAvatar>
=======
    <>
      <h2>{userData.username}</h2>
>>>>>>> f8e60e9f112f2029aaec0ac63e1e1397462d8db0

      <IonList inset>

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

<<<<<<< HEAD
      <Alert show={showAlert} style={''} header={''} message={''} buttons={[]} timestamp={''} />    
=======
      <Alert {...alert}/>
      <IonAlert {...alert}></IonAlert>
>>>>>>> f8e60e9f112f2029aaec0ac63e1e1397462d8db0
    </>
  }</IonContent>

}

<<<<<<< HEAD
export default connect<OwnProps, {}, DispatchProps>({
=======
export default connect<OwnProps, StateProps, DispatchProps>({
>>>>>>> f8e60e9f112f2029aaec0ac63e1e1397462d8db0
  mapStateToProps: (state) => ({
    nickname: state.user.nickname,
    caret: state.user.caret
  }),
<<<<<<< HEAD
  //mapDispatchToProps: {
  //  setNickname,
  //}, 
=======
  mapDispatchToProps: {
    setLoading
  },
>>>>>>> f8e60e9f112f2029aaec0ac63e1e1397462d8db0
  component: Account
})