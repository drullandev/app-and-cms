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
import GA4Tracker  from '../../classes/GA4'

// Importing utilities and helper functions
import Logger from '../../classes/LoggerClass';
import Security from '../../classes/Security';
import DebugUtil from '../../classes/DebugUtil';
import { buildValidationSchema, buildInitialValues } from './src/MyYup';

// Importing types
import { FieldProps, FormComponentProps, FormDataProps,  } from './types';

// Importing styles
import './style.css';

/**
 * Form component that handles rendering and submission of a dynamic form.
 * 
 * @param {FormComponentProps} formProps - formProps to configure the form component.
 * @returns {JSX.Element | null} - Rendered form component or null if no form data is available.
 */
const Form: React.FC<FormComponentProps> = (formProps: FormComponentProps): JSX.Element | null => {
  // Enable debug mode if necessary
  const debug = DebugUtil.setDebug(true);

  // Component state
  const [csrfToken, setCsrfToken] = useState<string>(''); // CSRF token for security
  const [captcha, setCaptcha] = useState<string>(''); // CAPTCHA value
  const [formData, setFormData] = useState<FormDataProps | null>(null); // Form data configuration
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

  // Refs for initial form values and first input field
  const initialValuesRef = useRef<FieldValues>({});
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  /**
   * Creates a resolver for form validation schema and initial values.
   * 
   * @param {FieldformProps[]} [fields] - Array of field configurations.
   * @returns {object} - Object containing resolver and default values.
   */
  const setFormResolver = (fields?: FieldProps[]) => {
    const validationSchema = fields ? buildValidationSchema(fields) : yup.object().shape({});
    return {
      resolver: yupResolver(validationSchema),
      defaultValues: initialValuesRef.current,
    };
  };

  const formResolver = setFormResolver(formData?.fields);

  // Hook for managing form functions from react-hook-form
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>(formResolver);

  /**
   * Handles form submission, filtering, and validating form data.
   * 
   * @param {FieldValues} data - Submitted form data.
   */
  const onSubmit = async (data: FieldValues) => {
    try {
      Logger.log('Submitted data:', data);
      setIsSubmitting(true);
      // Filter out button values from the form data
      const filteredData = Object.keys(data).reduce((acc, key) => {
        if (!key.startsWith('button')) {
          acc[key] = data[key];
        }
        return acc;
      }, {} as any);

      const approvedData = Security.approveFormData(filteredData, 'sessionId');
      if (approvedData) {
        await formData?.onSuccess(approvedData);
      } else {
        Logger.error('Invalid CSRF token');
        await formData?.onError({message: 'Invalid CSRF token'});
      }
      GA4Tracker.trackEvent('submit', formProps.ga4)
    } catch (error) {
      Logger.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Generates a new CSRF token and sets it in the component state.
   */
  const generateCsrfToken = () => {
    const token = Security.generateCsrfToken('sessionId');
    Logger.log('Generated CSRF Token:', token);
    setCsrfToken(token);
  };

  /**
   * Generates a CAPTCHA if required by form settings.
   */
  const generateCaptcha = () => {
    if (formProps.captcha) {
      const captcha = Security.generateCaptcha();
      Logger.log('Generated CAPTCHA:', captcha);
      setCaptcha(captcha);
    }
  };

  /**
   * Logs changes in form fields for debugging purposes.
   * 
   * @param {string} fieldName - The name of the field that changed.
   * @param {any} value - The new value of the field.
   */
  const onFormChange = (fieldName: string, value: any) => {
    if (debug) Logger.log('Field change:', { name: fieldName, value });
  };

  // Generate CSRF token and CAPTCHA on component mount
  useEffect(() => {
    generateCsrfToken();
    generateCaptcha();
  }, []);

  // Update form data when CSRF token and CAPTCHA are available
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

      if (captcha && formProps?.captcha) {
        fields.push({
          name: 'captcha',
          type: 'recaptcha',
          validationSchema: yup.string()
            .required('Please dude, I wanna trust in you!')
            .oneOf([captcha]),
          captcha: captcha
        });
      }

      Logger.log('Updated formData fields:', fields);

      return {
        ...formProps,
        fields,
        settings: formProps?.settings || {}
      };
    };

    setFormData(setInitialForm(formProps) as FormDataProps);

    GA4Tracker.trackEvent('load', formProps.ga4)
    setTimeout(() => setIsLoading(false), 500);
    
  }, [csrfToken, captcha, formProps]);

  // Set initial form values and focus on the first input field when formData is available
  useEffect(() => {
    if (formData) {
      const newInitialValues = buildInitialValues(formData.fields);
      initialValuesRef.current = newInitialValues;
      reset(newInitialValues);
      firstFieldRef.current?.focus();
    }
  }, [formData, reset]);

  // Return null if no form data is available
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
          <div
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
          </div>
        ))}
        <div>
          {formData.buttons && formData.buttons.map((button: FieldProps, index: number) => (
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
