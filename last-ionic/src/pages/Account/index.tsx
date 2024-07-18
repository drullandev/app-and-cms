
import React, { useEffect, useState } from 'react'
import { IonContent, IonImg, IonList, IonItem, IonLabel, IonAccordion, IonAccordionGroup, useIonToast, IonIcon, IonAlert, IonAvatar, IonCol, IonGrid, IonRow, IonToggle } from '@ionic/react'
import { ReactControllerProps } from '@ionic/react/dist/types/components/createControllerComponent'
import { RouteComponentProps } from 'react-router'

import { setLoading, setDarkMode } from '../../reducer/data/user/user.actions'
import { connect } from '../../reducer/src/connect'
import * as icon from 'ionicons/icons'

// Extra required
import { useTranslation } from 'react-i18next'

import Rest from '../../classes/Rest'
import { UserState } from '../../reducer/data/user/user.state'
import '../../styles/index.scss'
import Alert from '../../components/Alert'
import { OwnProps, ComponentProps, StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from './reducer'


// Are you testing this tools set && app?
let testingFeature = true
let testing = testingFeature && import.meta.env.REACT_APP_TESTING

const Account: React.FC<ComponentProps> = ({
  setLoading,
  darkMode,
  setDarkMode
}) => {

  const { t } = useTranslation()
  const [presentToast] = useIonToast()
  const [userData, setUserData] = useState<UserState>()
  const [showAlert, setShowAlert] = useState(false)
  const [alert, setAlert] = useState<ReactControllerProps>({isOpen: false})
/*
  const onLoad = () => {
    Rest.restCallAsync({
      req: {
        url: 'api/users/1',
        method: 'GET',
        //headers: {}
      },
      onSuccess: {
        default: async (ret:any)=> {
          console.log(ret.data)
          setUserData(ret.data)
          setLoading(false)
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
  */

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
          <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
          <IonLabel>{userData?.darkMode}</IonLabel>
        </IonItem>
      </>
    }
  ]

  return <IonContent className='ion-padding-top ion-text-center'>{userData &&
    <>
      <IonAvatar>
        <img src={import.meta.env.REACT_APP_HOST+userData?.caret?.formats?.medium?.url} alt={userData.username}/>
      </IonAvatar>

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

    </>
  }</IonContent>

}

export default connect<OwnProps, StateProps, DispatchProps>({ mapStateToProps, mapDispatchToProps, component: Account });