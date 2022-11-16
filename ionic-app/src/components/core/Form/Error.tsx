import React, { FC } from 'react'
import { NestDataObject, FieldError } from "react-hook-form"
import { IonText } from '@ionic/react'

export interface ErrorProps {
  name: string,
  label: string,
  errors?: NestDataObject<Record<string, any>, FieldError>
}

/**
 * Universal error case for the
 * - We are using the label to override name, because react-forms-hook was running with name when render errors
 * @param ErrorProps  
 * @returns 
 */
const Error: FC<ErrorProps> = ({ name, label, errors }) => {
  if(errors) console.log('errors', errors)
  return  <>
    {errors && errors[name] && (
      <IonText color='danger' className='ion-padding-start'>
        <small>
          <span role='alert' id={`error-${name}`}>
            {errors[name].message.replace(name, label)}
          </span>
        </small>
      </IonText>
    )}
  </>
}

export default Error