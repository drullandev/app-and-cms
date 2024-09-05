import LoggerUtils, { LogLevel } from '../utils/LoggerUtils';

/**
 * Initializes and returns a LoggerUtils instance.
 *
 * @param className - The name or prefix for the logger instance.
 * @param debug - Flag to determine if the logger should be created in debug mode.
 * @param maxLogs - Maximum number of logs to store in memory.
 * @param logLevel - The logging level (error, warn, info, debug).
 * @param shouldLog - Optional custom function to determine if logging should occur.
 * @returns {LoggerUtils} The initialized LoggerUtils instance.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date Agoust 31, 2024
 */
export function initializeLogger(
  className: string,
  debug: boolean = false,
  maxLogs: number = 100,
  logLevel: LogLevel = 'debug',
  shouldLog?: () => boolean
): LoggerUtils {
  return LoggerUtils.getInstance(className, debug, maxLogs, logLevel, shouldLog);
}