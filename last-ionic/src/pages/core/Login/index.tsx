// Global imports
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { IonContent } from '@ionic/react';
// Component imports
import './styles.scss';

// Used Components
import Page from '../../../components/core/Page';
import Header from '../../../components/core/main/Header';
import Form from '../../../components/core/Form';
// Used Source
import { loginForm } from './source';
// Used Reducers
import { connect } from '../../../reducer/src/connect';
import { setData, setLoading, setisLoggedIn } from '../../../reducer/data/user/user.actions';
import { PageProps } from '../../../components/core/Page/types';

interface OwnProps extends RouteComponentProps {}

interface StateProps {}

interface DispatchProps {
  setData: typeof setData;
  setLoading: typeof setLoading;
  setisLoggedIn: typeof setisLoggedIn;
}

interface LoginProps extends OwnProps, StateProps, DispatchProps {}

const Login: React.FC<LoginProps> = ({
  setData,
  setLoading,
  setisLoggedIn
}) => {

  const loginPageSettings : PageProps = {
    id: 'login-page',
    settings: {
      
    },
    content: () => {
      return (
        <>
          <Header label={'Login'} slot={'start'} />
          <Form {...loginForm({ setLoading, setData, setisLoggedIn })} />
        </>
      );
    },
    footer: () => null,
  };

  return (
    <Page {...loginPageSettings} />
  );
};

export default connect<StateProps, {}, DispatchProps>({
  mapStateToProps: (state) => ({}),
  mapDispatchToProps: {
    setData,
    setLoading,
    setisLoggedIn,
  },
  component: Login,
});
