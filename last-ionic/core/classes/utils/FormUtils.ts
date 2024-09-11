interface AgreementData {
  id: number;
  agreement: boolean;
  [key: string]: any;
}

interface CleanedData {
  cleanData: Record<string, any>;
  agreementApproval: boolean;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

type ValidationRule = (value: any) => boolean;

/**
 * FormUtils provides a collection of utility methods for handling and processing form data.
 * These methods can be used throughout the application wherever form data needs to be manipulated.
 * This class includes features like form data validation, normalization, serialization, dynamic field management, 
 * and error handling.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 7, 2024
 */
class FormUtils {
  private static instance: FormUtils | null = null;

  /**
   * Provides access to the singleton instance of the FormUtils class.
   * If an instance already exists, it returns that instance; otherwise, it creates a new one.
   *
   * @returns The singleton instance of FormUtils.
   */
  public static getInstance(): FormUtils {
    if (!this.instance) {
      this.instance = new FormUtils();
    }
    return this.instance;
  }

  /**
   * Cleans form data by removing the "agreement" field and returning the rest.
   * This method is useful for processing user agreements in forms.
   *
   * @param formData - The form data that includes an "agreement" field.
   * @returns An object containing cleaned data without the "agreement" field and the agreement status.
   */
  public cleanForm(formData: AgreementData): CleanedData {
    const { agreement, ...cleanData } = formData;
    const agreementApproval = agreement;
    return { cleanData, agreementApproval };
  }

  /**
   * Normalizes form data by trimming white spaces and optionally converting values.
   * This method helps clean up inputs by removing unnecessary white spaces or invalid characters.
   *
   * @param formData - The form data to normalize.
   * @returns Normalized form data with trimmed strings.
   */
  public normalizeData(formData: Record<string, any>): Record<string, any> {
    const normalizedData: Record<string, any> = {};
    for (const key in formData) {
      if (typeof formData[key] === 'string') {
        normalizedData[key] = formData[key].trim();
      } else {
        normalizedData[key] = formData[key];
      }
    }
    return normalizedData;
  }

  /**
   * Validates form data based on a set of rules. Each rule is a function that returns true if valid.
   *
   * @param formData - The form data to validate.
   * @param validationRules - An object mapping field names to validation rules.
   * @returns An object containing a validity flag and any validation errors.
   */
  public validateForm(
    formData: Record<string, any>, 
    validationRules: Record<string, ValidationRule[]>
  ): ValidationResult {
    const errors: Record<string, string> = {};
    let isValid = true;

    for (const field in validationRules) {
      const value = formData[field];
      const rules = validationRules[field];

      for (const rule of rules) {
        if (!rule(value)) {
          errors[field] = `Invalid value for ${field}`;
          isValid = false;
          break;
        }
      }
    }

    return { isValid, errors };
  }

  /**
   * Converts form data to a specified type. Useful for converting form inputs like strings to numbers or dates.
   *
   * @param formData - The form data to convert.
   * @param typeMap - An object specifying the expected type for each field.
   * @returns Form data with converted types.
   */
  public convertDataTypes(
    formData: Record<string, any>, 
    typeMap: Record<string, 'string' | 'number' | 'boolean' | 'date'>
  ): Record<string, any> {
    const convertedData: Record<string, any> = {};

    for (const field in formData) {
      const value = formData[field];
      const targetType = typeMap[field];

      switch (targetType) {
        case 'number':
          convertedData[field] = parseFloat(value);
          break;
        case 'boolean':
          convertedData[field] = Boolean(value);
          break;
        case 'date':
          convertedData[field] = new Date(value);
          break;
        default:
          convertedData[field] = String(value);
      }
    }

    return convertedData;
  }

  /**
   * Handles form errors by mapping them to user-friendly messages.
   *
   * @param errors - An object containing the form errors.
   * @returns A mapped object with user-friendly error messages.
   */
  public handleFormErrors(errors: Record<string, string>): Record<string, string> {
    const friendlyErrors: Record<string, string> = {};

    for (const field in errors) {
      friendlyErrors[field] = `Please provide a valid ${field}`;
    }

    return friendlyErrors;
  }

  /**
   * Serializes form data into a JSON string.
   * This method is useful when sending form data to a backend or saving it to local storage.
   *
   * @param formData - The form data to serialize.
   * @returns A JSON string representing the form data.
   */
  public serializeForm(formData: Record<string, any>): string {
    return JSON.stringify(formData);
  }

  /**
   * Deserializes a JSON string into form data.
   * This method is useful when restoring form data from storage or parsing backend responses.
   *
   * @param jsonData - The JSON string to deserialize.
   * @returns The deserialized form data.
   */
  public deserializeForm(jsonData: string): Record<string, any> {
    try {
      return JSON.parse(jsonData);
    } catch (error) {
      throw new Error('Failed to deserialize form data. Invalid JSON.');
    }
  }

  /**
   * Dynamically adds a new field to the form data.
   * This is useful for forms where fields can be added based on user interactions (e.g., adding a new address).
   *
   * @param formData - The current form data.
   * @param fieldName - The name of the field to add.
   * @param value - The value for the new field.
   * @returns The updated form data with the new field.
   */
  public addField(formData: Record<string, any>, fieldName: string, value: any): Record<string, any> {
    return { ...formData, [fieldName]: value };
  }

  /**
   * Conditionally validates form fields based on other field values.
   * This allows for dynamic form validation where certain fields are only required if other conditions are met.
   *
   * @param formData - The form data to validate.
   * @param condition - A function that returns true if the validation should be applied.
   * @param fieldName - The name of the field to validate.
   * @param validationRule - The validation rule to apply.
   * @returns An object containing validity and potential errors.
   */
  public conditionalValidateField(
    formData: Record<string, any>, 
    condition: (formData: Record<string, any>) => boolean,
    fieldName: string, 
    validationRule: ValidationRule
  ): ValidationResult {
    if (condition(formData)) {
      const value = formData[fieldName];
      const isValid = validationRule(value);
      return {
        isValid,
        errors: isValid ? {} : { [fieldName]: `Invalid value for ${fieldName}` }
      };
    }
    return { isValid: true, errors: {} };
  }
}

export default FormUtils.getInstance();
