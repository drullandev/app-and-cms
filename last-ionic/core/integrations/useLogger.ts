import LoggerUtils, { ILoggerUtils, LogLevel } from "../classes/utils/LoggerUtils";
import { storageKey } from '../app/config/env';

/**
 * Initializes and returns a LoggerUtils instance.
 *
 * @param className - The name or prefix for the logger instance.
 * @param debug - Flag to determine if the logger should be created in debug mode.
 * @param logLevel - The logging level (error, warn, info, debug).
 * @returns {ILoggerUtils} The initialized LoggerUtils instance.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 31, 2024
 */
export const useLogger = (
  prefix: string = storageKey,
  debug: boolean = false,
  logLevel: LogLevel = 'debug'
): ILoggerUtils => {
  return LoggerUtils.getInstance(prefix, debug, logLevel);
};
