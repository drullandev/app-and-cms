// General dependencies
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react'

// Fully imported dependencies
import * as yup from 'yup';
import * as icon from 'ionicons/icons';

// Used classes
import DebugUtil from '../../classes/utils/DebugUtil';
import RestAPI from '../../classes/RestCall';

// Local dependencies
import { FormDataProps } from '../../components/Form/types';

// Reducer dependencies
import useUserStore from '../../stores/user.store';

/**
 * This is the information for the reset page main form
 * @returns {FormDataProps}
 */
export const resetFormData = (): FormDataProps => {

  const { t } = useTranslation();
  const history = useHistory();
  const [presentToast] = useIonToast();
  const { setIsLogged } = useUserStore()
  const debug = DebugUtil.setDebug(false);
  
  return {
    id: 'reset-page',
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
    captcha: true,
    fields: [
      {
        name: 'email',
        label: t('Email'),
        type: 'email',
        validationSchema: yup.string()
          .required(t('Email is required'))
          .email(t('This email is invalid...')),
        className: 'col-span-12'
      },
      { 
        name: 'password',
        label: t('Password'),
        type: 'password',
        defaultValue: '', 
        validationSchema: yup.string()
          .required(t('Password is required'))
          .min(8, t('Password must be at least 8 characters'))
          .max(16, t('Password must be at max 16 characters')),
        className: 'col-span-12',
        secret: true
      },
      { 
        name: 'repeat-password',
        label: t('Repeat the password'),
        type: 'password',
        defaultValue: '', 
        validationSchema: yup.string()
          .required(t('Password is required'))
          .oneOf([yup.ref('password'), ''], 'Passwords must match with previoous one')
          .min(8, t('Password must be at least 8 characters'))
          .max(16, t('Password must be at max 16 characters')),
        className: 'col-span-12',
        secret: true
      },
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

      await RestAPI.restCallAsync({
        req: {
          url: '/auth/reset-password',
          method: 'POST',
          data: {
            "code": data.code,
            "password": data.password,
            "passwordConfirmation": data.password
          }
        },
        onSuccess: {
          default: async (ret: any) => {

            const onSuccess = async (ret: any) => {
              let user = ret.user
              user.jwt = ret.jwt // Attaching the JWT to the user level and state...
              await setIsLogged(true)
              return user
            } 

            await onSuccess(ret.data)
              .then((ret: any) => {
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
        message: 'Reset error!',
        duration: 2000,
        color: 'warning',
      });
    }
  };
};

export default resetFormData;
