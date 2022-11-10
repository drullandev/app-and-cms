import React from 'react'
import { IonRow } from '@ionic/react'
import FormNewCol from './FormNewCol'
import { FormNewRowProps } from './interfaces/FormRowProps'
import { FieldNewProps } from './interfaces/FieldNewProps'
import FieldNew from './FieldNew'

const FormNewRow: React.FC<FieldNewProps> = (params) => {
  return <IonRow style={{ marginTop: '20px' }}>
    <FieldNew {...params}/>
  </IonRow>  

}

export default FormNewRow