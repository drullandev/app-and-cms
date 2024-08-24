import { Preferences } from '@capacitor/preferences';

class StorageManager {

  // Singleton instance of StorageManager
  private static instance: StorageManager | null = null;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  /**
   * Retrieves the singleton instance of StorageManager.
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
    await Preferences.set({ key: key, value: this.stringify(value) });
  }

  /**
   * Retrieves a value from storage by key.
   * @param key - The key of the value to retrieve.
   * @returns The parsed value from storage.
   */
  public async get(key: string): Promise<any> {
    const { value } = await Preferences.get({ key: key });
    return this.parse(value);
  }

  /**
   * Removes a value from storage by key.
   * @param key - The key of the value to remove.
   */
  public async remove(key: string): Promise<void> {
    await Preferences.remove({ key: key });
  }

  /**
   * Parses a value from storage, assuming it may be JSON.
   * @param value - The value to parse.
   * @returns The parsed object or the raw value if parsing fails.
   */
  private parse(value: any): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value; // Return as-is if not JSON
    }
  }

  /**
   * Stringifies a value for storage.
   * @param value - The value to stringify.
   * @returns The stringified value.
   */
  private stringify(value: any): string {
    return this.getType(value) === 'string' ? value : JSON.stringify(value);
  }

  /**
   * Determines the type of a variable.
   * @param p - The variable to check.
   * @returns A string representing the type of the variable.
   */
  private getType(p: any): string {
    if (Array.isArray(p)) return 'array';
    else if (typeof p == 'string') return 'string';
    else if (p != null && typeof p == 'object') return 'object';
    else return 'other';
  }

}

// Export the singleton instance of StorageManager
const StorageInstance = StorageManager.getInstance();

export default StorageInstance;
