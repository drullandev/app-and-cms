import { Preferences } from "@capacitor/preferences";
import LoggerUtils from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

/**
 * IStorageManager defines the contract for StorageManager operations.
 * This interface ensures that the StorageManager can handle key-value storage operations consistently.
 */
export interface IStorageManager {
  set(key: string, value: any): Promise<void>;
  get(key: string): Promise<any>;
  remove(key: string): Promise<void>;
}

/**
 * StorageManager is a singleton class designed to handle key-value storage operations.
 * It provides methods to set, get, and remove values from storage, as well as utilities
 * for parsing and stringifying data.
 * The storage can be instantiated with a unique key to manage different storages.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 31, 2024
 */
class StorageManager implements IStorageManager {
  private static instances: Record<string, StorageManager> = {}; // Stores instances by key
  private logger: LoggerUtils;
  private debug: boolean = false;
  private storageKey: string;

  /**
   * Private constructor to enforce singleton pattern.
   * Initializes the instance with a specific key and optional debug flag.
   *
   * @param storageKey - The key to identify this instance of storage.
   * @param debug - Optional debug flag for logging.
   */
  public constructor(storageKey: string, debug?: boolean) {
    this.storageKey = storageKey;
    this.debug = DebugUtils.setDebug(debug ?? this.debug);
    this.logger = LoggerUtils.getInstance(this.constructor.name, this.debug, 100);

    if (this.debug) {
      this.logger.info(`StorageManager initialized with key: ${storageKey}`);
    }
  }

  /**
   * Returns the singleton instance of StorageManager.
   * If no instance exists for the provided key, it creates one.
   *
   * @param storageKey - The key to identify the storage instance.
   * @param debug - Optional debug flag for logging.
   * @returns The singleton instance of StorageManager.
   */
  public static getInstance(storageKey: string, debug?: boolean): StorageManager {
    if (!this.instances[storageKey]) {
      this.instances[storageKey] = new StorageManager(storageKey, debug);
    }
    return this.instances[storageKey];
  }

  /**
   * Sets a value in the storage.
   * Automatically stringifies objects and non-string types.
   * The value is stored using a combined key based on the storageKey and the provided key.
   *
   * @param key - The key to associate with the value.
   * @param value - The value to store.
   */
  public async set(key: string, value: any): Promise<void> {
    try {
      const combinedKey = this.getCombinedKey(key);
      const stringValue = this.stringify(value);
      await Preferences.set({ key: combinedKey, value: stringValue });
      this.logger.info(`Value set in storage for key: ${combinedKey}`, { value });
    } catch (error) {
      this.logger.error(`Failed to set value in storage for key: ${key}`, error);
    }
  }

  /**
   * Retrieves a value from storage by key.
   * Automatically parses JSON strings back into objects.
   * Uses a combined key based on the storageKey and the provided key.
   *
   * @param key - The key of the value to retrieve.
   * @returns The parsed value from storage, or null if not found.
   */
  public async get(key: string): Promise<any> {
    try {
      const combinedKey = this.getCombinedKey(key);
      const { value } = await Preferences.get({ key: combinedKey });
      if (value === null) {
        this.logger.info(`No value found in storage for key: ${combinedKey}`);
        return null;
      }
      const parsedValue = this.parse(value);
      this.logger.info(`Value retrieved from storage for key: ${combinedKey}`, { value: parsedValue });
      return parsedValue;
    } catch (error) {
      this.logger.error(`Failed to retrieve value from storage for key: ${key}`, error);
      return null;
    }
  }

  /**
   * Removes a value from storage by key.
   * Uses a combined key based on the storageKey and the provided key.
   *
   * @param key - The key of the value to remove.
   */
  public async remove(key: string): Promise<void> {
    try {
      const combinedKey = this.getCombinedKey(key);
      await Preferences.remove({ key: combinedKey });
      this.logger.info(`Value removed from storage for key: ${combinedKey}`);
    } catch (error) {
      this.logger.error(`Failed to remove value from storage for key: ${key}`, error);
    }
  }

  /**
   * Combines the storageKey and the provided key to create a unique key.
   *
   * @param key - The key to combine with the storageKey.
   * @returns The combined key.
   */
  private getCombinedKey(key: string): string {
    return `${this.storageKey}_${key}`;
  }

  /**
   * Parses a value from storage, assuming it may be JSON.
   * If parsing fails, logs the error and returns the original string or a default value if provided.
   *
   * @param value - The value to parse.
   * @param defaultValue - The default value to return in case of a parse error (optional).
   * @returns The parsed object or the original value if parsing fails.
   */
  private parse(value: string, defaultValue: any = null): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      this.logger.error(`Failed to parse value from storage, returning original value`, e);
      return defaultValue !== null ? defaultValue : value;
    }
  }

  /**
   * Stringifies a value for storage.
   * Converts non-string values to JSON strings. Strings are stored as-is.
   *
   * @param value - The value to stringify.
   * @returns The stringified value.
   */
  private stringify(value: any): string {
    if (typeof value === "string") {
      return value;
    }
    try {
      return JSON.stringify(value);
    } catch (e) {
      this.logger.error(`Failed to stringify value for storage`, e);
      return "";
    }
  }
}

export default StorageManager;