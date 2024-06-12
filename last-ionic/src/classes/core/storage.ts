import { Preferences } from '@capacitor/preferences';

class StorageService {
  
  // Function to set a value in storage
  public async setStorage(key: string, value: any): Promise<void> {
    // Check if the value is an object and stringify it if true
    const json = this.getType(value) === 'object';
    const res = json ? JSON.stringify(value) : value;
    await Preferences.set({ key: key, value: res });
  }

  // Function to get a value from storage
  public async getStorage(key: string): Promise<any> {
    const { value } = await Preferences.get({ key: key });
    // Check if the value is an object and parse it if true
    const json = this.getType(value) === 'object';
    return value ? (json ? JSON.parse(value) : value) : false;
  }

  // Function to remove a value from storage
  public async removeStorage(key: string): Promise<void> {
    await Preferences.remove({ key: key });
  }

  // Function to switch storage value (set or remove)
  public async switchStorage(key: string, value: any): Promise<void> {
    // If value is truthy, set it in storage; otherwise, remove it
    if (value) {
      await this.setStorage(key, value);
    } else {
      await this.removeStorage(key);
    }
  }

  // Function to get the type of a variable
  private getType(p: any): string {
    if (Array.isArray(p)) return 'array';
    else if (typeof p == 'string') return 'string';
    else if (p != null && typeof p == 'object') return 'object';
    else return 'other';
  }
}

export default new StorageService();
