interface LoggerInstances {
  [name: string]: LoggerUtils;
}

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

/**
 * LoggerUtils is a utility class that provides advanced logging capabilities for applications.
 * It supports multiple logging levels, log rotation, and custom logging conditions.
 * This class is designed to be used as a singleton, providing consistent logging behavior across the application.
 * 
 * @author David Rullán
 * @date September 3, 2024
 */
class LoggerUtils {
  private static instances: LoggerInstances = {};
  private logs: string[] = [];
  private maxLogs: number;
  private prefix: string;
  private shouldLog: () => boolean;
  public logLevel: LogLevel;
  private archivedLogs: string[][] = [];
  private maxArchivedLogs: number = 5;

  /**
   * Private constructor to prevent direct instantiation.
   * Initializes the logger with a prefix, debug flag, maximum log size, log level, and a custom shouldLog function.
   *
   * @param prefix - The prefix or name for the logger instance.
   * @param debug - Flag to determine if the logger should be created in debug mode.
   * @param maxLogs - Maximum number of logs to store in memory before rotating.
   * @param logLevel - The logging level ('error', 'warn', 'info', 'debug').
   * @param shouldLog - Optional custom function to determine if logging should occur.
   */
  private constructor(prefix: string, debug: boolean = false, maxLogs: number = 100, logLevel: LogLevel = 'debug', shouldLog?: () => boolean) {
    this.prefix = prefix;
    this.maxLogs = maxLogs;
    this.logLevel = logLevel;
    this.shouldLog = shouldLog || (() => process.env.NODE_ENV === "development");
  }

  /**
   * Returns the singleton instance of LoggerUtils for a specific name.
   * If a logger for the specified name does not exist, or if debug is true and the existing logger configuration differs, a new instance is created.
   *
   * @param name - The name or prefix for the logger.
   * @param debug - Flag to determine if the logger should be created in debug mode.
   * @param maxLogs - Maximum number of logs to store in memory.
   * @param logLevel - The logging level ('error', 'warn', 'info', 'debug').
   * @param shouldLog - Optional custom function to determine if logging should occur.
   * @returns {LoggerUtils} The LoggerUtils instance.
   */
  public static getInstance(
    name: string,
    debug: boolean = false,
    maxLogs: number = 100,
    logLevel: LogLevel = 'debug',
    shouldLog?: () => boolean
  ): LoggerUtils {
    if (!LoggerUtils.instances[name] || (debug && LoggerUtils.instances[name].maxLogs !== maxLogs)) {
      LoggerUtils.instances[name] = new LoggerUtils(name, debug, maxLogs, logLevel, shouldLog);
    }
    return LoggerUtils.instances[name];
  }

  /**
   * Logs a message at the debug level.
   * The message is logged only if the current log level is 'debug' and shouldLog evaluates to true.
   *
   * @param {...any} args - The message(s) to log.
   */
  public log = (...args: any[]): void => {
    this.logMessage('debug', args);
  }

  /**
   * Logs a warning message.
   * The message is logged only if the current log level is 'warn' or lower and shouldLog evaluates to true.
   *
   * @param {...any} args - The warning message(s) to log.
   */
  public warn = (...args: any[]): void => {
    this.log('warn', args);
  }

  /**
   * Logs an error message.
   * The message is logged only if the current log level is 'error' or lower and shouldLog evaluates to true.
   *
   * @param {...any} args - The error message(s) to log.
   */
  public error = (...args: any[]): void => {
    this.logMessage('error', args);
  }

  /**
   * Logs an informational message.
   * The message is logged only if the current log level is 'info' or lower and shouldLog evaluates to true.
   *
   * @param {...any} args - The informational message(s) to log.
   */
  public info = (...args: any[]): void => {
    this.logMessage('info', args);
  }

  /**
   * Logs a debug message.
   * The message is logged only if the current log level is 'debug' and shouldLog evaluates to true.
   *
   * @param {...any} args - The debug message(s) to log.
   */
  public debug = (...args: any[]): void => {
    this.logMessage('debug', args);
  }

  /**
   * Logs a message regardless of the log level and environment state.
   * This method should be used cautiously as it bypasses the usual log level checks.
   *
   * @param {...any} args - The message(s) to log.
   */
  public show = (...args: any[]): void => {
    console.info(`[SHOW] [${this.prefix}] ${args.join(" ")}`);
  }

