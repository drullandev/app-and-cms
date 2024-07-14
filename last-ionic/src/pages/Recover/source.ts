import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react'
import * as icon from 'ionicons/icons';

import { HOME_PATH, apiUrl } from '../../env';
import DebugUtil from '../../classes/DebugUtil';
import RestAPI from '../../classes/Rest';
import RestOutput from '../../classes/RestOutput';

import { FormProps } from '../../components/Form/types';

import { setData, setLoading, setisLogged } from '../../reducer/data/user/user.actions';

export const recover = (): FormProps => {

  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
  
  const debug = DebugUtil.setDebug(false);
  
  return {
    id: 'login-page',
    settings: {
      autoSendIfValid: false,
      animations: {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      },
      afterLoad: () => {},
      style: {
        borderRadius: '0%'
      }
    },
    fields: [
      {
        name: 'email',
        label: t('Email'),
        type: 'email',
        defaultValue: '',
        validationSchema: yup.string()
          .required(t('Email is required'))
          .email(t('This email is invalid...')),
        className: 'col-span-12'
      }
    ],
    buttons:[      
      { 
        name: 'submit',
        label: t('Submit'),
        type: 'submit',
        style: { borderRadius: '20px', float: 'left', width: '46%', margin: '2%' },
        icon: icon.starOutline
      },
      {
        name: 'goToLogin',
        label: t('Login'),
        type: 'button',
        style: { display: 'inline-block', width: '46%', margin: '2%' },
        onClick: () => {
          history.push('/login');
        }
      }
    ],
    onSuccess: async (data: any) => {

      const onRecoverSuccess = async (ret: any) => {
        let user = ret.user
        user.jwt = ret.jwt // Attaching the JWT to the user level and state...
        await setisLogged(true)
        return user
      }  

      await RestAPI.restCallAsync({
        req: {
          url: '/auth/forgot-password',
          method: 'POST',
          data: { email: data.email }
        },
        onSuccess: {
          default: async (ret: any)=>{
            await onRecoverSuccess(ret.data)
              .then((ret: any)=>{
                switch (ret.status) {
                  case 200:
                    presentToast({ 
                      message: t('user-wellcome', { username: ret.data.user.username }) 
                    }).then(()=> history.push('/tabs/schedule', { direction: 'none' }))
                }            
              })
          }
        },
        onError:{
          default: (err: any)=> {
            presentToast({ 
              message: t(err.response.data.error.message) ?? t(err.response.data.message[0].messages[0].message)
            })
          }
        }
      })
      
    },

    onError: (errors:any) =>{
      presentToast({
        message: 'Login error!',
        duration: 2000,
        color: 'warning',
      });
    }
  };
};
