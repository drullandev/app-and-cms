import React, { FC } from 'react'
import { IonItem, IonLabel, IonInput } from '@ionic/react'
import { Controller } from 'react-hook-form'
import { InputProps } from './types'
import Error from '../Error'

const Input: FC<InputProps> = ({ name, control, component, label, errors }) => {

  return <>
    <IonItem style={{ width: '90%' }}>
      {label && <IonLabel className='ion-text-uppercase bold' position='floating'>{label}</IonLabel>}
      <Controller
        as={component ?? <IonInput
          aria-describedby={`${name}Error`}
          aria-invalid={errors && errors[name] ? 'true' : 'false'}
        />}
        name={name}
        control={control}
        onChangeName='onIonChange'
      />
    </IonItem>
    <Error label={label ?? ''} name={name} errors={errors} />
  </>
}

export default React.memo(Input)