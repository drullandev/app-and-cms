import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, useIonToast } from '@ionic/react';
import './Login.scss';
import { setData, setisLoggedIn, setUsername, setDarkMode } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import { restCallAsync } from '../classes/core/axios';
import { globe } from 'ionicons/icons';
import { UserState } from '../data/user/user.state';
import { StrapiAuthProps } from '../classes/strapi/sendLoginForm';
import { useTranslation } from 'react-i18next';

let testing = true

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setisLoggedIn: typeof setisLoggedIn;
  setUsername: typeof setUsername;
  setData: typeof setData;
  setDarkMode: typeof setDarkMode
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({
  setisLoggedIn,
  history,
  setUsername: setUsernameAction,
  setData
}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const { t, i18n } = useTranslation();

  const [setToast, dismissToast] = useIonToast()

  const launchToast = async (data: any, setToast: Function) => {
    await setToast({
      message: data.message,
      duration: data.duration ?? 1000,
      position: data.position ?? 'bottom',
      icon: data.icon ?? globe
    })
    /*setTimeout(()=>{
      dismissToast()
    },data.duration ?? 1500)*/
    return true
  }

 const onLoginSuccess = async (ret: any) => {
    let user = ret.user
    user.jwt = ret.jwt // Attaching the JWT to the user level and state...
    await setData(user)
    await setDarkMode(true)
    await setisLoggedIn(true)
    return user
  }    

  const submitLogin = async (e: React.FormEvent) => {

    e.preventDefault()
    setFormSubmitted(true)

    if(!username) setUsernameError(true)    
    if(!password) setPasswordError(true)
    if(username && password) {

      await restCallAsync({
        req: {
          url: 'api/auth/local',
          data: { 
            identifier: testing ? 'bunny@gmail.com' : username,
            password: testing ? 'Qwer1234' : password 
          },
          method: 'POST'
        },
        onSuccess: async (ret: StrapiAuthProps)=>{
          await onLoginSuccess(ret)
            .then((user: UserState)=>{
              setisLoggedIn(true)
              launchToast({ 
                message: t("user-wellcome",{ username: user.username }) 
              }, setToast)
                .then(()=> history.push('/tabs/schedule', {direction: 'none'}))            
            })
        },
        onError: (err: Error)=> {
          launchToast({ message: t('No tienes permisos de acceso') }, setToast)
        }
      })
    
    }

  }

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }

    if(username && password) {
      await setisLoggedIn(true);
      await setUsernameAction(username);
      history.push('/tabs/schedule', {direction: 'none'});
    }
  };

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={submitLogin}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Username</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password is required
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Login</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setisLoggedIn,
    setUsername,
    setDarkMode,
    setData
  },
  component: Login
})