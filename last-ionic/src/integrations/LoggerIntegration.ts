import LoggerClass, { LogLevel } from '../classes/utils/LoggerUtils';

/**
 * Initializes and returns a LoggerClass instance.
 *
 * @param className - The name or prefix for the logger instance.
 * @param debug - Flag to determine if the logger should be created in debug mode.
 * @param maxLogs - Maximum number of logs to store in memory.
 * @param logLevel - The logging level (error, warn, info, debug).
 * @param shouldLog - Optional custom function to determine if logging should occur.
 * @returns {LoggerClass} The initialized LoggerClass instance.
 */
export function initializeLogger(
  className: string,
  debug: boolean = false,
  maxLogs: number = 100,
  logLevel: LogLevel = 'debug',
  shouldLog?: () => boolean
): LoggerClass {
  return LoggerClass.getInstance(className, debug, maxLogs, logLevel, shouldLog);
}