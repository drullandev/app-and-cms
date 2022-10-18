import React, { useState } from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonAlert, IonListHeader, IonIcon, IonLabel, IonToggle } from '@ionic/react'
import './Account.scss'
import { setDarkMode, setUsername } from '../data/user/user.actions'
import { connect } from '../data/connect'
import { RouteComponentProps } from 'react-router'
import { moonOutline } from 'ionicons/icons'
import { setDarkModeData } from '../data/dataApi'

interface OwnProps extends RouteComponentProps { }

interface StateProps {
  username?: string
  isAuthenticated?: boolean
  darkMode?: boolean
}

interface DispatchProps {
  setUsername: typeof setUsername
  setDarkMode: typeof setDarkMode
}

interface AccountProps extends OwnProps, StateProps, DispatchProps { }

const Account: React.FC<AccountProps> = ({
  username,
  isAuthenticated,
  darkMode,
  setUsername,
  setDarkMode,
}) => {

  const [showAlert, setShowAlert] = useState(false)

  const clicked = (text: string) => {
    console.log(`Clicked ${text}`)
  }

  return (
    <IonPage id="account-page" className={`${darkMode ? 'dark-theme' : ''}`}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {username &&
          (<div className="ion-padding-top ion-text-center">
            <img src="https://www.gravatar.com/avatar?d=mm&s=140" alt="avatar" />
            <h2>{ username }</h2>
            <IonList inset>
              <IonItem onClick={() => clicked('Update Picture')}>Update Picture</IonItem>
              <IonItem onClick={() => setShowAlert(true)}>Change Username</IonItem>
              <IonItem onClick={() => clicked('Change Password')}>Change Password</IonItem>
              <IonItem routerLink="/support" routerDirection="none">Support</IonItem>
              <IonItem routerLink="/logout" routerDirection="none">Logout</IonItem>
            </IonList>
            <IonList lines="none">
              <IonItem>
                <IonIcon slot="start" icon={moonOutline}></IonIcon>
                <IonLabel>Dark Mode</IonLabel>
                <IonToggle checked={darkMode} onClick={() => setDarkModeData(!darkMode)} />
              </IonItem>
            </IonList>
          </div>)
        }
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        header="Change Username"
        buttons={[
          'Cancel',
          {
            text: 'Ok',
            handler: (data) => {
              setUsername(data.username)
            }
          }
        ]}
        inputs={[
          {
            type: 'text',
            name: 'username',
            value: username,
            placeholder: 'username'
          }
        ]}
        onDidDismiss={() => setShowAlert(false)}
      />
    </IonPage>
  )
}

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    username: state.user.username,
    isAuthenticated: state.user.isLoggedIn,
    darkModel: state.user.darkmode
  }),
  mapDispatchToProps: {
    setUsername,
    setDarkMode
  },
  component: Account
})