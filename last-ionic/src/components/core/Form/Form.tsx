import React, { useEffect, useRef, useState } from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { useForm, FieldValues, DeepMap, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormProps, FormComponentProps } from './types';
import Field from './Field';
import { buildInitialValues, buildValidationSchema } from './src';
import "./style.css"



const Form: React.FC<FormComponentProps> = ({ rows = [], onSuccess = () => {}, onError}) => {

  const debug = true

  const initialValuesRef = useRef(buildInitialValues(rows));

  const [fieldValues, setFieldValues] = useState(initialValuesRef.current);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
    resolver: yupResolver(buildValidationSchema(rows)),
    defaultValues: initialValuesRef.current,
  });

  useEffect(() => {
    const newInitialValues = buildInitialValues(rows);
    initialValuesRef.current = newInitialValues;
    reset(newInitialValues);
    setFieldValues(newInitialValues);
  }, [rows, reset]);

  const onSubmit = async (data: FieldValues) => {
    try {
      if (debug) console.log(data);
      onSuccess(data);
      reset(fieldValues);
    } catch (error) {
      console.error('Error al validar los datos del formulario:', error);
    }
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    if (debug) console.log('- Change', { name: fieldName, value: value} );
    setFieldValues((prevValues: FieldValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <IonGrid>
        <IonCol>
            {rows.map(field => (
          <IonRow                key={'row-'+field.name}>
              <Field
                key={field.name}
                field={field}
                control={control}
                errors={errors}
                onFieldChange={handleFieldChange}
              />
            {/*Object.keys(errors).length > 0 && (
              <IonText color="danger">
                <p>{errors}</p>
              </IonText>
            )*/}
          </IonRow>
            ))}
        </IonCol>
      </IonGrid>
    </form>
  );
};

export default Form;
