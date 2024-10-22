import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as icon from 'ionicons/icons';
import * as yup from 'yup';

import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DOMPurify from 'dompurify';
import { useTranslation } from 'react-i18next';

import Overlay from '../Overlay';
import Field from './components/Field';

import DebugUtils from '../../../classes/utils/DebugUtils';
import Security from '../../../classes/utils/SecurityUtils';
import LoggerUtils from '../../../classes/utils/LoggerUtils';
import ValidationUtils from '../../../classes/managers/ValidationsUtils';
import Looper from '../../utils/Looper';

import useAppStore from '../../../integrations/stores/app.store';
import Captcha from '../../../integrations/useCaptcha';
import useFormHandler from './integrations/useFormHandler';

import { IField, IFormComponent, IFormData, ISubmitForm } from './types';
import { defaultFormSettings } from './types'
import './style.css';

const Form: React.FC<IFormComponent> = (formProps: IFormComponent): JSX.Element | null => {
  
  const debug = DebugUtils.setDebug(true);
  const logger = LoggerUtils.getInstance('FormComponent');
  const { t } = useTranslation();
  
  const [csrfToken, setCsrfToken] = useState<string>(''); 
  const [captcha, setCaptcha] = useState<string>(''); 
  const [formData, setFormData] = useState<IFormData>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
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
      resolver: yupResolver(yup.object().shape({})),
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

  const onSubmit = useCallback(async (data: any) => {

    if (formData) {

      setIsSubmitting(true);

      const { handleSubmit: handleFormSubmit } = useFormHandler(formData || { url: '', method: 'POST' });

      try {
   
        const validData = sessionId && Security.approveFormData(data, sessionId, formProps);
    
        if (!validData) {
          
          logger.error('Invalid CSRF token');

          if (formData.onError) {
            formData.onError({
              message: 'Invalid CSRF token'
            });
          }

        } else if (validData && formProps.captcha) {

          const captchaRequired = await Captcha.verifyCaptcha(captcha, validData);

          if (captchaRequired) {

            //XXX: The form will reload with a captcha jiji
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

        const IForm: ISubmitForm = {
          data: validData,
          onSuccess: formData.onSuccess,
          onError: formData.onError,
        }

        await handleFormSubmit(IForm);
  
      } catch (error) {

        logger.error('Submission error:', error);
  
      } finally {
        setIsSubmitting(false);
      }

    }

  }, [formData, csrfToken, captcha, sessionId, t, logger]);

  useEffect(() => {

    const setInitialForm = (formProps: IFormComponent) => {
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
            .test('is-true', t('You must check the publicity agreement'), value => value === true),
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
            .test('is-true', t('You must check the privacy and data policy'), value => value === true),
          options: []
        });
      }

      if (showCaptcha && captcha && sessionId && formProps.captcha) {
        fields.push({
          name: 'captcha',
          type: 'recaptcha',
          validationSchema: yup.string().required(t('The captcha is required ;)')).oneOf([captcha]),
          captcha: captcha,
          options: []
        });
      }

      const newData = {
        ...formProps,
        fields,
        settings: { ...defaultFormSettings, ...formProps.settings }, // Aplicamos la configuración por defecto
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
    return <div>Loading form...</div>;
  }

  const renderField = (field: IField, index: number) => (
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

  const renderButton = (button: IField, index: number) => (
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

      <form
        key={formData.id}
        onSubmit={handleSubmit(onSubmit, formData.onError)}
        style={formData.settings?.style}
      >
        <Looper items={formData.fields} renderItem={renderField} />
        <Looper items={formData.buttons} renderItem={renderButton} />
        {!formData.buttons && renderButton({
            name: 'submit',
            class: 'ion-button-custom',
            label: t('Submit'),
            type: 'submit',
            style: { borderRadius: '20px', float: 'left', width: '98%', margin: '2%' },
            icon: icon.starOutline,
            options: []
          }, 0)}
      </form>
    </>
  );
};

export default Form;
