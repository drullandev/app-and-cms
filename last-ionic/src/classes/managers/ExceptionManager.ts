// Filename: ExceptionManager.ts

/**
 * Manages exception handling and reporting through Sentry.
 *
 * Initializes Sentry with the provided DSN and environment settings.
 * Allows capturing exceptions and custom error messages to log them in Sentry.
 *
 * @class ExceptionManager
 * @author David Rullán - https://github.com/drullandev
 * @date September 10, 2024
 */
import * as Sentry from "@sentry/browser";

interface ExceptionManagerConfig {
  dsn: string; // Sentry DSN for error reporting
  environment: string; // Application environment (e.g., production, development)
}

export class ExceptionManager {
  private config: ExceptionManagerConfig;

  /**
   * Creates an instance of ExceptionManager configured with the provided settings.
   *
   * @param config - Configuration object including Sentry DSN and environment
   */
  constructor(config: ExceptionManagerConfig) {
    this.config = config;
    this.initializeSentry();
  }

  /**
   * Initializes Sentry with the provided DSN and environment settings.
   */
  private initializeSentry = (): void => {
    Sentry.init({
      dsn: this.config.dsn,
      environment: this.config.environment,
    });
  };

  /**
   * Captures and logs an exception through Sentry.
   *
   * @param error - The error or exception to capture
   */
  public captureException = (error: Error): void => {
    Sentry.captureException(error);
  };

  /**
   * Captures a custom message as an error log in Sentry.
   *
   * @param message - Custom error message to log
   */
  public captureMessage = (message: string): void => {
    Sentry.captureMessage(message, "error"); // 'error' indicates the severity level
  };
}
