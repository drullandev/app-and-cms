import * as yup from 'yup';
import { FieldProps } from '../../components/Form/types';

/**
 * Builds a Yup validation schema based on the provided field properties.
 *
 * This function iterates through the given fields array and constructs a validation schema 
 * for each field that has a specified validation schema. The schema is returned as a Yup object schema.
 *
 * @param {FieldProps[]} fields - An array of field properties containing validation schema information.
 * @returns {yup.ObjectSchema} A Yup validation schema object.
 */
export const buildValidationSchema = (fields: FieldProps[]): yup.Schema => {
  // Construct the shape of the schema by mapping field properties to Yup schemas
  const shape = fields.reduce<Record<string, yup.AnySchema>>((acc, field) => {
    if (field.validationSchema) {
      acc[field.name] = field.validationSchema;
    }
    return acc;
  }, {});

  // Return the Yup object schema with the constructed shape
  return yup.object().shape(shape);
};

/**
 * Constructs initial values for the form fields based on the provided field properties.
 *
 * This function iterates through the given fields array and sets up initial values for each field. 
 * If a field has a default value, it is used; otherwise, an empty string is used as the default value.
 *
 * @param {FieldProps[]} fields - An array of field properties containing default value information.
 * @returns {Record<string, any>} An object representing the initial values for the form fields.
 */
export const buildInitialValues = (fields: FieldProps[]): Record<string, any> => {
  // Generate initial values for the form fields based on default values or empty strings
  return fields.reduce<Record<string, any>>((acc, field) => {
    acc[field.name] = field.defaultValue || '';
    return acc;
  }, {});
};
