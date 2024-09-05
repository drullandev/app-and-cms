import { keyTransVar } from '../../static/data/keyTransVar';
import DebugUtils from '../utils/DebugUtils';
import LoggerUtils from '../utils/LoggerUtils';

export interface KeyTranslations {
  [key: string]: string;
}

/**
 * TranslationsManager is a singleton class designed to handle string translations.
 * It provides methods to set, update, and retrieve translations for specific keys.
 * If a key is not found, it will return the key itself as the default behavior.
 *
 * The initial translations are loaded from keyTransVar, but you can update or add more translations dynamically.
 * 
 * @example
 * const translation = TranslationsManager.getInstance().translate('hello');
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
 */
class TranslationsManager {
  private static instance: TranslationsManager | null = null;
  private myTranslations: KeyTranslations = {}; // Object to store key-value translations
  private debug: boolean = false; // Debug mode flag
  private logger: LoggerUtils; // Logger instance
  
  private constructor(debug?: boolean){
    this.debug = DebugUtils.setDebug(debug ?? this.debug);
    this.logger = LoggerUtils.getInstance(this.constructor.name, this.debug, 100);
  }

  /**
   * Returns the singleton instance of TranslationsManager.
   * If an instance does not already exist, it creates and initializes a new one.
   * The initial translations are loaded from `keyTransVar`.
   *
   * @returns {TranslationsManager} The singleton instance of TranslationsManager.
   */
  public static getInstance(debug?: boolean): TranslationsManager {
    if (!this.instance) {
      this.instance = new this();
      this.instance.loadInitialTranslations();
    }
    return this.instance;
  }

  /**
   * Loads the initial translations from the static data `keyTransVar`.
   * This method is called during initialization.
   */
  private loadInitialTranslations(): void {
    this.myTranslations = { ...keyTransVar };
    if (this.debug) {
      this.logger.debug("Initial translations loaded:", this.myTranslations);
    }
  }

  /**
   * Sets or updates the translations object. This method can be used to load or update
   * the translation keys dynamically.
   *
   * @param {KeyTranslations} translations - The translations to set or update.
   */
  public setTranslations(translations: KeyTranslations): void {
    this.myTranslations = { ...this.myTranslations, ...translations };
    if (this.debug) {
      this.logger.debug("Translations updated:", this.myTranslations);
    }
  }

  /**
   * Translates a given key by looking it up in the `myTranslations` object.
   * If the key is not found in the translations, it returns the key itself as the fallback.
   * Optionally, logs a message when a key is missing in debug mode.
   *
   * @param {string} key - The translation key to look up.
   * @returns {string} The translated string or the key if no translation is found.
   */
  public translate(key: string): string {
    const translation = this.myTranslations[key];
    if (!translation) {
      if (this.debug) {
        this.logger.warn(`Missing translation for key: ${key}`);
      }
      return key; // Fallback to the key if translation is not found
    }
    return translation;
  }
  
  /**
   * Clears all translations. Useful for resetting translations when switching contexts (e.g., changing languages).
   */
  public clearTranslations(): void {
    this.myTranslations = {};
    if (this.debug) {
      this.logger.debug("Translations cleared.");
    }
  }

}

export default TranslationsManager.getInstance();