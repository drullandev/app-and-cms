import StorageManager, { StorageManagerInterface } from "../classes/managers/StorageManager";

/**
 * Creates and exports an instance of StorageManager.
 * This instance is configured to manage key-value storage operations.
 * 
 * @returns An instance of StorageManager configured for the application.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 1, 2024
 */
export const Storage: StorageManagerInterface = StorageManager.getInstance();

export default Storage;
