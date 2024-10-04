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
import * as icon from 'ionicons/icons';
import Looper from '../../utils/Looper';
import { FieldProps, FormComponentProps, IFormData } from './types';
import './style.css';
import DOMPurify from 'dompurify';
import FormHandler from './classes/FormHandler'; // Importamos la clase para manejar el envío del formulario

const Form: React.FC<FormComponentProps> = (formProps: FormComponentProps): JSX.Element | null => {
  const debug = DebugUtils.setDebug(true);
  const logger = LoggerUtils.getInstance(debug, 'FormComponent');
  const { t } = useTranslation();
  
  const [csrfToken, setCsrfToken] = useState<string>(''); 
  const [captcha, setCaptcha] = useState<string>(''); 
  const [formData, setFormData] = useState<IFormData | null>(null);
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
        
        const formHandler = new FormHandler(formData);
        await formHandler.handleSubmit(data);
        logger.info('Submission success:', data);
  
      } catch (error) {
        logger.error('Submission error:', error);
  
      } finally {
        setIsSubmitting(false);
      }

    }

  }, [formData, csrfToken, captcha, sessionId, t, logger]);

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
    return <div>Loading form...</div>;
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
        {!formData.buttons && renderButton({
            name: 'submit',
            label: t('Submit'),
            type: 'submit',
            style: { borderRadius: '20px', float: 'left', width: '46%', margin: '2%' },
            icon: icon.starOutline,
            options: []
          }, 0)}
      </form>
    </>
  );
};

export default Form;
