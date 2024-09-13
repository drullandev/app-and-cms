import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
//import { motion } from 'framer-motion';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Importing components
import Overlay from './components/Overlay';
import Field from './components/Field';
//import GA4Tracker from '../../../../src/integrations/GA4Integration';
//import DebugBox from '../DebugBox';
//import Accordion from '../Accordion';

// Importing utilities and helper functions
import LoggerUtils from '../../classes/utils/LoggerUtils';
import Security from '../../classes/utils/SecurityUtils';
import DebugUtils from '../../classes/utils/DebugUtils';
import ValidationUtils from '../../classes/managers/ValidationsUtils';
import Captcha from '../../integrations/CaptchaIntegration';

// Importing types
import { FieldProps, FormComponentProps, FormDataProps } from './types';

// Importing styles
import './style.css';

// Initialize logger
const Form: React.FC<FormComponentProps> = (formProps: FormComponentProps): JSX.Element | null => {
  const debug = DebugUtils.setDebug(true);
  const logger = useMemo(() => {
    return debug ? LoggerUtils.getInstance('FormComponent', debug) : console;
  }, [debug]);

  const { t } = useTranslation();
  
  const [csrfToken, setCsrfToken] = useState<string>(''); // CSRF token for security
  const [captcha, setCaptcha] = useState<string>(''); // CAPTCHA value
  const [formData, setFormData] = useState<FormDataProps | null>(null); // Form data configuration
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
  const [showCaptcha, setShowCaptcha] = useState(false); // Estado para mostrar CAPTCHA
  const [ipAddress, setIpAddress] = useState<string>('203.0.113.0'); // Dirección IP del usuario

  const initialValuesRef = useRef<FieldValues>({});
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  // Memoize the formData for performance
  const memoizedFormData = useMemo(() => formData?.fields || [], [formData]);

  const setFormResolver = (fields?: FieldProps[]) => {
    if (fields) {
      const MyValidationUtils = new ValidationUtils(fields);
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
  };

  const formResolver = setFormResolver(formData?.fields);
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>(formResolver);

  const generateCsrfToken = () => {
    const token = Security.generateCsrfToken('sessionId');
    if (debug) logger?.debug('Generated CSRF Token:', token);
    setCsrfToken(token);
  };

  const generateCaptcha = () => {
    if (formProps.captcha) {
      const captcha = Security.generateCaptcha();
      if (debug) logger?.debug('Generated CAPTCHA:', captcha);
      setCaptcha(captcha);
    }
  };

  const getUserIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      if (debug) logger?.debug(`Tu IP es: ${data.ip}`);
      setIpAddress(data.ip);
    } catch (error) {
      if (debug) logger?.error('Error al capturar la IP:', error);
    }
    return '';
  };

  const onFormChange = (fieldName: string, value: any) => {
    if (debug) logger?.debug('Field change:', { name: fieldName, value });
  };

  const onSubmit = useCallback(async (data: FieldValues) => {
    if (debug) logger?.debug('Data to submit (initial):', data);

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
        const captchaRequired = await Captcha.verifyCaptcha(captcha, approvedData);
        if (captchaRequired) {
          setShowCaptcha(true);
          if (debug) logger?.info('Showing CAPTCHA due to verification requirement');
        } else {
          await formData?.onSuccess(approvedData);
        }
      } else {
        if (debug) logger?.error('Invalid CSRF token');
        formData?.onError({ message: 'Invalid CSRF token' });
      }

      //GA4Tracker.trackEvent('submit', formProps.ga4);

    } catch (error) {
      if (debug) logger?.error('Submission error:', error);
      //GA4Tracker.trackEvent('error', formProps.ga4);
    } finally {
      setIsSubmitting(false);
    }
  }, [captcha, formData, csrfToken]);

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
          defaultValue: csrfToken,
          validationSchema: yup.string()
            .required('Why the csrf left ó.ò?')
            .oneOf([csrfToken]),
        });
      }

      if (formProps?.agreement) {
        fields.push({
          name: 'agreement',
          label: t('Accept the publicity agreement'),
          type: 'checkbox',
          className: 'col-span-12',
          defaultValue: false,
          validationSchema: yup.boolean()
            .required(t('Accept publicity agreement is required'))
            .oneOf([true], t('You must accept the publicity agreement'))
        });
      }

      if (formProps?.privacy) {
        fields.push({
          name: 'lopd',
          label: t('Accept Privacy and Data Policy'),
          type: 'checkbox',
          className: 'col-span-12',
          defaultValue: false,
          validationSchema: yup.boolean()
            .required(t('Accept Privacy and Data Policy agreement is required'))
            .oneOf([true], t('You must accept the Privacy and Data Policy agreement'))
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

      if (debug) logger?.debug('Updated formData ():', fields);

      return newData;
    };

    setFormData(setInitialForm(formProps) as FormDataProps);
    getUserIP();
    //GA4Tracker.trackEvent('load', formProps.ga4);
    setTimeout(() => setIsLoading(false), 500);

  }, [csrfToken, captcha, showCaptcha]);

  useEffect(() => {
    if (formData?.fields) {
      const MyValidationUtils = new ValidationUtils(formData.fields);
      const newInitialValues = MyValidationUtils.buildInitialValues();
      initialValuesRef.current = newInitialValues;
      reset(newInitialValues);
      if (firstFieldRef.current) {
        firstFieldRef.current.focus();
      }
    }
  }, [formData, reset]);

  if (!formData) {
    return null;
  }

  {/*<motion.div {...formData.settings.animations}>*/}
  return (
    <>
      <Overlay show={isSubmitting} duration={600} />
      <form
        key={formData.id}
        onSubmit={handleSubmit(onSubmit, formData.onError)}
        style={formData.settings.style}
      >
        {/*<motion.div {...field?.animations}
          key={'div-' + (field.name ?? 'div-' + field.id)}
          className={`form-field ${field.className ?? 'col-span-12'} ${field.type === 'hidden' ? 'hidden' : ''}`}
        >*/}
        {formData.fields && formData.fields.map((field: FieldProps, index: number) => (
          <Field
            ref={index === 0 ? firstFieldRef : null}
            key={'field-' + (field.name ?? 'field-' + field.id)+index}
            field={field}
            control={control}
            errors={errors}
            onFieldChange={onFormChange}
            loading={isLoading}
          />
          ))}
          {/*</motion.div>*/}
        <div>
          {/*<motion.div {...button?.animations || {}}
            key={'div-' + (button.name ?? 'div-' + button.id)}
            className={`form-button ${button.className ?? 'col-span-12'}`}
          >*/}
          {/*</motion.div>*/}
          {formData.buttons && formData.buttons.map((button: FieldProps, index: number) => (
              <Field
                key={'button-' + (button.name ?? 'button-' + button.id)+index}
                field={button}
                control={control}
                errors={errors}
                onFieldChange={onFormChange}
                loading={isLoading}
              />
          ))}
        </div>
        {/*
        <>
          <DebugBox debugThis={debug}>          
            <Accordion title="Errors" sections={[{ title: 'Errors', content: errors }]} data={undefined} />
            <Accordion title="Form Data" sections={[{ title: 'Form Data', content: formData }]} data={formData} />
            <Accordion title="CSRF Token" sections={[{ title: 'CSRF Token', content: csrfToken }]} data={csrfToken} />
          </DebugBox>
        </>
        */}
      </form>
    </>
  );
  {/*</motion.div>*/}
};

export default Form;
