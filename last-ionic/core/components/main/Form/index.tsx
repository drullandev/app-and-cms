import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import Overlay from '../Overlay';
import Field from './components/Field';

import LoggerUtils from '../../../classes/utils/LoggerUtils';
import Security from '../../../classes/utils/SecurityUtils';
import DebugUtils from '../../../classes/utils/DebugUtils';
import useAppStore from '../../../classes/stores/app.store';

import ValidationUtils from '../../../classes/managers/ValidationsUtils';
import Captcha from '../../../integrations/CaptchaIntegration';

import Looper from '../../utils/Looper';

import { FieldProps, FormComponentProps, IFormData } from './types';
import './style.css';
import DOMPurify from 'dompurify';

const Form: React.FC<FormComponentProps> = (formProps: FormComponentProps): JSX.Element | null => {
  const debug = DebugUtils.setDebug(true);
  const logger = LoggerUtils.getInstance(true, 'FormComponent');

  const { t } = useTranslation();

  const [csrfToken, setCsrfToken] = useState<string>(''); // CSRF token for security
  const [captcha, setCaptcha] = useState<string>(''); // CAPTCHA value
  const [formData, setFormData] = useState<IFormData | null>(null); // Form data configuration
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
  const [showCaptcha, setShowCaptcha] = useState(false); // Estado para mostrar CAPTCHA
  const { sessionId } = useAppStore();

  const initialValuesRef = useRef<FieldValues>({});
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  const formResolver = useMemo(() => {
    if (formData?.fields) {
      const MyValidationUtils = new ValidationUtils(formData.fields);
      const validationSchema = MyValidationUtils.buildValidationSchema();
      return {
        resolver: yupResolver(validationSchema),
        defaultValues: initialValuesRef.current,
      };
    }
    return {
      resolver: yupResolver(yup.object().shape({})), // Empty schema if no fields
      defaultValues: initialValuesRef.current,
    };
  }, [formData]);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>(formResolver);

  // Función para generar el CSRF token
  const generateCsrfToken = (sessionId: string) => {
    if (sessionId) {
      const token = Security.generateCsrfToken(sessionId, formProps.id);
      logger.debug('Generated CSRF Token:', token);
      setCsrfToken(token);
    } else {
      logger.error('Session ID is not available yet.');
    }
  };

  const generateCaptcha = () => {
    if (formProps.captcha) {
      const captcha = Security.generateCaptcha();
      logger.debug('Generated CAPTCHA:', captcha);
      setCaptcha(captcha);
    }
  };

  const onSubmit = useCallback(async (data: FieldValues) => {
    setIsSubmitting(true);
  
    // Verifica que formData esté disponible
    if (!formData) {
      logger.error('formData is not initialized');
      return;
    }
  
    try {

      // Removing buttons
      const filteredData = Object.keys(data).reduce((acc, key) => {
        if (!key.startsWith('button')) {
          acc[key] = data[key];
        }
        return acc;
      }, {} as any);
  
      // Accepting the CSRF
      const validData = sessionId && Security.approveFormData(filteredData, sessionId, formProps);
  
      if (!validData) {
        logger.error('Invalid CSRF token');
        formData.onError({ message: 'Invalid CSRF token' });
      }
      
      if (validData && formProps.captcha) {
        const captchaRequired = await Captcha.verifyCaptcha(captcha, validData);
        if (captchaRequired) {
          setShowCaptcha(true);
          logger.info('Showing CAPTCHA due to verification requirement');
          for (const key in validData) {
            if (
              Object.prototype.hasOwnProperty.call(validData, key) &&
              !["captcha"].includes(key)
            ) {
              validData[key] = DOMPurify.sanitize(data[key]);
            }
          }
        }
      }

      // For now removing privacy and publicity stuff!!
      // TODO: Recover this parameters somewhere in the cms for first, later to CRM somehow!!
      for (const key in validData) {
        if (
          Object.prototype.hasOwnProperty.call(validData, key) &&
          !["privacy", "publicity"].includes(key)
        ) {
          validData[key] = DOMPurify.sanitize(data[key]);
        }
      }
  
      // Then the onSuccess actions...
      if (typeof formData.onSuccess === 'function') {
        await formData.onSuccess(validData);
      } else {
        logger.error('formData.onSuccess is not defined');
      }
  
    } catch (error) {
      logger.error('Submission error:', error);
      formData.onError({ message: 'Submission failed', error });
    } finally {
      setIsSubmitting(false);
    }
  
  }, [formData, csrfToken, captcha, sessionId]);
  

  useEffect(() => {

    const setInitialForm = (formProps: FormComponentProps) => {

      const fields = [...(formProps.fields || [])];

      if (csrfToken) {
        logger.info('A csrf token was added');
        fields.push({
          name: 'csrf',
          type: 'hidden',
          defaultValue: csrfToken,
          validationSchema: yup.string().required().oneOf([csrfToken]),
          options: []
        });
      }

      if (formProps.agreement) {
        fields.push({
          name: 'check-agreement',
          placeholder: t('Publicity agreement'),
          label: t('Accept the publicity agreement'),
          type: 'checkbox',
          defaultValue: false,
          validationSchema: yup
          .boolean()
          .test(
            'is-true',
            t('You must check the publicity agreement'),
            function (value) {
              return value === true;
            }
          ),
          options: []
        });
      }

      if (formProps.privacy) {
        fields.push({
          name: 'check-lopd',
          label: t('Accept Privacy and Data Policy'),
          type: 'checkbox',
          defaultValue: false,
          validationSchema: yup
          .boolean()
          .test(
            'is-true',
            t('You must check the privacy and data policy'),
            function (value) {
              return value === true;
            }
          ),
          options: []
        });
      }

      if (showCaptcha && captcha && formProps.captcha) {
        fields.push({
          name: 'captcha',
          type: 'recaptcha',
          validationSchema: yup.string().required(t('The captha is required ;)')).oneOf([captcha]),
          captcha: captcha,
          options: []
        });
      }

      const newData = {
        ...formProps,
        fields,
        settings: formProps?.settings || {},
      };

      return newData;
    };

    const updatedFormData = setInitialForm(formProps) as IFormData;

    setFormData(updatedFormData);

  }, [csrfToken, formProps, captcha, showCaptcha]);

  useEffect(() => {
    if (formData?.fields) {
      const MyValidationUtils = new ValidationUtils(formData.fields);
      const newInitialValues = MyValidationUtils.buildInitialValues();
      initialValuesRef.current = newInitialValues;
      reset(newInitialValues);
      if (firstFieldRef.current) {
        firstFieldRef.current.focus();
      }
      setIsLoading(false);
    }
  }, [formData, reset]);

  useEffect(() => {
    if (sessionId) generateCsrfToken(sessionId);
  }, [sessionId]);

  useEffect(generateCaptcha, []);

  if (isLoading || !formData) {
    return <div>Loading form...</div>; // Pantalla de carga hasta que todo esté listo
  }

  const renderField = (field: FieldProps, index: number) => (
    <Field
      ref={index === 0 ? firstFieldRef : null}
      key={'field-' + (field.name ?? 'field-' + field.id) + index}
      field={field}
      control={control}
      errors={errors}
      onFieldChange={() => {}}
      loading={isLoading}
    />
  );

  const renderButton = (button: FieldProps, index: number) => (
    <Field
      key={'button-' + (button.name ?? 'button-' + button.id) + index}
      field={button}
      control={control}
      errors={errors}
      onFieldChange={() => {}}
      loading={isLoading}
    />
  );

  return (
    <>
      <Overlay show={isSubmitting} duration={600} />
      <form
        key={formData.id}
        onSubmit={handleSubmit(onSubmit, formData.onError)}
        style={formData.settings.style}
      >
        <Looper items={formData.fields} renderItem={renderField} />
        <Looper items={formData.buttons} renderItem={renderButton} />
      </form>
    </>
  );
};

export default Form;
