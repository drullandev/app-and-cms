// Global imports
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { IonContent } from '@ionic/react';
// Component imports
import './styles.scss';

// Used Components
import Page from '../../components/Page';
import Header from '../../components/main/Header';
import Form from '../../components/Form';
// Used Source
import { loginForm } from './source';
// Used Reducers
import { connect } from '../../reducer/src/connect';
// This component
import { PageProps } from '../../components/Page/types';

// Component Reducer
import { OwnProps, ComponentProps, StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from './reducer'

const Login: React.FC<ComponentProps> = (props) => {

  const { setData, setLoading, setisLogged, loading } = props;

  const pageSettings : PageProps = {
    settings: {
      id: 'login-page',
    },
    header: ()=> <Header label={'Login'} slot={'start'} loading={loading || false} />,
    content: () => {
      return (
        <>
          <Form {...loginForm({ setLoading, setData, setisLogged })} />
        </>
      );
    },
    footer: ()=>{ return <></>}
  };

  return (
    <Page {...pageSettings} />
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({ mapStateToProps, mapDispatchToProps, component: Login });