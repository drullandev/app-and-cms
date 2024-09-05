import StorageManager, { StorageInterface } from "../managers/StorageManager";

const STORAGE_KEY = process.env.STORAGE_KEY || 'app';

/**
 * Creates and exports an instance of StorageManager.
 * This instance is configured to manage key-value storage operations.
 * 
 * @returns An instance of StorageManager configured for the application.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 1, 2024
 */

/**
 * Function to create an instance of CRMManager with optional authorization token.
 * 
 * @param key - Optional. The Bearer token to be used for authorization.
 * @returns An instance of CRMManager configured for CRM operations.
 */
const AppStorage = (key: string = STORAGE_KEY): StorageManager => {
  return StorageManager.getInstance(key);
};

export default AppStorage();
