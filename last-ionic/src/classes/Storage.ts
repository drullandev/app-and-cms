import { Preferences } from '@capacitor/preferences';

class Storage {

  public static instance: Storage;

  public constructor() {}

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }

  // Function to set a value in storage
  public async set(key: string, value: any): Promise<void> {
    await Preferences.set({ key: key, value: this.stringify(value) });
  }

  // Function to get a value from storage
  public async get(key: string): Promise<any> {
    const { value } = await Preferences.get({ key: key });
    return this.parse(value);
  }

  // Function to remove a value from storage
  public async remove(key: string): Promise<void> {
    await Preferences.remove({ key: key });
  }

  // Function to parse a value
  private parse(value: any): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

  // Function to stringify a value
  // TODO: Move to strings utils
  private stringify(value: any): string {
    return this.getType(value) === 'string' ? value : JSON.stringify(value);
  }

  // Function to get the type of a variable
  private getType(p: any): string {
    if (Array.isArray(p)) return 'array';
    else if (typeof p == 'string') return 'string';
    else if (p != null && typeof p == 'object') return 'object';
    else return 'other';
  }

}

export default Storage.getInstance();
