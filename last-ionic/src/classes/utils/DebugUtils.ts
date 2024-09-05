/**
 * Utility class for debugging operations including logging and tracking.
 * Provides methods for setting debug mode, logging messages, and timing execution.
 * 
 * Usage example:
 * 
 * const debugUtil = DebugUtils.getInstance();
 * DebugUtils.setDebug(false);
 * DebugUtils.logInfo('Debug mode is enabled.');
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
 */
class DebugUtils {
  private static instance: DebugUtils | null = null;
  public debug: boolean = false;

  /**
   * Returns the single instance of DebugUtils.
   * @returns {DebugUtils} The singleton instance.
   */
  public static getInstance(): DebugUtils {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  /**
   * Checks if the current environment is production.
   *
   * @returns {boolean} True if the environment is production, false otherwise.
   */
  public isProduction(): boolean {
    return import.meta.env.NODE_ENV === 'production';
  }

  /**
   * Checks if the current environment is development.
   *
   * @returns {boolean} True if the environment is development, false otherwise.
   */
  public isDevelopment(): boolean {
    return import.meta.env.NODE_ENV === 'development';
  }

  /**
   * Sets the debug mode based on the provided flag or application constants.
   * @param debug Optional boolean to explicitly set debug mode.
   * @returns The current debug mode.
   */
  public setDebug(debug?: boolean): boolean {
    this.debug = debug ?? this.debug ?? false;
    return this.debug;
  }

  /**
   * Logs an info message to the console if debug mode is enabled.
   * @param message The message to log.
   */
  public logInfo(message: string) {
    if (this.debug) {
      console.info(`[INFO]: ${message}`);
    }
  }

  /**
   * Logs a warning message to the console if debug mode is enabled.
   * @param message The message to log.
   */
  public logWarning(message: string) {
    if (this.debug) {
      console.warn(`[WARNING]: ${message}`);
    }
  }

  /**
   * Logs an error message to the console if debug mode is enabled.
   * @param message The message to log.
   */
  public logError(message: string, error: any) {
    if (this.debug) {
      console.error(`[ERROR]: ${message}`, error);
    }
  }

  /**
   * Starts a debug timer with a given label.
   * @param label The label for the timer.
   */
  public startTimer(label: string) {
    if (this.debug) {
      console.time(label);
    }
  }

  /**
   * Stops a debug timer with a given label.
   * @param label The label for the timer.
   */
  public stopTimer(label: string) {
    if (this.debug) {
      console.timeEnd(label);
    }
  }

  /**
   * A placeholder for tracking elements (future implementation).
   * @param label The label for the timer.
   */
  public trackElement(element: Element) {
    // TODO: Implementation of trackElement logic
  }
}

export default DebugUtils.getInstance();
