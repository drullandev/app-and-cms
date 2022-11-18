import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { CreateAnimation, IonText, IonButton, IonGrid, useIonLoading, useIonToast, getConfig, IonRow, IonCol, IonLabel, IonCheckbox, IonInput, IonItem, IonSpinner, IonTextarea, IonPage, IonContent } from '@ionic/react'
import * as yup from 'yup'
import { FormProps } from "../components/core/Form/FormProps"

type FormData = {
  props:{
    identifier?: string;
    password?: string;
  }
};

interface StateProps {
  mode: 'ios' | 'md'
  userJwt: string
  userNickname: string
  userDarkMode: boolean
  isLoggedIn: boolean,
  loading: boolean,
}

interface DispatchProps {}

interface MyFormProps extends FormProps, StateProps, DispatchProps {}

const Pinga: React.FC<MyFormProps> = (props) => {

  
  const validationSchema = yup.object().shape({ 
    lastName: yup.string().email().required(),
  }).required()
  const { register, control, setValue, handleSubmit, errors } = useForm<FormData>({validationSchema})



  const onSubmit = handleSubmit(({ props }) => {

    console.log(errors, props);
  }); // firstName and lastName will have correct type

  return (<IonPage id='werwe'>
    <IonContent>
      <IonItem>
        <form noValidate onSubmit={onSubmit}>
          <Controller
            as={
              <IonInput 
                aria-invalid={errors ? 'true' : 'false'}
                aria-describedby={`lastNameError`}
                type={'text'}               
              />              
            }
            name={'lastName'}
            control={control}
            onChangeName='onIonChange'
            onBlurName='onIonBlur'
          />
            <IonItem>{JSON.stringify(errors)}</IonItem>
            <IonButton
              type="submit"
            >
          </IonButton >
          
        </form>
      </IonItem>

    </IonContent>

  </IonPage>
  );
}

export default Pinga