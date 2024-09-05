/**
 * FormUtils provides a collection of utility methods for handling and processing form data.
 * These methods can be used throughout the application wherever form data needs to be manipulated.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
 */

interface AgreementData {
  id: number;
  agreement: boolean;
  [key: string]: any;
}

interface CleanedData {
  cleanData: Record<string, any>;
  agreementApproval: boolean;
}

/**
 * 
 * @author David Rullán
 * @date September 3, 2024
 */
class FormUtils {
  private static instance: FormUtils | null = null;

  /**
   * Private constructor to prevent direct instantiation.
   */
  private constructor() {}

  /**
   * Provides access to the singleton instance of the FormUtils class.
   * If an instance already exists, it returns that instance; otherwise, it creates a new one.
   *
   * @returns The singleton instance of FormUtils.
   */
  public static getInstance(): FormUtils {
    if (this.instance === null) {
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

  // Other form utility methods can be added here in the future
}

export default FormUtils.getInstance();