import LoggerUtils, { ILoggerUtils, LogLevel } from "../classes/utils/LoggerUtils";
import { storageKey } from '../app/config/env'

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
export const initLogger = (
  debug: boolean = false,
  className: string,
  logLevel: LogLevel = 'debug'
): ILoggerUtils => {
  return LoggerUtils.getInstance(
    debug,
    className,
    logLevel,
  );
}
