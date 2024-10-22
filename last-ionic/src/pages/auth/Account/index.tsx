import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useTranslation } from 'react-i18next';
import Form from '../../../components/main/Form/index';
import { usernameFormData, emailFormData, providerFormData, darkModeFormData, hasSeenTutorialFormData } from './source'; // Importar formularios

const Account: React.FC = () => {
  const { t } = useTranslation();

  return (
    <IonPage>
      <IonContent>
        {/* Formulario de Username */}
        <Form {...usernameFormData()} />
        
        {/* Formulario de Email */}
        <Form {...emailFormData()} />
        
        {/* Formulario de Provider */}
        <Form {...providerFormData()} />

        {/* Formulario de Dark Mode */}
        <Form {...darkModeFormData()} />

        {/* Formulario de Has Seen Tutorial */}
        <Form {...hasSeenTutorialFormData()} />
      </IonContent>
    </IonPage>
  );
};

export default Account;
