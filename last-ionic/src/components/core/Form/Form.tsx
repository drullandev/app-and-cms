import React, { useRef, useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import * as yup from 'yup'

import { debug } from '../../../env'
import { FormComponentProps, FieldProps } from './types';
import './style.css'

import Field from './Field';

const buildValidationSchema = (rows: FieldProps[]) => {
  const shape = rows.reduce((acc: any, row: FieldProps) => {
    if (row.validationSchema) {
      acc[row.name] = row.validationSchema;
    }
    return acc;
  }, {});
  return yup.object().shape(shape);
};

const buildInitialValues = (rows: FieldProps[]) => {
  const initialValues: any = {};
  rows.forEach(field => {
    initialValues[field.name] = field.defaultValue || '';
  });
  return initialValues;
};

const Form: React.FC<FormComponentProps> = (form) => {

  const initialValuesRef = useRef(buildInitialValues(form.rows));

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
    resolver: yupResolver(buildValidationSchema(form.rows)),
    defaultValues: initialValuesRef.current,
  });

  useEffect(() => {
    const newInitialValues = buildInitialValues(form.rows);
    initialValuesRef.current = newInitialValues;
    reset(newInitialValues);
  }, [form.rows, reset]);

  const onSubmit = async (data: FieldValues) => {
    try {
      if (debug) console.log(data);
      form.onSuccess(data);
    } catch (error) {
      console.error('- Error validating form!', error);
    }
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    if (debug) console.log('- Change', { name: fieldName, value: value} );
  };

  return (<>
    <motion.div {...form.settings.animation} >
      <form key={form.id} onSubmit={handleSubmit(onSubmit, form.onError)}>
        {form.rows.map(field => (
          <div key={'div-'+field.name ?? 'div-'+field.id}
            className={`form-field ${field.className ?? 'col-span-12'}`}
          >
            <Field
              key={'field-'+field.name ?? 'field-'+field.id}
              field={field}
              control={control}
              errors={errors}
              onFieldChange={handleFieldChange}
            />
          </div>
        ))}
      </form>
    </motion.div>
  </>);
};

export default Form;