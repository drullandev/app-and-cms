import StorageManager from "../classes/managers/StorageManager";

/**
 * Function to create an instance of StorageManager with the storage key.
 * 
 * @returns An instance of StorageManager configured for storage operations.
 */
const useAppStorage = (): StorageManager => {
  return StorageManager.getInstance(process.env.REACT_APP_STORAGE_KEY);
};

export default useAppStorage;
