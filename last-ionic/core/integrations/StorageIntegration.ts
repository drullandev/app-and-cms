import StorageManager, { IStorageManager } from "../classes/managers/StorageManager";
import { storageKey } from '../app/config/env'

/**
 * Function to create an instance of StorageManager with the storage key.
 * 
 * @returns An instance of StorageManager configured for storage operations.
 */
const useAppStorage = (): IStorageManager => {
  return StorageManager.getInstance(storageKey);
};

export default useAppStorage;
