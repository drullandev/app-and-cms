/**
 * LoggerClass provides various methods for logging messages at different levels.
 * It also maintains a history of log messages and limits the number of stored logs.
 */
 class LoggerClass {

  private static instance: LoggerClass;
  private logs: string[] = [];

  // Private constructor to prevent direct instantiation
  private constructor() {}

  /**
   * Returns the single instance of LoggerClass.
   * @returns {LoggerClass} The singleton instance.
   */
  public static getInstance(): LoggerClass {
    if (!LoggerClass.instance) {
      LoggerClass.instance = new LoggerClass();
    }
    return LoggerClass.instance;
  }

  /**
   * Logs a message with a variable number of arguments.
   * Only logs messages if the current environment is 'development'.
   * @param {...any} args - The message(s) to log.
   */
  public log(...args: any) {
    if (this.mustShow()) {
      this.logs.push(args.join(' '));
      // Limit the number of stored logs to the most recent 100 entries
      if (this.logs.length > 100) this.logs.shift();
      console.log(...args);
    }
    return args;
  }

  /**
   * Retrieves the current logs.
   * @returns {string[]} - A copy of the logs array to prevent external modification.
   */
  public getLogs() {
    return [...this.logs];
  }

  /**
   * Logs a warning message.
   * Only logs messages if the current environment is 'development'.
   * @param {...any} args - The warning message(s) to log.
   */
  public warn(...args: any) {
    if (this.mustShow()) {
      console.warn(...args);
    }
    return args;
  }

  /**
   * Logs an error message.
   * Only logs messages if the current environment is 'development'.
   * @param {...any} args - The error message(s) to log.
   */
  public error(...args: any) {
    if (this.mustShow()) {
      console.error(...args);
    }
    return args;
  }

  /**
   * Logs an informational message.
   * Only logs messages if the current environment is 'development'.
   * @param {...any} args - The informational message(s) to log.
   */
  public info(...args: any) {
    if (this.mustShow()) {
      console.info(...args);
    }
    return args;
  }

  /**
   * Logs a debug message.
   * Only logs messages if the current environment is 'development'.
   * @param {...any} args - The debug message(s) to log.
   */
  public debug(...args: any) {
    if (this.mustShow()) {
      console.debug(...args);
    }
    return args;
  }

  /**
   * Logs a message with informational level regardless of the environment.
   * @param {...any} args - The message(s) to log.
   */
  public show(...args: any) {
    console.info(...args);
    return args;
  }

  /**
   * Determines if logging should be performed based on the environment.
   * 
   * @returns {boolean} - True if the environment is 'development', otherwise false.
   */
  private mustShow(): boolean {
    return process.env.NODE_ENV === 'development';
  }
  
}

// Export the singleton instance of LoggerClass
const Logger = LoggerClass.getInstance();
export default Logger;
