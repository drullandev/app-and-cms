import React, { useRef, useEffect, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';

import { FormComponentProps, FieldProps, FormProps } from './types';
import './style.css';

import DebugUtil from '../../classes/DebugUtil';
import Logger from '../../classes/LoggerClass';

import Overlay from './components/Overlay';
import Field from './components/Field';

import { buildValidationSchema, buildInitialValues } from '../../classes/MyYup';
import Security from '../../classes/Security';
import i18n from '../i18n';

const debug = DebugUtil.setDebug(false);

const Form: React.FC<FormComponentProps> = (formData) => {

  const [form, setForm] = useState<FormProps | null>(null); // Ensure form is initially null
  const initialValuesRef = useRef<FieldValues>({});
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sessionId = 'user-session-id'; // Esto puede ser el ID de la sesión del usuario
  const [csrfToken, setCsrfToken] = useState<string>('');
  const [captcha, setCaptcha] = useState<string>('');

  const setFormResolver = (fields?: FieldProps[]) => {
    return fields && {
      resolver: yupResolver(buildValidationSchema(fields)),
      defaultValues: initialValuesRef.current,
    }
  }

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>(setFormResolver(form?.fields));

  const generateNewCsrfToken = () => {
    const token = Security.generateCsrfToken(sessionId);
    setCsrfToken(token);
  };

  const generateCaptcha = () => {
    const captcha = Security.generateCaptcha();
    setCaptcha(captcha);
  };

  const onFormChange = (fieldName: string, value: any) => {
    if (debug) Logger.log('• Change', { name: fieldName, value });
  }

  const onSubmit = async (data: FieldValues) => {
    try {

      setIsSubmitting(true);

      // Filtrar los datos del formulario para eliminar los botones
      Logger.log('data', data);
      const filteredData = Object.keys(data).reduce((acc, key) => {
        if (!key.startsWith('button')) {
          acc[key] = data[key];
        }
        return acc;
      }, {} as any);

      const approvedData = Security.approveFormData(filteredData, sessionId);
      if (approvedData) {
        await form?.onSuccess(approvedData)
          .then(() => {
            generateNewCsrfToken()
            generateCaptcha()
          })
      } else {
        // Manejo de error en caso de CSRF token inválido
      }

    } catch (error) {
      if (debug) Logger.error('• Error validating form!', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  useEffect(() => {
    if (!form) return;
    const newInitialValues = buildInitialValues(form.fields);
    initialValuesRef.current = newInitialValues;
    reset(newInitialValues);
    firstFieldRef.current?.focus();
    generateNewCsrfToken();
    generateCaptcha();
    Logger.log(' • Captcha created')
    setTimeout(() => setIsLoading(false), 1000);
  }, [form, reset]);
  

  useEffect(() => {
    setForm(formData);
    generateNewCsrfToken();
    generateCaptcha();
  }, [formData]);

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

  const Captcha = () => {
    return captcha && <Field
      key={'captcha-' + form.id}
      field={{
        name: 'captcha',
        type: 'captcha',
        defaultValue: captcha
      } as FieldProps}
      control={control}
      errors={errors}
      onFieldChange={onFormChange}
      loading={isLoading}
    />
  }

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
                ref={index === 0 ? firstFieldRef : null} // Assign ref to the first field
                key={'field-' + (field.name ?? 'field-' + field.id)}
                field={field}
                control={control}
                errors={errors}
                onFieldChange={onFormChange}
                loading={isLoading}
              />
            </div>
          ))}
          {form?.captcha && captcha && <Captcha/>}
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
