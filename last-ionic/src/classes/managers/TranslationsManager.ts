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
 * The initial translations are loaded dynamically from a URL passed as a parameter.
 * 
 * @example
 * const translation = TranslationsManager.getInstance('path/to/translations.json').translate('hello');
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
 */
class TranslationsManager {
  private static instance: TranslationsManager | null = null;
  private myTranslations: KeyTranslations = {}; // Object to store key-value translations
  private debug: boolean = false; // Debug mode flag
  private logger: LoggerUtils; // Logger instance
  
  private constructor(debug?: boolean) {
    this.debug = DebugUtils.setDebug(debug ?? this.debug);
    this.logger = LoggerUtils.getInstance( this.constructor.name, this.debug);
  }

  /**
   * Returns the singleton instance of TranslationsManager.
   * If an instance does not already exist, it creates and initializes a new one.
   * The initial translations are loaded from the provided `translationURL`.
   *
   * @param {string} translationURL - The URL of the JSON file containing the translations.
   * @param {boolean} [debug] - Optional flag to enable debug mode.
   * @returns {Promise<TranslationsManager>} The singleton instance of TranslationsManager.
   */
  public static async getInstance(translationURL: string, debug?: boolean): Promise<TranslationsManager> {
    if (!this.instance) {
      this.instance = new this(debug);
      await this.instance.loadTranslationsFromURL(translationURL);
    }
    return this.instance;
  }

  /**
   * Loads the translations dynamically from a given URL.
   * This method uses `fetch` to retrieve the translations file in JSON format.
   *
   * @param {string} url - The URL of the JSON file to load translations from.
   */
  private async loadTranslationsFromURL(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load translations from ${url}: ${response.statusText}`);
      }
      const data: KeyTranslations = await response.json();
      this.myTranslations = { ...data };
      {
        this.logger.debug("Translations loaded from URL:", this.myTranslations);
      }
    } catch (error) {
      {
        this.logger.error(`Error loading translations from ${url}:`, error);
      }
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
    {
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
      {
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
    {
      this.logger.debug("Translations cleared.");
    }
  }

}

export default TranslationsManager;
