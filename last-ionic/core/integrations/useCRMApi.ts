import RestManager from "../classes/managers/RestManager";
import { storageKey } from '../app/config/env';

/**
 * Interface defining the contract for CRM operations.
 * This interface ensures that the useCRMApi can perform both synchronous and asynchronous REST API calls,
 * as well as CRM-specific operations.
 */
export interface ICRMManager {
  validateUser(userId: string): Promise<boolean>;
  getUserData(userId: string): Promise<any>;
  updateUserData(userId: string, data: any): Promise<any>;
}

/**
 * useCRMApi class depends on an existing RestManager instance.
 * It includes methods for validating users, retrieving user data, and updating user data.
 *
 * This class leverages the existing functionality of RestManager for generic REST API calls,
 * while adding CRM-specific logic.
 *
 * @author David Rullán
 * @date October 4, 2024
 */
class useCRMApi implements ICRMManager {
  private restManager: RestManager;

  /**
   * Constructor to initialize the CRM API with an existing RestManager instance.
   * @param restManager - An instance of RestManager to handle API calls.
   */
  constructor(restManager: RestManager) {
    this.restManager = restManager;
  }

  /**
   * Validates if the user exists in the CRM system by making a request to the CRM's user validation endpoint.
   *
   * @param userId - The ID of the user to validate.
   * @returns A promise resolving to a boolean indicating whether the user is valid in the CRM.
   */
  public async validateUser(userId: string): Promise<boolean> {
    try {
      const response = await this.restManager.get<{data:{isValid: boolean}} >(`/crm/validate/${userId}`);
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
      const response = await this.restManager.get<any>(`/crm/user/${userId}`);
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
      const response = await this.restManager.put<any>(`/crm/user/${userId}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating data for user ${userId} in CRM:`, error);
      throw error;
    }
  }
}

export default useCRMApi;
