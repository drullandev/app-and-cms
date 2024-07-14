import * as yup from 'yup';
import { FieldProps } from '../types';

export const buildValidationSchema = (fields: FieldProps[]) => {
  const shape = fields.reduce((acc: any, row: FieldProps) => {
    if (row.validationSchema) {
      acc[row.name] = row.validationSchema;
    }
    return acc;
  }, {});
  return yup.object().shape(shape);
};

export const buildInitialValues = (fields: FieldProps[]) => {
  return fields.reduce((acc: any, field: FieldProps) => {
    acc[field.name] = field.defaultValue || '';
    return acc;
  }, {});
};
