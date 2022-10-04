import React from 'react'
import { IonRow } from '@ionic/react'
import FormCol from './FormCol'
import { FormRowProps } from './interfaces/FormRowProps'

/**
 * Running over columns to make it easier to make a simple grid on form
 * @param param0 
 * @returns 
 */
const FormRow: React.FC<FormRowProps> = ({ columns, control, errors }) => (
  <IonRow
    style={{ marginTop: '20px' }}>
    {columns.map((row: any) => (
      <FormCol
        row={row}
        control={control}
        errors={errors} />
    ))}
  </IonRow>
)

export default FormRow