import * as fs from 'fs';
import * as path from 'path';

/**
 * I18nFinder class for locating and managing i18n translation terms in JavaScript files.
 * It scans through the specified directory, extracts i18n terms, and updates translation files.
 */
export class I18nFinder {
  private rootDir: string;
  private translations: { [key: string]: { [lang: string]: string } } = {};
  private readonly languages: string[] = ['es_es', 'en_us'];

  // Patterns for identifying i18n terms in files
  private readonly i18nPatterns: RegExp[] = [
    /i18n\.t\(['"`](.*?)['"`]\)/g,        // Matches i18n.t('key')
    /i18n\.t\(['"`](.*?)['"`],.*?\)/g,    // Matches i18n.t('key', { ... })
    /t\(['"`](.*?)['"`]\)/g,              // Matches t('key') (alternative usage)
    /i18n\.t\(.*?['"`](.*?)['"`]\)/g,     // Matches i18n.t(...) with additional parameters
  ];

  /**
   * Initializes an instance of I18nFinder with the given root directory.
   * 
   * @param rootDir - The root directory for searching i18n terms.
   */
  constructor(rootDir: string) {
    this.rootDir = rootDir;
  }

  /**
   * Recursively reads the specified directory and applies the callback function to each file.
   * 
   * @param dir - The directory to read.
   * @param callback - The function to apply to each file.
   */
  private readDirectory(dir: string, callback: (filePath: string) => void): void {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error('Error getting file stats:', err);
            return;
          }

          if (stats.isDirectory()) {
            this.readDirectory(filePath, callback); // Recursively handle subdirectories
          } else if (stats.isFile() && filePath.endsWith('.js')) { // Process only JavaScript files
            callback(filePath);
          }
        });
      });
    });
  }

  /**
   * Searches for i18n terms in the specified file and updates the translations object.
   * 
   * @param filePath - The path to the file to be searched.
   */
  private findTermsInFile(filePath: string): void {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      this.i18nPatterns.forEach(pattern => {
        let match: RegExpExecArray | null;
        while ((match = pattern.exec(data)) !== null) {
          const key = match[1];
          if (!this.translations[key]) {
            this.translations[key] = {};
            this.languages.forEach(lang => {
              this.translations[key][lang] = key; // Initialize with key as the default value
            });
          }
        }
      });
    });
  }

  /**
   * Loads existing translations from a JSON file for a given language.
   * 
   * @param lang - The language code (e.g., 'es_es' or 'en_us').
   * @returns An object with existing translations, or an empty object if none exist.
   */
  private loadExistingTranslations(lang: string): { [key: string]: string } {
    const filePath = path.join(__dirname, `${lang}.json`);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return {};
  }

  /**
   * Saves the collected translations to JSON files, merging with existing ones.
   * 
   * Translations are saved for each language. Existing translations are preserved and updated with new entries.
   */
  private saveTranslations(): void {
    this.languages.forEach(lang => {
      const filePath = path.join(__dirname, `${lang}.json`);
      const existingTranslations = this.loadExistingTranslations(lang);
      const updatedTranslations = { ...existingTranslations, ...this.translations };
      fs.writeFileSync(filePath, JSON.stringify(updatedTranslations, null, 2), 'utf8');
      console.log(`Saved translations to ${filePath}`);
    });
  }

  /**
   * Starts the process of finding i18n terms and saving the translations.
   * 
   * This method triggers the directory search and handles saving translations to JSON files.
   */
  public startSearch(): void {
    this.readDirectory(this.rootDir, this.findTermsInFile.bind(this));
    this.saveTranslations();
  }
}

// Create an instance of I18nFinder with the 'src' directory and start the search
const rootDir = path.join(__dirname, 'src');
const i18nFinder = new I18nFinder(rootDir);
i18nFinder.startSearch();
