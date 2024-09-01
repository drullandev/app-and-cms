import axios from "axios";
import LoggerClass, { initializeLogger } from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

// Define AgreementData and CleanedData interfaces
interface AgreementData {
  id: number;
  agreement: boolean;
  [key: string]: any;
}

interface CleanedData {
  cleanData: Record<string, any>;
  agreementApproval: boolean;
}

// Define AgreementManagerInterface
export interface AgreementManagerInterface {
  processAgreement(data: AgreementData): CleanedData;
  cleanFormData(formData: AgreementData): CleanedData;
  getRandomBoolean(): boolean;
  checkUserExists(userId: string): boolean;
  getCRMValidation(userId: string): Promise<boolean>;
}

/**
 * AgreementManager handles the logic related to user agreements, such as processing
 * and validating agreement data. This class is implemented as a singleton to ensure
 * that only one instance exists throughout the application lifecycle.
 *
 * @example
 * const agreementManager = AgreementManager.getInstance();
 * const { cleanData, agreement } = agreementManager.processAgreement(formData);
 *
 * @author David Rullán - https://github.com/drullandev
 * @date Agoust 31, 2024
 */
export class AgreementManager implements AgreementManagerInterface {
  private static instance: AgreementManager | null = null; // Singleton instance
  private logger: LoggerClass;
  private debug: boolean;

  private constructor() {
    this.debug = DebugUtils.setDebug(false); // Establece el modo debug según la configuración
    this.logger = initializeLogger(this.constructor.name, this.debug, 100);
    if (this.debug) {
      this.logger.info(this.constructor.name + " initialized!!");
    }
  }

  /**
   * Gets the singleton instance of AgreementManager.
   * If no instance exists, it creates one.
   *
   * @returns The singleton instance of AgreementManager.
   */
  public static getInstance(): AgreementManager {
    if (this.instance === null) {
      this.instance = new AgreementManager();
    }
    return this.instance;
  }

  /**
   * Processes agreement data by cleaning it and returning the cleaned form data
   * along with the agreement object.
   *
   * @param data - The form data to be processed.
   * @returns An object containing the cleaned form data and the agreement object.
   */
  public processAgreement(data: AgreementData): CleanedData {
    const returnData = this.cleanFormData(data);
    this.logger.info("Processing agreement", {
      cleanData: returnData.cleanData,
      agreement: data.agreement,
    });
    return {
      cleanData: returnData.cleanData,
      agreementApproval: data.agreement,
    };
  }

  /**
   * Cleans form data by removing the "agreement" field and returning the rest.
   *
   * @param formData - The form data that includes an "agreement" field.
   * @returns An object containing cleaned data without the "agreement" field and the agreement status.
   */
  public cleanFormData(formData: AgreementData): CleanedData {
    const { agreement, ...cleanData } = formData;
    const agreementApproval = agreement;
    this.logger.debug("Cleaned form data", cleanData);
    return { cleanData, agreementApproval };
  }

  /**
   * Generates a random boolean value.
   * This can be useful for simulating random outcomes or for testing purposes.
   *
   * @returns A boolean that is true 50% of the time.
   */
  public getRandomBoolean(): boolean {
    const randomBoolean = Math.random() >= 0.5;
    this.logger.debug("Generated random boolean", randomBoolean);
    return randomBoolean;
  }

  /**
   * Placeholder method for checking if the user exists in the CRM system.
   * The implementation should be added as per the requirements.
   *
   * @param userId - The ID of the user to check.
   * @returns A boolean indicating whether the user exists.
   */
  public checkUserExists(userId: string): boolean {
    this.logger.log("Checking if user exists in CRM:", userId);
    return this.getRandomBoolean(); // Temporary implementation
  }

  /**
   * Retrieves CRM validation information for a given user ID.
   *
   * @param userId - The ID of the user to validate.
   * @returns A promise that resolves with the validation status.
   */
  public async getCRMValidation(userId: string): Promise<boolean> {
    try {
      const response = await axios.get(`/crm/validate/${userId}`);
      this.logger.log("CRM validation response:", response.data);
      return response.data.isValid;
    } catch (error) {
      this.logger.error("Error fetching CRM validation:", error);
      return false;
    }
  }
}

export default AgreementManager;
