import React from 'react'
import { IonRow } from '@ionic/react'
import FormNewCol from './FormNewCol'
import { FormNewRowProps } from './interfaces/FormRowProps'
import { FieldNewProps } from './interfaces/FieldNewProps'
import FieldNew from './FieldNew'

/**
 * Running over columns to make it easier to skafold a simple grid for a form
 * @param param0 
 * @returns 
 */
const FormNewRow: React.FC<FieldNewProps> = ({ type, name, slug, label, required, control, errors }) => {
  console.log('FormNewRow',{ type, name, slug, label, required, control, errors })  
  return  <IonRow style={{ marginTop: '20px' }}>
        <FieldNew {...{ type, name, slug, label, required, control, errors }}/>
    </IonRow>  

}

export default FormNewRow