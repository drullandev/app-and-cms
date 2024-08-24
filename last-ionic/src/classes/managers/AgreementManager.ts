import axios from "axios";
import Logger from "../utils/LoggerUtils";
import DOMPurify from "dompurify";

export class AgreementManager {

  private static instance: AgreementManager | null = null; // Singleton instance

  /**
   * Gets the singleton instance of Agreement.
   *
   * @returns The singleton instance of AgreementManager.
   * Get the singleton instance of CheckTrustManager.
   * 
   * @returns The singleton instance of CheckTrustManager.
   */
  public static getInstance(): AgreementManager {
    if (this.instance === null) {
      /**
       * Creates a new instance of AgreementManager.
       *
       * This is a singleton class, so we should not create multiple instances.
       */
      this.instance = new AgreementManager();
    }
    return this.instance;
  }

  /**
   * Processes agreement data by cleaning it and returning the cleaned form data.
   * @param data - The form data to be processed.
   * @returns The cleaned form data.
   */
  public checkAgreement(data: any): any {
    // TODO: Implement actual CRM validation logic here.
    const returnData = this.cleanFormData(data);
    return returnData.cleanData;
  }

  /**
   * Cleans form data by removing the "agreement" field and returning the rest.
   * @param formData - The form data that includes an "agreement" field.
   * @returns An object containing cleaned data without the "agreement" field and the agreement status.
   */
  public cleanFormData(formData: any) {
    // Destructure the form data to separate "agreement" from the rest of the fields
    const { agreement, ...cleanData } = formData;

    // Store the agreement value in a constant
    const agreementApproval = agreement;

    // Return the cleaned data and the agreement approval status
    return { cleanData, agreementApproval };
  }

  /**
   * Generates a random boolean value.
   * @returns A boolean that is true 50% of the time.
   */
  public getRandomBoolean() {
    return Math.random() >= 0.5;
  }

  /**
   * Checks if the user exists in the CRM system.
   * In production, this checks against the actual CRM.
   * In development, it returns a random boolean for testing purposes.
   * @param username - The username to check in the CRM.
   * @returns A promise that resolves to true if the user exists, otherwise false.
   */
  public checkUserInCRM = async (username: any) => {
    try {
      if (process.env.NODE_ENV === 'production') {
        const response = await axios.get(`/crm/check-user?username=${username}`);
        return response.data.exists;
      }
      // In non-production environments, return a random boolean
      return this.getRandomBoolean();
    } catch (error) {
      // Log the error if the CRM check fails
      Logger.error(' • Error checking user in CRM:', error);
      return false;
    }
  };

  /**
   * Registers a new user in the CRM system.
   * In production, this sends the data to the actual CRM.
   * In development, it returns a random boolean for testing purposes.
   * @param userData - The user data to register in the CRM.
   * @returns A promise that resolves to true if registration is successful, otherwise false.
   */
  public registerUserInCRM = async (userData: any) => {
    try {
      if (process.env.NODE_ENV === 'production') {
        await axios.post('/crm/register-user', userData);
        Logger.log(' • User registered successfully');
      }
      // In non-production environments, return a random boolean
      return this.getRandomBoolean();
    } catch (error) {
      // Log the error if the registration fails
      Logger.error(' • Error registering user in CRM:', error);
    }
  };

}

// Create and export a singleton instance of Agreement
const AgreementInstance = new AgreementManager();

export default AgreementInstance;
