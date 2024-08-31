import React, { useState, forwardRef, useEffect, useCallback } from 'react';
import { Controller, DeepMap, FieldError } from 'react-hook-form';
import { IonItem, IonInput, IonTextarea, IonSelect, IonSelectOption, IonCheckbox, IonDatetime, IonLabel, IonRadio, IonRadioGroup, IonRange, IonToggle, IonSkeletonText, IonSpinner, IonButton } from '@ionic/react';
import * as yup from 'yup';
import * as icon from 'ionicons/icons';
import { debounce } from 'lodash';

import { FieldProps } from '../types';

import DebugUtils from '../../../classes/utils/DebugUtils';

import Label from './Label';
import Skeleton from './Skeleton';
import Error from './Error';
import Button from './Button';
import ReCAPTCHA from 'react-google-recaptcha';
import Security from '../../../classes/utils/SecurityUtils';
import Icon from '../../_Ionic/v8/Icon';

/**
 * Field component that handles various types of form fields with validation, loading states, and error handling.
 * @param {object} props - The props for the Field component.
 * @param {FieldProps} props.field - The properties for the field.
 * @param {any} props.control - Control object from react-hook-form.
 * @param {DeepMap<Record<string, any>, FieldError>} props.errors - Errors object from react-hook-form.
 * @param {Function} props.onFieldChange - Callback function to handle field change.
 * @param {boolean} props.loading - Loading state for the field.
 * @returns {JSX.Element} The rendered Field component.
 */
