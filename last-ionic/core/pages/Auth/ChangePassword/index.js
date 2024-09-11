import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useIonToast, } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import useUserStore from '../../../classes/stores/user.store';
import DebugUtils from '../../../classes/utils/DebugUtils';
const ChangePassword = () => {
    const debug = DebugUtils.setDebug(false);
    const { t } = useTranslation();
    const [presentToast] = useIonToast();
    const { setUsername } = useUserStore();
    /*
      const pageSettings: PagePropsData = {
        settings: {
          id: 'reset-page',
          header: () => (
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonMenuButton />
                </IonButtons>
                <IonTitle>{t('Reset account')}</IonTitle>
              </IonToolbar>
            </IonHeader>
          ),
          content: () => <></>, // Aquí podrías renderizar el formulario si es necesario
          footer: () => <></>,
          methods: {
            resetForm: {
              id: 'reset-form',
              title: {
                label: t('Reset your account...')
              },
              rows: [
                {
                  cols: [
                    {
                      type: 'input',
                      name: 'email',
                      fieldType: 'email',
                      label: t('Email'),
                      required: true,
                    }
                  ]
                },
                {
                  cols: [
                    {
                      name: 'reset-submit',
                      type: 'button',
                      fieldType: 'submit',
                      label: t('Reset'),
                      icon: icon.person,
                    },
                    {
                      name: 'reset-cancel',
                      type: 'button',
                      fieldType: 'link',
                      label: t('Cancel'),
                      fill: 'outline',
                      icon: icon.close,
                      onClick: () => pageSettings.methods.resetForm.methods.onCancel()
                    }
                  ],
                },
                {
                  cols: [
                    {
                      name: 'wanna-reset',
                      type: 'button',
                      label: t("Do you remember your account?"),
                      color: 'clear',
                      icon: icon.logIn,
                      onClick: () => history.push('/login', { direction: 'none' })
                    },
                  ]
                },
              ],
              methods: {
                onSubmit: async (data: any) => {
                  const onResetSuccess = async (ret: any) => {
                    let user = ret.user;
                    user.jwt = ret.jwt; // Attaching the JWT to the user level and state...
                    await setIsLogged(true);
                    return user;
                  };
    
                  await RestCall.RestCallAsync({
                    req: {
                      url: 'api/auth/reset-password',
                      method: 'POST',
                      data: {
                        email: debug ? StringUtil.random(12) + '@gmail.com' : data.email
                      }
                    },
                    onSuccess: {
                      default: async (ret: any) => {
                        await onResetSuccess(ret.data)
                          .then((ret: any) => {
                            if (ret.status === 200) {
                              presentToast({
                                message: t('user-wellcome', { username: ret.data.user.username })
                              })
                                .then(() => history.push('/tabs/schedule', { direction: 'none' }));
                            }
                          });
                      }
                    },
                    onError: {
                      default: (err: any) => {
                        presentToast({ message: t(err.response.data.error.message ?? err.response.data.message[0].messages[0].message) });
                      }
                    }
                  });
                },
                onCancel: () => history.push('/home', { direction: 'none' })
              },
              validation: () => yup.object().shape({
                email: yup.string().required().email().min(8),
              }),
            }
          }
        }
      };
    
      return <Page {...pageSettings} />;
      */
    return _jsx(_Fragment, {});
};
export default ChangePassword;
