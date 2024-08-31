import { Preferences } from "@capacitor/preferences";
import LoggerClass from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

/**
 * StorageManager is a singleton class designed to handle key-value storage operations.
 * It provides methods to set, get, and remove values from storage, as well as utilities
 * for parsing and stringifying data.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date Agoust 31, 2024
 */
class StorageManager {

  private static instance: StorageManager | null = null;
  private logger: LoggerClass;
  private debug: boolean;

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
   * @param key - The key to associate with the value.
   * @param value - The value to store.
   */
  public async set(key: string, value: any): Promise<void> {
    try {
      await Preferences.set({ key: key, value: this.stringify(value) });
      this.logger.info(`Value set in storage for key: ${key}`, { value });
    } catch (error) {
      this.logger.error(`Failed to set value in storage for key: ${key}`, error);
    }
  }

  /**
   * Retrieves a value from storage by key.
   * @param key - The key of the value to retrieve.
   * @returns The parsed value from storage.
   */
  public async get(key: string): Promise<any> {
    try {
      const { value } = await Preferences.get({ key: key });
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
   * If parsing fails, logs the error and returns null or a default value if provided.
   * @param value - The value to parse.
   * @param defaultValue - The default value to return in case of a parse error (optional).
   * @returns The parsed object or the default value if parsing fails.
   */
  private parse(value: any, defaultValue: any = null): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      this.logger.error(`Failed to parse value from storage`, e);
      return defaultValue;
    }
  }

  /**
   * Stringifies a value for storage.
   * If stringification fails, logs the error and returns an empty string or a default value.
   * @param value - The value to stringify.
   * @returns The stringified value or an empty string if stringification fails.
   */
  private stringify(value: any): string {
    try {
      return this.getType(value) === "string" ? value : JSON.stringify(value);
    } catch (e) {
      this.logger.error(`Failed to stringify value for storage`, e);
      return "";
    }
  }

  /**
   * Determines the type of a variable.
   * @param value - The value to check the type of.
   * @returns The type of the value as a string.
   */
  private getType(value: any): string {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
  }
}

export default StorageManager;