const Field = forwardRef<any, {
  field: FieldProps;
  control: any;
  errors: DeepMap<Record<string, any>, FieldError>;
  onFieldChange: (name: string, value: any) => void;
  loading: boolean; // Added loading prop
}>(({ field, control, errors, onFieldChange, loading }, ref) => {

  // State to manage the loading status of the field
  const [loadingField, setLoadingField] = useState<{ [key: string]: boolean }>({});
  const [showSecret, setShowSecret] = useState(false);

  // Builds the validation schema for the fields using Yup
  const buildValidationSchema = (fields: FieldProps[]) => {
    const shape = fields.reduce((acc: any, row: FieldProps) => {
      if (row.validationSchema) {
        acc[row.name] = row.validationSchema;
      }
      return acc;
    }, {});
    return yup.object().shape(shape);
  };

  const validationSchema = buildValidationSchema([field]);

  // Debounces the field change handler to optimize performance
  const debouncedHandleFieldChange = useCallback(
    debounce((value: any) => {
      onFieldChange(field.name, value);
    }, 700),
    [field.name, onFieldChange]
  );

  /**
   * Renders the appropriate input based on the field type and handles validation and error display.
   * @param {any} controller - Controller object from react-hook-form.
   * @param {DeepMap<Record<string, any>, FieldError>} errors - Errors object from react-hook-form.
   * @returns {JSX.Element} The rendered input component.
   */
  const renderInput = (controller: any, errors: DeepMap<Record<string, any>, FieldError>): JSX.Element => {
    
    // Render skeleton if loading is true
    if (loading && field?.type != 'hidden') {
      return (
        <IonItem style={field.style}>
          <IonSkeletonText style={{ width: '100%', height: '45px', borderRadius: '15px' }} className={field.className} />
        </IonItem>
      );
    }

    // Handle input change events
    const inputChange = (e: any) => {
      if (field.type === 'button' || field.type === 'submit') return;

      const value = (field.type === 'checkbox') ? (e.detail.checked ?? false) : e.detail.value;

      if (field.name) {
        controller.onChange(value);
        debouncedHandleFieldChange(value);
      }

    };

    // Common properties for input elements
    const commonProps = {
      ...controller,
      ref,
      onIonInput: (e: any) => inputChange(e),
      onIonChange: (e: any) => inputChange(e),
      value: controller.value || null
    };

    // Properties for reCAPTCHA
    const recaptchaProps = {
      ...controller,
      ref,
      onChange: (e: any) => inputChange(e),
    };

    /**
     * Renders the status icon for the field based on validation and error state.
     * @param {any} controller - Controller object from react-hook-form.
     * @param {string} fieldName - The name of the field.
     * @param {any} errors - Errors object from react-hook-form.
     * @returns {JSX.Element} The status icon component.
     */
    const fieldStatusIcon = (controller: any, fieldName: string, errors: any): JSX.Element => {

      const setColor = () => {
        let displayColor = 'medium';

        if (loadingField[fieldName]) {
          displayColor = 'medium';
        } else if (errors && errors[fieldName]) {
          displayColor = 'danger';
        } else if (!controller.value) {
          displayColor = 'medium';
        }
        return displayColor
      }

      const setIcon = (color?: string) => {
        if (field.secret) {
          return (
            <Icon color={color ?? setColor()}
              onClick={() => setShowSecret(!showSecret)}
              icon={showSecret ? icon.eye : icon.eyeOff}
            />
          );
        }
        switch (field.type) {
          case 'email':
            return <Icon icon={icon.at} color={color ?? setColor()} />;
          case 'date':
          case 'datetime':
          case 'datetime-local':
            return <Icon icon={icon.calendar} color={color ?? setColor()} />;
          case 'url':
            return <Icon icon={icon.link} color={color ?? setColor()} />;
          case 'tel':
            return <Icon icon={icon.call} color={color ?? setColor()} />;
          case 'password':
            return (
              <Icon
                color={color ?? setColor()}
                onClick={() => setShowSecret(!showSecret)}
                icon={showSecret ? icon.eyeOff : icon.eye}
              />
            );
          case 'number':
            return <Icon icon={icon.calculator} color={color ?? setColor()} />;
          case 'recaptcha':
            return <Icon icon={icon.ribbonOutline} color={color ?? setColor()} />;
          default:
            return <Icon icon={icon.checkmarkCircle} color={color ?? setColor()} />;
        }
      };

      const setCases = [
        {
          condition: loadingField[fieldName] || loading,
          icon: <IonSpinner name="lines" color="medium" />
        },
        {
          condition: errors && errors[fieldName],
          icon: setIcon()
        },
        {
          condition: !controller.value,
          icon: setIcon()
        },
        {
          condition: true,
          icon: (() => {
            try {
              validationSchema.validateSyncAt(fieldName, { [fieldName]: controller.value });
              return setIcon('success'); // Change to green if valid
            } catch (error) {
              return setIcon('danger'); // Keep red if invalid
            }
          })()
        }
      ];

      const matchingCase = setCases.find(c => c.condition);
      return matchingCase ? matchingCase.icon : <></>;
    };


    const checkIfFieldIsRequired = (fieldName: string): boolean => {
      try {
        const fieldSchema = validationSchema.fields[fieldName] as yup.Schema;
        if (!fieldSchema) {
          return false;
        }
        return fieldSchema.tests.some((test: any) => test.OPTIONS.name === 'required');
      } catch (error) {
        return false;
      }
    };

    switch (field.type) {
      case 'text':
      case 'url':
      case 'time':
      case 'week':
      case 'month':
      case 'datetime-local':
      case 'search':
      case 'tel':
      case 'email':
      case 'number':
      case 'password':
      default:
        return (
          <>
            <IonItem>
              <IonInput
                type={ field.type == 'email' || showSecret ? 'text' : field.type}
                label={field.label + (checkIfFieldIsRequired(field.name) ? ' *' : '')}
                labelPlacement="floating"
                value={controller.value}
                disabled={loading}
                aria-invalid={errors && errors[field.name ?? field.id ?? 'input'] ? 'true' : 'false'}
                aria-describedby={commonProps.id}
                {...commonProps}
                onBlur={() => { // Add onBlur to force validation when the field loses focus
                  validationSchema && validationSchema.validateAt(field.name, { [field.name]: controller.value })
                    .then(() => {})
                    .catch(() => {});
                }}
              />
              {fieldStatusIcon(controller, field.name, errors)}
            </IonItem>
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        );
        break;

      case 'textarea':
        return (
          <>
            <Label name={field.name} label={field.label} errors={errors} />
            {checkIfFieldIsRequired(field.name)}
            <IonTextarea
              label={field.label}
              disabled={loading}
              labelPlacement="floating"
              {...commonProps}
            />
            {fieldStatusIcon(controller, field.name, errors)}
          </>
        );

      case 'select':
        return (
          <>
            <Label name={field.name} label={field.label} errors={errors} />
            {checkIfFieldIsRequired(field.name) && <>*</>}
            <IonSelect {...commonProps}
              interface="popover"
              disabled={loading}
            >
              {field.options && field.options.map(option => (
                <IonSelectOption key={option.value} value={option.value}>
                  {option.label}
                </IonSelectOption>
              ))}
            </IonSelect>
            {fieldStatusIcon(controller, field.name, errors)}
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        );

      case 'checkbox':
        
        let displayColor = 'medium';

        if (loadingField[field.name]) {
          return <IonSpinner name="lines" color={displayColor} />
        } else if (errors && errors[field.name]) {
          displayColor = 'danger';
        } else if (!controller.value) {
          displayColor = 'medium';
        } else if (controller.value) {
          displayColor = 'success';
        }
        
        return (
          <>
            <IonItem 
              onClick={() => commonProps.onIonChange({ detail: { checked: !controller.value } })}
              style={{paddingTop: '8px', paddingBottom: '8px'}}
              disabled={loading}
            >
              <IonLabel 
                style={{ display: 'flex', alignItems: 'start', width: '93%' }}
              >
                {field.label} {checkIfFieldIsRequired(field.name)}
              </IonLabel>
              <div style={{ display: 'flex', alignItems: 'end' }}
                className={(errors && errors[field.name] ? 'checkbox-color-border' : '')}>
                <IonCheckbox
                  {...commonProps}
                  className={'checkbox-' + displayColor}
                  style={{ width: '7%', marginRight: '2px' }}
                  label={field.label}
                  color={displayColor}
                  checked={Boolean(controller.value || field.defaultValue)}
                  disabled={loading}
                />
              </div>
            </IonItem>
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        );

      case 'date':
      case 'datetime':
        return (
          <>
            {field.label && (
              <IonLabel position='floating' 
                aria-label={field.label}>{field.label}
              </IonLabel>
            )}
            <IonDatetime
              {...commonProps}
              value={controller.value || field.defaultValue}
              disabled={loading}
            />
            {fieldStatusIcon(controller, field.name, errors)}
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        );

      case 'button':
      case 'submit':
        return (
          <Button
            expand
            style={field.style || { width: '100%' }}
            label={field.label}
            disabled={loading}
            onClick={field.onClick ? field.onClick : undefined}
            icon={field.icon}
            loading={loading}
            {...commonProps}
          />
        );

      case 'range':
        return (
          <>
            {field.label && <IonLabel position='floating' aria-label={field.label}>{field.label}</IonLabel>}
            <IonRange
              value={controller.value || field.defaultValue}
              min={field.min}
              max={field.max}
              {...commonProps}
            />
            {checkIfFieldIsRequired(field.name)}
            {fieldStatusIcon(controller, field.name, errors)}
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        );

      case 'toggle':
        return (
          <>
            <IonItem >
              <IonLabel>{field.label}</IonLabel>
              <IonToggle
                checked={controller.value || field.defaultValue}
                value={controller.value || field.defaultValue}
                {...commonProps}
              />
            </IonItem>
            {fieldStatusIcon(controller, field.name, errors)}
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        );

      case 'radio':
        return (
          <>
            <IonRadioGroup
              value={controller.value || field.defaultValue}
              {...commonProps}
            >
              {field.options && field.options.map((option, idx) => (
                <IonItem key={idx}>
                  <IonLabel>{option.label}</IonLabel>
                  <IonRadio slot="start" value={option.value} />
                </IonItem>
              ))}
            </IonRadioGroup>
            {fieldStatusIcon(controller, field.name, errors)}
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        );

      case 'skeleton':
        return (
          <IonItem >
            <Skeleton {...field} />
          </IonItem>
        );
      
      case 'hidden':
        return (
          <IonInput type="hidden" name={field.name} value={field.csrfToken}
            {...commonProps}
          ></IonInput>
        );
  
      case 'recaptcha':{
        return (
          <div style={{ margin: '4%', border: '2px solid #BF4F74' }}>
            <div className="captcha-container">
              <IonLabel>{field.label}</IonLabel>
            </div>
            {process.env.NODE_ENV === 'production' ? (
              <div>
                <ReCAPTCHA 
                  {...recaptchaProps}
                  sitekey={'asdfasdf'}
                  onChange={(value) => controller.onChange(value)}
                />
              </div>
            ) : (//TOXO: asdf must come from env file
            <>
              <div style={{ margin: '4%'}}>
                <>
                <div className="captcha-container">
                  <IonLabel className="captcha">{field.captcha}</IonLabel>
                </div>
                  <IonItem>
                    <IonInput
                      type='text'
                      label={'Write here the captcha text!' + (checkIfFieldIsRequired(field.name) ? ' *' : '')}
                      labelPlacement="floating"
                      value={controller.value}
                      disabled={loading}
                      aria-invalid={errors && errors[field.name ?? field.id ?? 'input'] ? 'true' : 'false'}
                      {...commonProps}
                      onBlur={() => { // Add onBlur to force validation when the field loses focus
                        validationSchema && validationSchema.validateAt(field.name, { [field.name]: controller.value })
                          .then(() => {})
                          .catch(() => {});
                      }}
                    />
                    {fieldStatusIcon(controller, field.name, errors)}
                  </IonItem>
                  <Error name={field.name} label={field.label} errors={errors} />
                </>
              </div>
            </>
            )}
          </div>
        );
      }
    }
  };

  // Effect to reset the loading state for the field
  useEffect(() => {
    setLoadingField((prevLoadingField) => ({
      ...prevLoadingField,
      [field.name]: false,
    }));
  }, [field]);

  return (
    <Controller
      control={control}
      name={field.name}
      defaultValue={field.defaultValue}
      render={({ field: controller }) => renderInput(controller, errors)}
    />
  );
});

export default Field;
