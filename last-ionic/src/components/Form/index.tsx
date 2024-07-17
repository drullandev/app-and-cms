import React, { useRef, useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from 'yup';
import { motion } from 'framer-motion';

import { FormComponentProps, FieldProps, FormProps } from './types';
import './style.css';

import DebugUtil from '../../classes/DebugUtil';
import Logger from '../../classes/Logger';

import Overlay from './components/Overlay';
import Field from './components/Field';

import { buildValidationSchema, buildInitialValues } from './src/MyYup';
import Security from '../../classes/Security';
import i18n from '../extra/i18n';

const debug = DebugUtil.setDebug(false);

const Form: React.FC<FormComponentProps> = (formData) => {
  const [form, setForm] = useState<FormProps | null>(null); // Ensure form is initially null
  const initialValuesRef = useRef<FieldValues>({});
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sessionId = 'user-session-id'; // Esto puede ser el ID de la sesión del usuario
  const [csrfToken, setCsrfToken] = useState<string>('');

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
    resolver: yupResolver(buildValidationSchema(form?.fields || [])),
    defaultValues: initialValuesRef.current,
  });

  const generateNewCsrfToken = () => {
    const token = Security.generateCsrfToken(sessionId);
    setCsrfToken(token);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsSubmitting(true);

      // Filtrar los datos del formulario para eliminar los botones
      const filteredData = Object.keys(data).reduce((acc, key) => {
        if (!key.startsWith('button')) { // O puedes usar otra lógica para identificar botones
          acc[key] = data[key];
        }
        return acc;
      }, {} as any);

      const approvedData = Security.approveFormData(filteredData, sessionId);
      if (approvedData) {
        await form?.onSuccess(approvedData)
          .then(()=>{
            generateNewCsrfToken()

          })
         // Generate a new CSRF token after successful submission
      } else {
        // Manejo de error en caso de CSRF token inválido
      }

    } catch (error) {
      if (debug) Logger.error('• Error validating form!', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFormChange = (fieldName: string, value: any) => {
    if (debug) Logger.log('• Change', { name: fieldName, value });
  };

  useEffect(() => {
    if (!form) return;
    const newInitialValues = buildInitialValues(form.fields);
    initialValuesRef.current = newInitialValues;
    reset(newInitialValues);
    firstFieldRef.current?.focus();
    setTimeout(() => setIsLoading(false), 1000);
  }, [form, reset]);

  useEffect(() => {
    setForm(formData);
  }, [formData]);

  useEffect(() => {
    generateNewCsrfToken();
  }, []);

  if (!form) {
    return null; // or a loading spinner
  }

  // Add the hidden field to the form fields array
  const updatedFields: FieldProps[] = [
    ...form.fields,
    {
      id: 'csrf',
      name: 'csrf',
      type: 'hidden',
      defaultValue: csrfToken
    }
  ];

  return (
    <>
      <motion.div {...form.settings.animations}>
        <Overlay show={isSubmitting} duration={600} />
        <form key={form.id}
          onSubmit={handleSubmit(onSubmit, form.onError)}
          style={form.settings.style}
        >
          {updatedFields.map((field: FieldProps, index: number) => (
            <div
              key={'div-' + (field.name ?? 'div-' + field.id)}
              className={`form-field ${field.className ?? 'col-span-12'} ${field.type == 'hidden' ? 'hidden' : ''}`}
            >
              <Field
                key={'field-' + (field.name ?? 'field-' + field.id)}
                field={field}
                control={control}
                errors={errors}
                onFieldChange={onFormChange}
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
                  onFieldChange={onFormChange}
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
