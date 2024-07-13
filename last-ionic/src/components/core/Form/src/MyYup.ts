import * as yup from 'yup';
import { FieldProps } from '../types';

export const buildValidationSchema = (rows: FieldProps[]) => {
  const shape = rows.reduce((acc: any, row: FieldProps) => {
    if (row.validationSchema) {
      acc[row.name] = row.validationSchema;
    }
    return acc;
  }, {});
  return yup.object().shape(shape);
};

export const buildInitialValues = (rows: FieldProps[]) => {
  return rows.reduce((acc: any, field: FieldProps) => {
    acc[field.name] = field.defaultValue || '';
    return acc;
  }, {});
};
