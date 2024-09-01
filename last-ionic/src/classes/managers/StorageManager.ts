import { Preferences } from "@capacitor/preferences";
import LoggerClass from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

/**
 * StorageManagerInterface defines the contract for StorageManager operations.
 * This interface ensures that the StorageManager can handle key-value storage operations consistently.
 */
export interface StorageManagerInterface {
  set(key: string, value: any): Promise<void>;
  get(key: string): Promise<any>;
  remove(key: string): Promise<void>;
}

/**
 * StorageManager is a singleton class designed to handle key-value storage operations.
 * It provides methods to set, get, and remove values from storage, as well as utilities
 * for parsing and stringifying data.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 31, 2024
 */
class StorageManager implements StorageManagerInterface {
  private static instance: StorageManager | null = null;
  private logger: LoggerClass;
  private debug: boolean;

  /**
   * Private constructor to enforce singleton pattern.
   */
  private constructor() {
    this.debug = DebugUtils.setDebug(false);
    this.logger = LoggerClass.getInstance(this.constructor.name, this.debug, 100);

    if (this.debug) {
      this.logger.info("StorageManager initialized");
    }
  }

  /**
   * Returns the singleton instance of StorageManager.
   * If no instance exists, it creates one.
   * 
   * @returns The singleton instance of StorageManager.
   */
  public static getInstance(): StorageManager {
    if (this.instance === null) {
      this.instance = new StorageManager();
    }
    return this.instance;
  }

  /**
   * Sets a value in the storage.
   * Automatically stringifies objects and non-string types.
   * 
   * @param key - The key to associate with the value.
   * @param value - The value to store.
   */
  public async set(key: string, value: any): Promise<void> {
    try {
      const stringValue = this.stringify(value);
      await Preferences.set({ key: key, value: stringValue });
      this.logger.info(`Value set in storage for key: ${key}`, { value });
    } catch (error) {
      this.logger.error(`Failed to set value in storage for key: ${key}`, error);
    }
  }

  /**
   * Retrieves a value from storage by key.
   * Automatically parses JSON strings back into objects.
   * 
   * @param key - The key of the value to retrieve.
   * @returns The parsed value from storage, or null if not found.
   */
  public async get(key: string): Promise<any> {
    try {
      const { value } = await Preferences.get({ key: key });
      if (value === null) {
        this.logger.info(`No value found in storage for key: ${key}`);
        return null;
      }
      const parsedValue = this.parse(value);
      this.logger.info(`Value retrieved from storage for key: ${key}`, { value: parsedValue });
      return parsedValue;
    } catch (error) {
      this.logger.error(`Failed to retrieve value from storage for key: ${key}`, error);
      return null;
    }
  }

  /**
   * Removes a value from storage by key.
   * 
   * @param key - The key of the value to remove.
   */
  public async remove(key: string): Promise<void> {
    try {
      await Preferences.remove({ key: key });
      this.logger.info(`Value removed from storage for key: ${key}`);
    } catch (error) {
      this.logger.error(`Failed to remove value from storage for key: ${key}`, error);
    }
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
