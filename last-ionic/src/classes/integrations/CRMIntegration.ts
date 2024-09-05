import RestManager from '../managers/RestManager';

/**
 * Interface defining the contract for CRM operations.
 * This interface ensures that the CRMManager can perform both synchronous and asynchronous REST API calls,
 * as well as CRM-specific operations.
 */
export interface CrmManagerInterface extends RestManager {
  validateUser(userId: string): Promise<boolean>;
  getUserData(userId: string): Promise<any>;
  updateUserData(userId: string, data: any): Promise<any>;
}

/**
 * The base URL for CRM API requests.
 * - Purpose: This URL is specifically configured for use with a CRM system in an Ionic application.
 * It is set using an environment variable, with a fallback to a default local URL.
 */
const CRM_API_BASE_URL = process.env.CRM_API_URL || 'http://localhost:1337/';

/**
 * CRMManager class extends RestManager to include operations specific to the CRM system.
 * It includes methods for validating users, retrieving user data, and updating user data.
 * 
 * This class leverages the existing functionality of RestManager for generic REST API calls,
 * while adding CRM-specific logic.
 * 
 * @author David Rullán
 * @date September 5, 2024
 */
class CRMManager extends RestManager implements CrmManagerInterface {

  /**
   * Validates if the user exists in the CRM system by making a request to the CRM's user validation endpoint.
   * 
   * @param userId - The ID of the user to validate.
   * @returns A promise resolving to a boolean indicating whether the user is valid in the CRM.
   */
  public async validateUser(userId: string): Promise<boolean> {
    try {
      const response = await this.get(`/crm/validate/${userId}`);
      return response.data.isValid;
    } catch (error) {
      console.error(`Error validating user ${userId} in CRM:`, error);
      return false;
    }
  }

  /**
   * Retrieves user data from the CRM system for a given user ID.
   * 
   * @param userId - The ID of the user whose data needs to be fetched.
   * @returns A promise resolving to the user data from the CRM.
   */
  public async getUserData(userId: string): Promise<any> {
    try {
      const response = await this.get(`/crm/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data for user ${userId} in CRM:`, error);
      throw error;
    }
  }

  /**
   * Updates user data in the CRM system for a given user ID.
   * 
   * @param userId - The ID of the user whose data needs to be updated.
   * @param data - The new data to update for the user.
   * @returns A promise resolving to the updated user data from the CRM.
   */
  public async updateUserData(userId: string, data: any): Promise<any> {
    try {
      const response = await this.put(`/crm/user/${userId}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating data for user ${userId} in CRM:`, error);
      throw error;
    }
  }
  
}

/**
 * Function to create an instance of CRMManager with optional authorization token.
 * 
 * @param token - Optional. The Bearer token to be used for authorization.
 * @returns An instance of CRMManager configured for CRM operations.
 */
/**
 * Function to create an instance of CRMManager with optional authorization token.
 * 
 * @param token - Optional. The Bearer token to be used for authorization.
 * @returns An instance of CRMManager configured for CRM operations.
 */
export const AppCrm = (token?: string): CRMManager => {
  return token
    ? new CRMManager(CRM_API_BASE_URL, { 'Authorization': `Bearer ${token}` })
    : new CRMManager(CRM_API_BASE_URL);
};

export default AppCrm;