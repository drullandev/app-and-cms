import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useIonToast } from '@ionic/react'
import * as icon from 'ionicons/icons';

import { HOME_PATH, apiUrl } from '../env';
import DebugUtil from '../classes/DebugUtil';
import RestAPI from '../classes/Rest';
import RestOutput from '../classes/RestOutput';

import { FormProps } from '../components/Form/types';

import { setData, setLoading, setisLogged } from '../reducer/data/user/user.actions';
import Logger from '../classes/Logger';

export const loginForm = ({
  setisLogged
}: {
  setLoading: (loading: boolean) => void;
  setData: (data: any) => void;
  setisLogged: (isLoggedIn: boolean) => void;
}): FormProps => {

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
        name: 'agreement',
        label: t('Accept the publicity agreement'),
        type: 'checkbox',
        defaultValue: false,
        className: 'col-span-12',
        validationSchema: yup.boolean()
        .required(t('Accept agreement is required'))
          .oneOf([true], t('You must accept the terms and conditions'))
      },
      {
        name: 'recaptcha',
        label: t('Please, can you complete the captcha?'),
        type: 'recaptcha',
        siteKey: 'pinga',
        validationSchema: yup.string(),
        onClick: ()=>{
          Logger.log(' • Done recaptcha!')
        }
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
        name: 'register',
        label: t('Register'),
        type: 'button',
        style: { display: 'inline-block', width: '46%', margin: '2%' },
        onClick: () => {
          history.push('/register');
        }
      }
    ],
    onSuccess: async (data: any) => {
      
      setLoading(true);
      await RestAPI.restCallAsync({
        req: {
          method: 'POST',
          url: `${apiUrl}/auth/local`,
          data: {
            identifier: data.email,
            password: data.password,
          },
        },
        onSuccess: {
          default: (res: any) => {

            if (res.status === 200) {
              setData(res.data.user);
              setisLogged(true);

              presentToast(RestOutput.catchSuccess(res))
                .then(() => {
                  history.push(HOME_PATH);
                });

            } else {
              presentToast(RestOutput.catchSuccess(res));
            }
            setLoading(false);
          }
        },
        onError: {
          default: (error: any) => {
            setisLogged(false);
            setLoading(false);

            RestOutput.catchDanger(error)

            presentToast(RestOutput.catchDanger(error));
          }
        },
        onFinally: () => {
          setLoading(false);
        }
      });
    },
    onError: (errors: any) => {
      // This is when the form have some error...
      setisLogged(false);
      setLoading(false);
      // Set Form errors output
      // TODO: Prepare the html errors junmp when form errors...
      const output = RestOutput.catchFormError(errors);
      output.header = 'Login error';
      presentToast(output);

    }
  };
};
