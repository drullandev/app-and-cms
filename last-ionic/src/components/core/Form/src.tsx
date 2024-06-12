import * as yup from 'yup'
import * as type from './types'

export const buildValidationSchema = (rows: type.FieldProps[]) => {
  const shape = rows.reduce((acc: any, row: type.FieldProps) => {
    if (row.validationSchema) {
      acc[row.name] = row.validationSchema;
    }
    return acc;
  }, {});
  return yup.object().shape(shape);
};

export const buildInitialValues = (rows: type.FieldProps[]) => {
  const initialValues: any = {};
  rows.forEach(field => {
    initialValues[field.name] = field.defaultValue || '';
  });
  return initialValues;
};

export const validateFormData = async (data: any, schema: any) => {

  try {

    // Valida los datos del formulario con el objeto de esquemas de validación
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };

  } catch (errors: any) {
    const validationErrors: { [key: string]: string } = {};
    errors.inner.forEach((error: any) => {
      validationErrors[error.path] = error.message;
    });
    return { isValid: false, errors: validationErrors };
  }

};