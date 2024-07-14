import React, { useRef, useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';

import { FormComponentProps, FormProps, FieldProps } from './types';
import './style.css';

import DebugUtil from '../../../classes/DebugUtil';
import Logger from '../../../classes/Logger';

import Overlay from './components/Overlay';
import Field from './components/Field';

import { buildValidationSchema, buildInitialValues } from './src/MyYup';

const debug = DebugUtil.setDebug(false);

const Form: React.FC<FormComponentProps> = (form) => {

  // Ref to store the initial values of the form
  const initialValuesRef = useRef(buildInitialValues(form.fields));
  
  // Ref for the first field to set focus on it when the form loads
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  
  // State to track if the form is being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to track if the form is loading initially
  const [isLoading, setIsLoading] = useState(true);

  // State to track the inner form structure
  const [innerForm, setInnerForm] = useState<FormProps>();

  // useForm hook to handle form logic
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
    resolver: yupResolver(buildValidationSchema(form.fields)),
    defaultValues: initialValuesRef.current,
  });

  // Effect to update initial values, set focus on the first field when form fields change, and manage loading state
  useEffect(() => {
    const newInitialValues = buildInitialValues(form.fields);
    initialValuesRef.current = newInitialValues;
    reset(newInitialValues);
    firstFieldRef.current?.focus();
    // Simulate a loading delay for demonstration purposes
    setTimeout(() =>
      setIsLoading(false),
    1000); // Adjust the delay as needed
  }, [form.fields, reset]);

  // Function to handle form submission
  const onSubmit = async (data: FieldValues) => {
    try {
      setIsSubmitting(true);
      await form.onSuccess(data);
    } catch (error) {
      if (debug) Logger.error('- Error validating form!', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle field value changes
  const handleFieldChange = (fieldName: string, value: any) => {
    if (debug) Logger.log('- Change', { name: fieldName, value });
  };

  return (
    <>
      <motion.div {...form.settings.animations}>
        <Overlay show={isSubmitting} duration={600} />
        <form key={form.id}
          onSubmit={handleSubmit(onSubmit, form.onError)}
          style={form.settings.style}
        >
          {form.fields.map((field: FieldProps, index: number) => (
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
                loading={isLoading}
              />
            </div>
          ))}
          <div>
            {form.buttons.map((button: FieldProps, index: number) => (
              <div
                key={'div-' + (button.name ?? 'div-' + button.id)}
                className={`form-button ${button.className ?? 'col-span-12'}`}
              >
                <Field
                  key={'button-' + (button.name ?? 'button-' + button.id)}
                  field={button}
                  control={control}
                  errors={errors}
                  onFieldChange={handleFieldChange}
                  ref={index === 0 ? firstFieldRef : null} // Assign ref to the first field
                  loading={isLoading}
                />
              </div>
            ))}
          </div>
          {debug && errors && JSON.stringify(errors)}
        </form>
      </motion.div>
    </>
  );
};

export default Form;