  /**
   * Retrieves the current logs.
   * Returns a copy of the logs array to prevent external modification.
   *
   * @returns {string[]} A copy of the current logs.
   */
  public getLogs = (): string[] => {
    return this.shouldLog() ? [...this.logs] : [];
  }

  /**
   * Determines if logging should be performed based on the environment and log level.
   * Compares the current log level with the level of the message being logged.
   *
   * @param level - The log level of the current message.
   * @returns {boolean} - True if the message should be logged, otherwise false.
   */
  private shouldLogMessage = (level: LogLevel): boolean => {
    const levels: { [key in LogLevel]: number } = { 'error': 0, 'warn': 1, 'info': 2, 'debug': 3 };
    return this.shouldLog() && levels[level] <= levels[this.logLevel];
  }

  /**
   * Logs a message with the appropriate log level.
   * Handles the actual logging logic, including checking if the message should be logged based on the log level.
   * Implements log rotation when the log size exceeds the maximum.
   *
   * @param level - The log level of the message.
   * @param args - The message(s) to log.
   */
  private logMessage = (level: LogLevel, args: any[]): void => {
    if (this.shouldLogMessage(level)) {
      const message = `[${level.toUpperCase()}] [${this.prefix}] ${args.join(" ")}`;
      this.logs.push(message);
      if (this.logs.length > this.maxLogs) {
        this.archiveLogs();
      }
      console.log(message);
    }
  }

  /**
   * Archives current logs when the maximum size is reached and clears the log.
   * This prevents unbounded memory growth and simulates a basic log rotation mechanism.
   */
  private archiveLogs = (): void => {
    this.archivedLogs.push([...this.logs]);
    if (this.archivedLogs.length > this.maxArchivedLogs) {
      this.archivedLogs.shift(); // Remove the oldest archived logs if over the limit
    }
    this.logs = []; // Clear current logs
  }

  /**
   * Dynamically sets the log level for the logger.
   * Allows adjusting the verbosity of the logger at runtime.
   *
   * @param level - The new log level to set.
   */
  public setLogLevel = (level: LogLevel): void => {
    this.logLevel = level;
    this.info(`Log level set to ${level}`);
  }

  /**
   * Initializes and returns a LoggerUtils instance.
   * Ensures that the logger is properly configured before use.
   *
   * @param className - The name or prefix for the logger instance.
   * @param debug - Flag to determine if the logger should be created in debug mode.
   * @param maxLogs - Maximum number of logs to store in memory.
   * @param logLevel - The logging level (error, warn, info, debug).
   * @param shouldLog - Optional custom function to determine if logging should occur.
   * @returns {LoggerUtils} The initialized LoggerUtils instance.
   */
  public initializeLogger = (
    className: string,
    debug: boolean = false,
    maxLogs: number = 100,
    logLevel: LogLevel = 'debug',
    shouldLog?: () => boolean
  ): LoggerUtils => {
    return LoggerUtils.getInstance(className, debug, maxLogs, logLevel, shouldLog);
  }

  /**
   * Allows developers to disable logging entirely.
   * This can be useful in production environments to reduce performance overhead.
   */
  public disableLogging = (): void => {
    this.shouldLog = () => false;
  }
}

/**
 * Initializes and returns a LoggerUtils instance.
 * This is a convenience function for quick logger setup.
 *
 * @param className - The name or prefix for the logger instance.
 * @param debug - Flag to determine if the logger should be created in debug mode.
 * @param maxLogs - Maximum number of logs to store in memory.
 * @param logLevel - The logging level (error, warn, info, debug).
 * @param shouldLog - Optional custom function to determine if logging should occur.
 * @returns {LoggerUtils} The initialized LoggerUtils instance.
 */
export const initializeLogger = (
  className: string = 'LoggerStart',
  debug: boolean = false,
  maxLogs: number = 100,
  logLevel: LogLevel = 'debug',
  shouldLog?: () => boolean
): LoggerUtils => {
  return LoggerUtils.getInstance(className, debug, maxLogs, logLevel, shouldLog);
}

export default LoggerUtils;