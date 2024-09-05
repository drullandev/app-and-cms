/**
 * Utility class for debugging operations including logging and debouncing functions.
 * Provides methods for setting debug mode, logging messages, and debouncing callbacks.
 *
 * Usage example:
 * 
 * const debugUtil = DebugUtils.getInstance();
 * DebugUtils.setDebug(false);
 * DebugUtils.logInfo('Debug mode is enabled.');
 * const debouncedFunction = DebugUtils.debounce(() => console.log('Debounced function called'), 1000);
 * debouncedFunction();
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
 */
class DebugUtils {
  private static instance: DebugUtils | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;
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

  public isProduction() {
    return import.meta.env.NODE_ENV === 'production';
  }

  public isDevelopment() {
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
      console.error(`[ERROR]: ${message}`);
    }
  }

  /**
   * Debounce function: ensures a function is called only after a certain amount of time has passed since the last call.
   * @param callback The function to debounce.
   * @param delay The debounce delay in milliseconds.
   * @returns A debounced function.
   */
  public debounce(callback: (...args: any[]) => void, delay: number) {
    return (...args: any[]) => {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }

  /**
   * Clears the debounce timer if it exists.
   */
  public clear() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
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
   * Stops a debug timer with a given label.
   * @param label The label for the timer.
   */
  public trackElement(element: Element) {
    // Implementation of trackElement logic
    // TODO: If you gonna implement tracking, then must to reestydu everything from here ;)
  }
}

export default DebugUtils.getInstance();
