// Global imports
import React from 'react';
import ReactGA from'react-ga';

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
import i18n from '../../components/extra/i18n';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add } from 'lodash';
import { checkboxOutline } from 'ionicons/icons';

const Login: React.FC<ComponentProps> = (pageProps) => {

  const pageSettings : PageProps = {
    settings: {
      id: 'login-page',
      //skeleton: true
      //animated: "true"
    },
    ga4: [
      {
        action: 'onLoad',
        data: {
          category: 'auth', // Categoría del evento (puede ser cualquier nombre relevante)
          action: 'load', // Acción realizada (por ejemplo, 'Clic en botón')
          label: 'login-landing', // Etiqueta opcional para detalles adicionales
        }
      }
    ],
    header: ()=> {
      const headerProps = {
        label: i18n.t('Login'),
        slot: 'start',
        loading: pageProps.loading || false
      }
      return <Header {...headerProps} />
    },
    content: () => {
      return (
        <>
          <Form {...loginForm(pageProps)} />
          <IonFab>
          <IonFabButton>
            <IonIcon icon={checkboxOutline}></IonIcon>
            </IonFabButton>
          </IonFab>
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