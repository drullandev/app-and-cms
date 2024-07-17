import { debug } from '../env'

type Timer = ReturnType<typeof setTimeout>;

/**
 * Utility class for debugging operations including logging and debouncing functions.
 * Provides methods for setting debug mode, logging messages, and debouncing callbacks.
 *
 * Usage example:
 * 
 * const debugUtil = new DebugUtil();
 * debugUtil.setDebug(true);
 * debugUtil.logInfo('Debug mode is enabled.');
 * const debouncedFunction = debugUtil.debounce(() => console.log('Debounced function called'), 1000);
 * debouncedFunction();
 */
class DebugUtil {

  private timer: Timer | null = null;

  public debug: boolean = false;

  /**
   * Sets the debug mode based on the provided flag or application constants.
   * @param debug Optional boolean to explicitly set debug mode.
   * @returns The current debug mode.
   */
  public setDebug(debug?: boolean): boolean {
    this.debug = debug ? (debug ?? debug) : ( debug ?? false );
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

  public isProduction(){
    return import.meta.env.NODE_ENV === 'production'
  }

  public isDevelopent(){
    return import.meta.env.NODE_ENV === 'development'
  }

  /**
   * Stops a debug timer with a given label.
   * @param label The label for the timer.
   */
  public trackElement(element: Element) {

  }
  
}

export default new DebugUtil();