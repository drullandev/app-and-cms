import React, { useState, forwardRef, useEffect, useCallback } from 'react';
import { Controller, DeepMap, FieldError } from 'react-hook-form';
import { IonItem, IonInput, IonTextarea, IonSelect, IonSelectOption, IonCheckbox, IonDatetime, IonLabel, IonRadio, IonRadioGroup, IonRange, IonToggle, IonSkeletonText, IonIcon, IonSpinner, IonButton } from '@ionic/react';
import * as yup from 'yup';
import * as icon from 'ionicons/icons';
import { debounce } from 'lodash';

import DebugUtil from '../../../../classes/DebugUtil';

import { FieldProps } from '../types';

import Label from './Label';
import Skeleton from './Skeleton';
import Error from './Error';
import Button from './Button';

const Field = forwardRef<any, {
  field: FieldProps;
  control: any;
  errors: DeepMap<Record<string, any>, FieldError>;
  onFieldChange: (name: string, value: any) => void;
}>(({ field, control, errors, onFieldChange }, ref) => {

  const debug = DebugUtil.setDebug(false);

  const [loadingField, setLoadingField] = useState<{ [key: string]: boolean }>({});
  const [showSecret, setShowSecret] = useState(false);

  const buildValidationSchema = (rows: FieldProps[]) => {
    const shape = rows.reduce((acc: any, row: FieldProps) => {
      if (row.validationSchema) {
        acc[row.name] = row.validationSchema;
      }
      return acc;
    }, {});
    return yup.object().shape(shape);
  };

  const validationSchema = buildValidationSchema([field]);

  const debouncedHandleFieldChange = useCallback(
    debounce((value: any) => {
      onFieldChange(field.name, value);
    }, 700),
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

    }

    const commonProps = {
      ...controller,
      ref,
      onIonInput: (e: any) => inputChange(e),
      onIonChange: (e: any) => inputChange(e),
      value: controller.value || null
    };

    const fieldStatusIcon = (controller: any, fieldName: string, errors: any) => {

      let displayColor = 'medium';

      if (loadingField[fieldName]) {
        displayColor = 'medium';
      } else if (errors && errors[fieldName]) {
        displayColor = 'danger';
      } else if (!controller.value) {
        displayColor = 'medium';
      }

      const setIcon = (color?: string) => {

        return field.secret ? (
          <IonIcon color={color ?? displayColor}
            onClick={() => setShowSecret(!showSecret)}
            icon={showSecret ? icon.eyeOff : icon.eye}
          />
        ) : fieldName.includes('email') ? (
          <IonIcon icon={icon.at} color={color ?? displayColor} />
        ) : (
          <IonIcon icon={icon.checkmarkCircle} color={color ?? displayColor} />
        )

      }

      const cases = [
        {
          condition: loadingField[fieldName],
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
              return setIcon('success');
            } catch (error) {
              return setIcon('danger');
            }
          })()
        }
      ];

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
    }

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
                type={field.secret && showSecret ? 'text' : field.type}
                label={field.label + (checkIfFieldIsRequired(field.name) ? ' *' : '')}
                labelPlacement="floating"
                value={controller.value}
                aria-invalid={errors && errors[field.name ?? field.id ?? 'input'] ? 'true' : 'false'}
                {...commonProps}
              />
              {fieldStatusIcon(controller, field.name, errors)}
            </IonItem>
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        )

      case 'textarea':
        return (
          <>
            <Label name={field.name} label={field.label} errors={errors} />
            {checkIfFieldIsRequired(field.name)}
            <IonTextarea
              label={field.label}
              labelPlacement="floating"
              {...commonProps}
            />
            {fieldStatusIcon(controller, field.name, errors)}
          </>
        )

      case 'select':
        return (
          <>
            <Label name={field.name} label={field.label} errors={errors} />
            {checkIfFieldIsRequired(field.name) && <>*</>}
            <IonSelect {...commonProps} interface="popover">
              {field.options && field.options.map(option => (
                <IonSelectOption key={option.value} value={option.value}>
                  {option.label}
                </IonSelectOption>
              ))}
            </IonSelect>
            {fieldStatusIcon(controller, field.name, errors)}
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        )

      case 'checkbox': {

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
            <IonItem button onClick={() => commonProps.onIonChange({ detail: { checked: !controller.value } })}>
              <IonLabel style={{ display: 'flex', alignItems: 'start', width: '93%' }}>{field.label}</IonLabel>
              <div style={{ display: 'flex', alignItems: 'end' }}
                className={(errors && errors[field.name] ? 'checkbox-color-border' : '')}>
                <IonCheckbox
                  {...commonProps}
                  className={'checkbox-' + displayColor}
                  style={{ width: '7%', marginRight: '2px' }}
                  label={field.label}
                  color={displayColor}
                  checked={Boolean(controller.value || field.defaultValue)}
                />
              </div>
            </IonItem>
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        )
      }

      case 'date':
      case 'datetime':
        return (
          <>
            {field.label && <IonLabel position='floating' aria-label={field.label}>{field.label}</IonLabel>}
            <IonDatetime value={controller.value || field.defaultValue} {...commonProps} />
            {fieldStatusIcon(controller, field.name, errors)}
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        )

      case 'button':
      case 'submit':
        return (
          <IonItem style={field.style || { width: '100%' }}>
            <Button
              expand
              style={{ width: '100%' }}
              label={field.label}
              onClick={field.onClick ? field.onClick : undefined}
              {...commonProps}
            />
          </IonItem>
        )

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
        )

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
        )

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
        )

      case 'skeleton':
        return (
          <IonItem >
            <Skeleton {...field} />
          </IonItem>
        )
    }
  };

  useEffect(() => {
    setLoadingField((prevLoadingField) => ({
      ...prevLoadingField,
      [field.name]: false,
    }));
  }, [field.name]);

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
