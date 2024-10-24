import { nodeEnv } from "../../app/config/env";

interface LoggerInstances {
  [name: string]: LoggerUtils;
}

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface ILoggerUtils {
  log: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  info: (...args: any[]) => void;
  debug: (...args: any[]) => void;
  show: (...args: any[]) => void;
  getLogs: () => string[];
  setLogLevel: (level: LogLevel) => void;
  disableLogging: () => void;
}

/**
 * LoggerUtils is a utility class designed to manage logging in an application.
 * It supports multiple log levels, log rotation, and can be instantiated as a singleton.
 * It ensures that logs are stored up to a defined limit and can handle conditional logging.
 * 
 * @class LoggerUtils
 */
class LoggerUtils implements ILoggerUtils {
  private debugLogger = false;
  private static instances: LoggerInstances = {};
  private logs: string[] = [];
  private maxLogs: number = 100;
  private prefix?: string;
  private shouldLog: () => boolean;
  public logLevel: LogLevel;
  private archivedLogs: string[][] = [];
  private maxArchivedLogs: number = 5;

  /**
   * Private constructor to prevent direct instantiation.
   * This initializes the logger with the specified settings.
   * 
   * @param debug - Flag to determine if the logger is in debug mode.
   * @param prefix - The prefix or name for the logger instance.
   * @param maxLogs - Maximum number of logs stored in memory before archiving.
   * @param logLevel - The logging level ('error', 'warn', 'info', 'debug').
   * @param shouldLog - Optional custom function to determine if logging should occur.
   */
  private constructor(debug?: boolean, prefix?: string, maxLogs?: number, logLevel?: LogLevel, shouldLog?: () => boolean) {
    this.debugLogger = debug || false;
    this.prefix = prefix;
    this.maxLogs = maxLogs || 100;
    this.logLevel = logLevel || 'debug';
    this.shouldLog = shouldLog || (() => nodeEnv === "development");

    // If debug is false, we disable logging by default
    if (!this.debugLogger) {
      this.disableLogging();
    }
  }

  /**
   * Returns the singleton instance of LoggerUtils for a specific name.
   * If an instance does not exist, or if debug mode is different, it creates a new instance.
   *
   * @param debug - Flag to determine if the logger should be created in debug mode.
   * @param name - The name or prefix for the logger.
   * @param maxLogs - Maximum number of logs to store in memory.
   * @param logLevel - The logging level ('error', 'warn', 'info', 'debug').
   * @param shouldLog - Optional custom function to determine if logging should occur.
   * @returns {LoggerUtils} The LoggerUtils instance.
   */
  public static getInstance(
    name: string,
    debug: boolean = false,
    logLevel?: LogLevel,
    maxLogs?: number,
    shouldLog?: () => boolean
  ): LoggerUtils {
    const loggerName = name || 'Logger';
    if (!LoggerUtils.instances[loggerName] || LoggerUtils.instances[loggerName].debugLogger !== debug) {
      LoggerUtils.instances[loggerName] = new LoggerUtils(debug, loggerName, maxLogs, logLevel, shouldLog);
    }
    return LoggerUtils.instances[loggerName];
  }
  

  /**
   * Logs a debug message if the current log level allows it.
   * Will not log if debugLogger is false.
   *
   * @param {...any} args - The message(s) to log.
   */
  public log = (...args: any[]): void => {
    if (this.debugLogger) {
      this.logMessage('debug', args);
    }
  }

  /**
   * Logs a warning message if the current log level allows it.
   * Will not log if debugLogger is false.
   *
   * @param {...any} args - The warning message(s) to log.
   */
  public warn = (...args: any[]): void => {
    if (this.debugLogger) {
      this.logMessage('warn', args);
    }
  }

  /**
   * Logs an error message if the current log level allows it.
   * Will not log if debugLogger is false.
   *
   * @param {...any} args - The error message(s) to log.
   */
  public error = (...args: any[]): void => {
    if (this.debugLogger) {
      this.logMessage('error', args);
    }
  }

  /**
   * Logs an informational message if the current log level allows it.
   * Will not log if debugLogger is false.
   *
   * @param {...any} args - The informational message(s) to log.
   */
  public info = (...args: any[]): void => {
    if (this.debugLogger) {
      this.logMessage('info', args);
    }
  }

  /**
   * Logs a debug message if the current log level allows it.
   * Will not log if debugLogger is false.
   *
   * @param {...any} args - The debug message(s) to log.
   */
  public debug = (...args: any[]): void => {
    if (this.debugLogger) {
      this.logMessage('debug', args);
    }
  }

  /**
   * Logs a message directly to the console, bypassing log levels.
   * Will not log if debugLogger is false.
   * 
   * @param {...any} args - The message(s) to log.
   */
  public show = (...args: any[]): void => {
    if (this.debugLogger) {
      console.info(`[SHOW] [${this.prefix}] ${args.join(" ")}`);
    }
  }

  /**
   * Returns the current list of logs.
   * Returns an empty array if logging is disabled.
   *
   * @returns {string[]} A copy of the current logs.
   */
  public getLogs = (): string[] => {
    return this.shouldLog() && this.debugLogger ? [...this.logs] : [];
  }

  /**
   * Determines if a message should be logged based on the log level.
   *
   * @param level - The log level of the current message.
   * @returns {boolean} True if the message should be logged, otherwise false.
   */
  private shouldLogMessage = (level: LogLevel): boolean => {
    const levels: { [key in LogLevel]: number } = { 'error': 0, 'warn': 1, 'info': 2, 'debug': 3 };
    return this.shouldLog() && this.debugLogger && levels[level] <= levels[this.logLevel];
  }

  /**
   * Logs a message with the appropriate log level.
   * 
   * @param level - The log level of the message.
   * @param args - The message(s) to log.
   */
  private logMessage = (level: LogLevel, args: any[]): void => {
    if (this.shouldLogMessage(level)) {
      const formattedArgs = args.map(arg => this.formatLogArg(arg));
      const message = `[${level.toUpperCase()}] [${this.prefix}] ${formattedArgs.join(" ")}`;
      this.logs.push(message);
      if (this.logs.length > this.maxLogs) {
        this.archiveLogs();
      }
      console.log(message);
    }
  }

  /**
   * Archives the current logs when the maximum size is reached and clears the log.
   */
  private archiveLogs = (): void => {
    if (this.debugLogger) {
      this.archivedLogs.push([...this.logs]);
      if (this.archivedLogs.length > this.maxArchivedLogs) {
        this.archivedLogs.shift(); // Remove the oldest archived logs if over the limit
      }
      this.logs = []; // Clear current logs
    }
  }

  /**
   * Sets the log level for the logger instance.
   * 
   * @param level - The new log level ('error', 'warn', 'info', 'debug').
   */
  public setLogLevel = (level: LogLevel): void => {
    this.logLevel = level;
    this.info(`Log level set to ${level}`);
  }

  /**
   * Disables logging completely for the logger instance.
   */
  public disableLogging = (): void => {
    this.shouldLog = () => false;
  }

  /**
   * Converts an argument to a string for logging.
   * If the argument is an object, it is stringified using JSON.stringify.
   * 
   * @param arg - The argument to format.
   * @returns {string} The stringified argument.
   */
  private formatLogArg = (arg: any): string => {
    if (typeof arg === 'object' && arg !== null) {
      return JSON.stringify(arg, null, 2);
    }
    return String(arg);
  }
}

export default LoggerUtils;
