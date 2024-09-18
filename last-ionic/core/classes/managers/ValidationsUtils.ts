import * as yup from 'yup';
import { FieldProps } from '../../components/main/Form/types';
import LoggerUtils from '../utils/LoggerUtils';
import DebugUtils from '../utils/DebugUtils';

/**
 * Extends FieldProps to ensure each field has a defaultValue and validationSchema.
 * The validationSchema is of type yup.Schema<any> for compatibility with Yup validation types.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
 */
interface FieldPropsWithValidation extends FieldProps {
  defaultValue: any;
  validationSchema: yup.Schema<any>;
}

/**
 * ValidationUtils is a utility class responsible for constructing Yup validation schemas 
 * and initial values for form fields based on the provided field properties.
 * 
 * The class ensures that each field is validated according to its defined schema, 
 * and initial values are assigned based on either a default value or a fallback.
 * 
 * This utility is especially useful for dynamically generated forms where field 
 * configurations are passed in and validation/initial values need to be constructed programmatically.
 * 
 * @example
 * const ValidationUtils = new ValidationUtils(fields);
 * const schema = ValidationUtils.buildValidationSchema();
 * const initialValues = ValidationUtils.buildInitialValues();
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
 */
class ValidationUtils {
  private fields: FieldProps[];
  private logger: LoggerUtils; // Logger instance
  private debug: boolean = false; // Debug mode flag
  
  /**
   * Constructor to initialize the ValidationUtils with the given form fields.
   * 
   * @param {FieldProps[]} fields - An array of field properties that define the form's fields.
   */
  constructor(fields: FieldProps[], debug?: boolean) {
    this.fields = fields;
    this.debug = DebugUtils.setDebug(debug ?? this.debug);
    this.logger = LoggerUtils.getInstance( this.debug, this.constructor.name);
  }

  /**
   * Validates that the field has both a defaultValue and a validationSchema.
   * This method ensures that only fields with proper validation configurations 
   * are included when building the schema and initial values.
   *
   * @param {FieldProps} field - The field to validate.
   * @returns {field is FieldPropsWithValidation} True if the field has both defaultValue and validationSchema.
   */
  private isValidField(field: FieldProps): field is FieldPropsWithValidation {
    return field.defaultValue !== undefined && field.validationSchema !== undefined;
  }

  /**
   * Builds a Yup validation schema based on the provided field properties.
   * 
   * It checks each field to ensure it has a valid validation schema and only includes those 
   * that meet the requirements. If a field is missing a validation schema, a warning is logged 
   * to the this.logger.
   *
   * @returns {yup.ObjectSchema<Record<string, any>>} A Yup object schema that can be used for form validation.
   */
  public buildValidationSchema = (): yup.ObjectSchema<any> => {
    const shape = this.fields.reduce((acc, field) => {
      if (this.isValidField(field)) {
        acc[field.name] = field.validationSchema;
      } else {
        this.logger.warn(`Field "${field.name}" is missing validationSchema.`);
      }
      return acc;
    }, {} as Record<string, yup.AnySchema>);

    return yup.object().shape(shape);
  }

  /**
   * Constructs initial values for the form fields based on the provided field properties.
   * 
   * If a field does not have a defaultValue, it is assigned an empty string by default.
   * For fields without a validation schema, they are still assigned initial values, 
   * but a warning is logged if they are missing a defaultValue.
   *
   * @returns {Record<string, any>} An object where the keys are field names and the values are the initial values for the form.
   */
  public buildInitialValues = (): Record<string, any> => {
    return this.fields.reduce<Record<string, any>>((acc, field) => {
      if (this.isValidField(field)) {
        acc[field.name] = field.defaultValue;
      } else {
        acc[field.name] = ''; // Assign empty string if defaultValue is missing
        this.logger.warn(`Field "${field.name}" is missing defaultValue. Assigning empty string as default.`);
      }
      return acc;
    }, {});
  };
}

export default ValidationUtils;