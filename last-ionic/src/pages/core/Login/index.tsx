import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useIonToast, IonContent } from '@ionic/react';
import { connect } from '../../../redux/connect';
import Page from '../../../components/core/Page';
import Header from '../../../components/core/main/Header';
import Form from '../../../components/core/Form';
import { login } from '../../../forms/login';
import { setData, setLoading } from '../../../redux/data/user/user.actions';
import './styles.scss';

interface OwnProps extends RouteComponentProps {}

interface StateProps {}

interface DispatchProps {
  setData: typeof setData;
  setLoading: typeof setLoading;
}

interface LoginProps extends OwnProps, StateProps, DispatchProps {}

const Login: React.FC<LoginProps> = ({
  history,
  setData,
  setLoading,
}) => {

  const pageSettings = {
    id: 'login-page',
    header: () => <Header label={'Login'} slot={'start'} />,
    content: () => {
      const formData = login(setLoading, setData);
      return (
        <IonContent id={pageSettings.id}>
          <Form {...formData} />
        </IonContent>
      );
    },
    footer: () => null,
  }

  return <Page {...{
        id: 'login-page',
        header: () => { 
          return <Header label={'Login'} slot={'start'} />
        },
        content: () => {
          const formData = login(setLoading, setData);
          return (
            <IonContent id={pageSettings.id}>
              <Form {...formData} />
            </IonContent>
          );
        },
        footer: () => {
          return <></>
        },
      }}
    />

};

export default connect<StateProps, {}, DispatchProps>({
  mapStateToProps: (state) => ({}),
  mapDispatchToProps: {
    setData,
    setLoading,
  },
  component: Login,
});
