import React from 'react'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonIcon, IonLabel, IonToggle, IonInput } from '@ionic/react'
import './Account.scss'
import { setDarkMode, setUsername } from '../data/user/user.actions'
import { connect } from '../data/connect'
import { RouteComponentProps } from 'react-router'
import { moonOutline, pencilOutline } from 'ionicons/icons'
//import Alert from '../components/Alert'

interface StateProps {
  username: string
  isAuthenticated: boolean
  darkMode: boolean
}

interface DispatchProps {
  setUsername: typeof setUsername
  setDarkMode: typeof setDarkMode
}

interface OwnProps extends RouteComponentProps {}

interface AccountProps extends OwnProps, StateProps, DispatchProps { }

const Account: React.FC<AccountProps> = ({
  username,
  darkMode,
  setDarkMode: setDarkModeData,
}) => {

  const clicked = (text: string) => {
    console.log(`Clicked ${text}`)
  }

  const allowed = username

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
        {allowed &&
        
          (<div className="ion-padding-top ion-text-center">

            <IonList>
              <img src="https://www.gravatar.com/avatar?d=mm&s=140" alt="avatar" />
              <IonIcon slot="end" icon={pencilOutline} onClick={() => console.log('pinga')}></IonIcon>
            </IonList>
            
            <IonList>
              <IonLabel slot="start">{ username }</IonLabel>
              <IonInput style={{display: 'none'}} value={ username }></IonInput>
              <IonIcon slot="end" icon={pencilOutline} onClick={() => console.log('pinga')}></IonIcon>
            </IonList>

            <IonList lines="none">
              <IonItem onClick={() => clicked('Change Password')}>
                <IonIcon slot="start" icon={moonOutline}></IonIcon>
                <IonLabel>Change Password</IonLabel>
              </IonItem>
            </IonList>

            <IonList lines="none">
              <IonItem routerLink="/support" routerDirection="none">
                <IonIcon slot="start" icon={moonOutline}></IonIcon>
                <IonLabel>Support</IonLabel>
              </IonItem>
            </IonList>
            
            <IonList lines="none">
              <IonItem routerLink="/logout" routerDirection="none">
                <IonIcon slot="start" icon={moonOutline}></IonIcon>
                <IonLabel>Logout</IonLabel>
              </IonItem>
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
      {/* Alert({
        isOpen: showAlert,
        header: "Change Username",
        buttons: [
          'Cancel',
          {
            text: 'Ok',
            handler: (data: any) => {
              setUsername(data.username)
            }
          }
        ],
        inputs: [
          {
            type: 'text',
            name: 'username',
            value: username,
            placeholder: 'username'
          }
        ],
        onDidDismiss: () => setShowAlert(false)
      })}*/}

    </IonPage>
  )
}

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    username: state.user.username,
    isAuthenticated: state.user.isLoggedIn,
    darkMode: state.user.darkMode
  }),
  mapDispatchToProps: {
    setUsername,
    setDarkMode
  },
  component: Account
})