import React, { useRef, useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import * as yup from 'yup'

import { FormComponentProps, FieldProps } from './types';
import './style.css'

import DebugUtil from '../../../classes/DebugUtil';
import Logger from '../../../classes/Logger';

import Overlay from './components/Overlay';
import Field from './components/Field';

const debug = DebugUtil.setDebug(false);

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement | null>(null); // Ref for the first field

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
    resolver: yupResolver(buildValidationSchema(form.rows)),
    defaultValues: initialValuesRef.current,
  });

  useEffect(() => {
    const newInitialValues = buildInitialValues(form.rows);
    initialValuesRef.current = newInitialValues;
    reset(newInitialValues);
    if (firstFieldRef.current) {
      firstFieldRef.current.focus();
    }
  }, [form.rows, reset]);

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsSubmitting(true);
      form.onSuccess(data).
        then(()=>{
          setIsSubmitting(false)
        });
    } catch (error) {
      if (debug) Logger.error('- Error validating form!', error);
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    if (debug) Logger.log('- Change', { name: fieldName, value: value });
  };

  return (
    <>
      <motion.div {...form.settings.animations}>
        <Overlay show={isSubmitting} />
        <form key={form.id} onSubmit={handleSubmit(onSubmit, form.onError)}>
          {form.rows.map((field: FieldProps, index: number) => (
            <div
              key={'div-' + (field.name ?? 'div-' + field.id)}
              className={`form-field ${field.className ?? 'col-span-12'}`}
            >
              <Field
                key={'field-' + (field.name ?? 'field-' + field.id)}
                field={field}
                control={control}
                errors={errors}
                onFieldChange={handleFieldChange}
                ref={index === 0 ? firstFieldRef : null} // Assign ref to the first field
              />
            </div>
          ))}
          {debug && errors && JSON.stringify(errors)}
        </form>
      </motion.div>
    </>
  );
};

export default Form;
