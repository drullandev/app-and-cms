import React, { useState, forwardRef, useEffect, useCallback } from 'react';
import { Controller, DeepMap, FieldError } from 'react-hook-form';
import { IonItem, IonInput, IonTextarea, IonSelect, IonSelectOption, IonCheckbox, IonDatetime, IonLabel, IonRadio, IonRadioGroup, IonRange, IonToggle, IonSkeletonText, IonIcon, IonSpinner } from '@ionic/react';
import * as yup from 'yup';
import { debounce } from 'lodash';
import { FieldProps } from './types';
import Button from './Button';
import Error from './Error';
import Label from './Label';
import { closeCircle, checkmarkCircle, alertCircle, lockClosed, at } from 'ionicons/icons';
import * as icon from 'ionicons/icons';
import DebugUtil from '../../../classes/DebugUtil';
import Skeleton from './Skeleton';

const Field: React.FC<{
  field: FieldProps; 
  control: any; 
  errors: DeepMap<Record<string, any>, FieldError>;
  onFieldChange: (name: string, value: any) => void;
}> = forwardRef(({ field, control, errors, onFieldChange }, ref) => {
  
  const debug = DebugUtil.setDebug(true);

  const [loadingField, setLoadingField] = useState<{ [key: string]: boolean }>({});

  const buildValidationSchema = (rows: FieldProps[]) => {
    const shape = rows.reduce((acc: any, row: FieldProps) => {
      if (row.validationSchema) {
        acc[row.name] = row.validationSchema;
      }
      return acc;
    }, {});
    return yup.object().shape(shape);
  };

  const validationSchema = buildValidationSchema([field])

  const debouncedHandleFieldChange = useCallback(
    debounce((value: any) => {
      onFieldChange(field.name, value);
    }, 500),
    [field.name, onFieldChange]
  );

  const renderInput = (controller: any, errors: DeepMap<Record<string, any>, FieldError>) => {
    
    const inputChange = (e: any) => {
      if (field.type === 'button' || field.type === 'submit') return;

      const value = (field.type === 'checkbox') ? (e.detail.checked ?? false) : e.detail.value;

      if (field.name) {
        controller.onChange(value);
        debouncedHandleFieldChange(value);
      }
    };

    const commonProps = {
      ...controller,
      ref,
      onIonInput: (e: any) => inputChange(e),
      onIonChange: (e: any) => inputChange(e),
      value: controller.value || ''
    };

    const fieldStatusIcon = (value: any, fieldName: string, errors: any) => {

      const [ fieldIcon, setFieldIcon ] = useState();
      const [ fieldIconColor, setFieldIconColor ] = useState();

      const cases = [
        // Loading state
        {
          condition: loadingField[fieldName],
          icon: <IonSpinner name="lines" color="medium" />
        },
        // Error state
        {
          condition: errors && errors[fieldName],
          icon: <IonIcon icon={icon.closeCircle} color="danger" />
        },
        // Initial state based on field name
        {
          condition: ! value,
          icon: fieldName.includes('password') ? (
            <IonIcon icon={icon.eyeOff} color="medium" />
          ) : fieldName.includes('email') ? (
            <IonIcon icon={icon.at} color="medium" />
          ) : (
            <IonIcon icon={icon.checkmarkCircle} color="medium" />
          )
        },
        // Success state
        {
          condition: true, // Always true as fallback for success state
          icon: (() => {
            try {
              validationSchema.validateSyncAt(fieldName, { [fieldName]: value });
              return <IonIcon icon={icon.checkmarkCircle} color="success" />;
            } catch (error) {
              return <IonIcon icon={icon.alertCircle} color="warning" />;
            }
          })()
        }
      ];

      // Find the first matching case and return its icon
      const matchingCase = cases.find(c => c.condition);
      return matchingCase ? matchingCase.icon : null;
    };

    const checkIfFieldIsRequired = (fieldName: string) => {
      try {
        validationSchema.validateSyncAt(fieldName, { [fieldName]: 'test' });
        return true;
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
        return  <>
            <IonItem>
              <IonInput
                type={field.type === 'email' ? 'text' : field.type}
                label={field.label}
                labelPlacement="floating"
                value={controller.value}
                aria-invalid={errors && errors[field.name ?? field.id ?? 'input'] ? 'true' : 'false'}
                {...commonProps}
              />
              {fieldStatusIcon(controller.value, field.name, errors)}
              {checkIfFieldIsRequired(field.name)}
            </IonItem>
            <Error name={field.name} label={field.label} errors={errors} />
          </>
      case 'textarea':
        return  <>
            <Label name={field.name} label={field.label} errors={errors} />
            {checkIfFieldIsRequired(field.name)}
            <IonTextarea
              label={field.label}
              labelPlacement="floating"
              {...commonProps}
            />
            {fieldStatusIcon(controller.value, field.name, errors)}
          </>
        
      case 'select':
        return  <>
            <Label name={field.name} label={field.label} errors={errors} />
            {checkIfFieldIsRequired(field.name)}
            <IonSelect {...commonProps} interface="popover">
              {field.options && field.options.map(option => (
                <IonSelectOption key={option.value} value={option.value}>
                  {option.label}
                </IonSelectOption>
              ))}
            </IonSelect>
            {fieldStatusIcon(controller.value, field.name, errors)}
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        ;
      case 'checkbox':
        return  <>
            <IonItem >
              <IonLabel style={{ display: 'flex', alignItems: 'start',  width: '93%' }}>{field.label}</IonLabel>
              <div style={{  display: 'flex', alignItems: 'end' }} className={(errors && errors[field.name] ? 'checkbox-color-border' : '')}>
                <IonCheckbox
                  {...commonProps}
                  className={(errors && errors[field.name] ? 'checkbox-red' : '')}
                  style={{ width: '7%' }}
                  label={field.label}
                  checked={controller.value || field.defaultValue}
                />    
              </div>
            </IonItem>
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        ;
      case 'date':
      case 'datetime'://TODO: Mejorar y mucho
        return  <>
            {field.label && <IonLabel position='floating' aria-label={field.label}>{field.label}</IonLabel>}
            <IonDatetime value={controller.value || field.defaultValue} {...commonProps} />
            {fieldStatusIcon(controller.value, field.name, errors)}
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        
      case 'button':
        case 'submit':
          return (<IonItem style={{ width: '100%'}}>
            <Button  style={{ width: '100%'}}
              expand
              label={field.label}
              {...commonProps}
              onClick={field.onClick ? field.onClick : undefined}
            />
          </IonItem>
          );
      case 'range'://TODO: Mejorar y mucho
        return  <>
            {field.label && <IonLabel position='floating' aria-label={field.label}>{field.label}</IonLabel>}
            <IonRange value={controller.value || field.defaultValue} {...commonProps}  min={field.min} max={field.max} />
            {checkIfFieldIsRequired(field.name)}
            {fieldStatusIcon(controller.value, field.name, errors)}
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        
      case 'toggle'://TODO: Mejorar y mucho
        return  <>
            {field.label && <IonLabel position='floating' aria-label={field.label}>{field.label}</IonLabel>}
            {checkIfFieldIsRequired(field.name)}
            <IonToggle {...commonProps} checked={controller.value || false} />
          </>
        
      case 'radio'://TODO: Mejorar y mucho
        return  <>
            {field.label && <IonLabel position='floating' aria-label={field.label}>{field.label}</IonLabel>}
            {checkIfFieldIsRequired(field.name)}
            <IonRadioGroup {...commonProps}>
              {field.options && field.options.map(option => (
                <IonItem key={option.value}>
                  <IonLabel>{option.label}</IonLabel>
                  <IonRadio slot="start" value={option.value} />
                  {fieldStatusIcon(controller.value, field.name, errors)}
                </IonItem>
              ))}
            </IonRadioGroup>
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        
      case 'pickers':
        return <></>
    }
  };

  useEffect(() => {
    // Simula una carga inicial, por ejemplo, para cargar datos o cualquier otra cosa
    const timer = setTimeout(() => {
      setLoadingField(prevLoading => ({
        ...prevLoading,
        [field.name]: false
      }));
    }, 500); // Cambia esto según sea necesario

    return () => clearTimeout(timer);

  }, [field.name]);

  return loadingField[field.name] 
    ? <Skeleton style={{...field.style}}/>
    : <Controller
        name={field.name}
        control={control}
        render={({ field: controller }) => renderInput(controller, errors)}
      />

});

export default Field;