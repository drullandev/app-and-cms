import React, { useEffect, useRef, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { yupResolver } from '@hookform/resolvers/yup';

// Importing components
import Overlay from './components/Overlay';
import Field from './components/Field';
import DebugBox from '../DebugBox';
import Accordion from '../Accordion';
import GA4Tracker from '../../classes/GA4';

// Importing utilities and helper functions
import Logger from '../../classes/LoggerClass';
import Security from '../../classes/Security';
import DebugUtil from '../../classes/DebugUtil';
import { buildValidationSchema, buildInitialValues } from '../../classes/MyYup';
import CaptchaManager from '../../classes/CaptchaManager'; // Importar CaptchaManager

// Importing types
import { FieldProps, FormComponentProps, FormDataProps } from './types';

// Importing styles
import './style.css';

const Form: React.FC<FormComponentProps> = (formProps: FormComponentProps): JSX.Element | null => {
  const debug = DebugUtil.setDebug(true);
  const [csrfToken, setCsrfToken] = useState<string>(''); // CSRF token for security
  const [captcha, setCaptcha] = useState<string>(''); // CAPTCHA value
  const [formData, setFormData] = useState<FormDataProps | null>(null); // Form data configuration
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
  const [showCaptcha, setShowCaptcha] = useState(false); // Estado para mostrar CAPTCHA
  const [ipAddress, setIpAddress] = useState<string>('203.0.113.0'); // Dirección IP del usuario

  const initialValuesRef = useRef<FieldValues>({});
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  const setFormResolver = (fields?: FieldProps[]) => {
    const validationSchema = fields ? buildValidationSchema(fields) : yup.object().shape({});
    return {
      resolver: yupResolver(validationSchema),
      defaultValues: initialValuesRef.current,
    };
  };

  const formResolver = setFormResolver(formData?.fields);
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>(formResolver);

  const generateCsrfToken = () => {
    const token = Security.generateCsrfToken('sessionId');
    Logger.log('Generated CSRF Token:', token);
    setCsrfToken(token);
  };

  const generateCaptcha = () => {
    if (formProps.captcha) {
      const captcha = Security.generateCaptcha();
      Logger.log('Generated CAPTCHA:', captcha);
      setCaptcha(captcha);
    }
  };

  const getUserIP = async (): Promise<string> => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log(`Tu IP es: ${data.ip}`);
        setIpAddress(data.ip);
    } catch (error) {
        console.error('Error al capturar la IP:', error);
    }
    return '';
};

  const onFormChange = (fieldName: string, value: any) => {
    if (debug) Logger.log('Field change:', { name: fieldName, value });
  };

  const onSubmit = async (data: FieldValues) => {
    Logger.log('Data to submit (initial):', data);

    try {
      setIsSubmitting(true);

      // Filtrar valores de botón del formulario
      const filteredData = Object.keys(data).reduce((acc, key) => {
        if (!key.startsWith('button')) {
          acc[key] = data[key];
        }
        return acc;
      }, {} as any);

      // Aquí se lleva a cabo el proceso de aprobación del CSRF
      const approvedData = Security.approveFormData(filteredData, 'sessionId'); // TODO: algo sobre sessionId jejeje
      if (approvedData) {
        // Verificar si se debe mostrar el CAPTCHA antes de proceder
        const captchaRequired = CaptchaManager.handleLoginAttempt(ipAddress, true); // Suponiendo que el inicio de sesión fue exitoso
        if (captchaRequired) {
          setShowCaptcha(true);
          CaptchaManager.showCaptcha(); // Lógica para mostrar el CAPTCHA
        } else {
          await formData?.onSuccess(approvedData);
        }
      } else {
        Logger.error('Invalid CSRF token');
        formData?.onError({ message: 'Invalid CSRF token' });
      }

      GA4Tracker.trackEvent('submit', formProps.ga4);

    } catch (error) {
      Logger.error('Submission error:', error);
      GA4Tracker.trackEvent('error', formProps.ga4);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    generateCsrfToken();
    generateCaptcha();
  }, []);

  useEffect(() => {
    const setInitialForm = (formProps?: FormComponentProps) => {

      const fields = [...(formProps?.fields || [])];
      const csrfFieldIndex = fields.findIndex(field => field.name === 'csrf');

      if (csrfToken && csrfFieldIndex === -1) {
        fields.push({
          name: 'csrf',
          type: 'hidden',
          validationSchema: yup.string()
            .required('Why the csrf left ó.ò?')
            .oneOf([csrfToken]),
          defaultValue: csrfToken
        });
      }

      if (showCaptcha && captcha && formProps?.captcha) {
        fields.push({
          name: 'captcha',
          type: 'recaptcha',
          validationSchema: yup.string()
            .required('Please dude, I wanna trust in you!')
            .oneOf([captcha]),
          captcha: captcha
        });
      }

      const newData = {
        ...formProps,
        fields,
        settings: formProps?.settings || {}
      };

      Logger.log('Updated formData ():', fields);
      return newData;
    };

    setFormData(setInitialForm(formProps) as FormDataProps);
    getUserIP();
    GA4Tracker.trackEvent('load', formProps.ga4);
    setTimeout(() => setIsLoading(false), 500);

  }, [csrfToken, captcha, formProps, showCaptcha]);

  useEffect(() => {
    if (formData) {
      const newInitialValues = buildInitialValues(formData.fields);
      initialValuesRef.current = newInitialValues;
      reset(newInitialValues);
      firstFieldRef.current?.focus();
    }
  }, [formData, reset]);

  if (!formData) {
    return null;
  }

  return (
    <motion.div {...formData.settings.animations}>
      <Overlay show={isSubmitting} duration={600} />
      <form
        key={formData.id}
        onSubmit={handleSubmit(onSubmit, formData.onError)}
        style={formData.settings.style}
      >
        {formData.fields && formData.fields.map((field: FieldProps, index: number) => (
          <motion.div {...field?.animations}
            key={'div-' + (field.name ?? 'div-' + field.id)}
            className={`form-field ${field.className ?? 'col-span-12'} ${field.type === 'hidden' ? 'hidden' : ''}`}
          >
            <Field
              ref={index === 0 ? firstFieldRef : null}
              key={'field-' + (field.name ?? 'field-' + field.id)}
              field={field}
              control={control}
              errors={errors}
              onFieldChange={onFormChange}
              loading={isLoading}
            />
          </motion.div>
        ))}
        <div>
          {formData.buttons && formData.buttons.map((button: FieldProps, index: number) => (
            <motion.div {...button?.animations || {}}
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
            </motion.div>
          ))}
        </div>
        {/* Uncomment if needed
        <Accordion title="Errors" sections={[{ title: 'Errors', content: errors }]} />
        <DebugBox debug={debug}>          
          <Accordion title="Form Data" sections={[{ title: 'Form Data', content: formData }]} />
          <Accordion title="CSRF Token" sections={[{ title: 'CSRF Token', content: csrfToken}]} />
        </DebugBox>
        */}
      </form>
    </motion.div>
  );
};

export default Form;
