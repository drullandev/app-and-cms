import React from 'react'
import { IonCol } from '@ionic/react'

import Field from './Field'

import { FormColProps } from './interfaces/FormColProps'

const FormCol: React.FC<FormColProps> = ({ row, control, errors }) => {
  //console.log('FormCol', { row, control, errors })
  return (
    <IonCol>
      {row.field && <Field
        key={row.field.slug}
        slug={row.field.slug}
        name={row.field.slug}
        label={row.label}
        control={control}
        errors={errors}
        required={row.required}
      />}
    </IonCol>
  )
}

export default FormCol