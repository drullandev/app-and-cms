import React, { useState, forwardRef } from 'react'; // Importa forwardRef
import { Controller, DeepMap, FieldError } from 'react-hook-form';
import { FieldProps } from './types';
import Button from './Button'
import Error from './Error'
import Label from './Label'
import {
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonDatetime,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonToggle
} from '@ionic/react';

const Field: React.FC<{ field: FieldProps; control: any; errors: DeepMap<Record<string, any>, FieldError>, onFieldChange: (name: string, value: any) => void }> = forwardRef(({ field, control, errors, onFieldChange }, ref) => {

  const [inputValue, setInputValue] = useState(field.defaultValue || (field.type === 'number' ? 0 : ''));

  const renderInput = (controller: any, errors: DeepMap<Record<string, any>, FieldError>) => {

    const inputChange = (e: any) => {

      const value = (( field.type === 'checkbox' )
        ? ( e.detail.checked ?? false )
        : e.detail.value);

      controller.onChange(value);
      onFieldChange(field.name, value);
      setInputValue(value);
      
    };

    const commonProps = {
      ...controller,
      ref,
      onIonInput: (e:any)=> inputChange(e),
      onIonChange: (e:any)=> inputChange(e),
      value: controller.value || inputValue
    };

    const buttonProps = {
      ...controller,
      ref,
      onIonClick: (e:any) => {
        controller.onClick((e: any)=>{
          console.log(e)
        });
      }
    };

    const setLabel = (label: any, position ?: any, color ?: any, mode ?: any) => {
      return <IonLabel
        label-aria={label || ''}
        color={color || 'primary'}
        position={position || 'floating'}
      >{label}</IonLabel>
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
        return (
          <>
            <IonItem style={{ 'width': '100%' }}>
              <IonInput style={{ 'width': '100%' }}
                type={(field.type == 'email' ? 'text' : field.type)}
                label={field.label}
                labelPlacement="floating"
                aria-invalid={errors && errors[field.name] ? 'true' : 'false'}
                {...commonProps}
              ></IonInput>          
              {field.required && field.required === true && <IonLabel slot='end' position='stacked' color='primary'>*</IonLabel>}
            </IonItem>
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        );
      case 'textarea': // TODO: better style ;)
        return (
          <>
            {field.label && setLabel(field.label)}
            <Label name={field.name} label={field.label} errors={errors}/>
            <IonTextarea 
              label={field.label}
              labelPlacement="floating"
              {...commonProps}
            />
          </>
        );
      case 'select':
        return (
          <>
            <Label name={field.name} label={field.label} errors={errors}/>
            <IonSelect {...commonProps} interface="popover">
              {field.options && field.options.map(option => (
                <IonSelectOption key={option.value} value={option.value}>
                  {option.label}
                </IonSelectOption>
              ))}
            </IonSelect>
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        );
      case 'checkbox':
        return (
          <>
            <IonItem style={{ 'width': '100%' }}>
              <IonInput slot="start" label={field.label} {...commonProps} type={field.type} />
              <IonCheckbox
                slot="end"
                label={field.label}
                {...commonProps}
                checked={controller.value || field.defaultValue}>
              </IonCheckbox>
            </IonItem>
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        );
      case 'date':
      case 'datetime':
        return (
          <>
            {field.label && <IonLabel position='floating' aria-label={field.label}>{field.label}</IonLabel>}
            <IonDatetime {...commonProps} />
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        );
      case 'button':
        return (
          <Button expand label={field.label} {...buttonProps} />
        );
      case 'submit':
        return (
          <Button expand label={field.label} {...commonProps} />
        );
      case 'range':
        return (
          <>
            {field.label && <IonLabel position='floating' aria-label={field.label}>{field.label}</IonLabel>}
            <IonRange {...commonProps} min={field.min} max={field.max} />
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        );
      case 'toggle':
        return <IonToggle {...commonProps} checked={controller.value || false} />;
      case 'radio':
        return (
          <>
            {field.label && setLabel(field.label)}
            <IonRadioGroup {...commonProps}>
              {field.options && field.options.map(option => (
                <IonItem key={option.value}>
                  <IonLabel>{option.label}</IonLabel>
                  <IonRadio slot="start" value={option.value} />
                </IonItem>
              ))}
            </IonRadioGroup>
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        );
      default:
        return (
          <>
            <IonItem style={{ 'width': '100%' }}>
              <IonInput style={{ 'width': '100%' }}
                type={field.type}
                label={field.label}
                labelPlacement="floating"
                aria-invalid={errors && errors[field.name] ? 'true' : 'false'}
                {...commonProps}
              ></IonInput>
            </IonItem>
            <Error name={field.name} label={field.label} errors={errors} />
          </>
        );
    }
  };

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: controller }) => (<>
        {renderInput(controller, errors)}
      </>)}
    />
  );
});

export default Field;
