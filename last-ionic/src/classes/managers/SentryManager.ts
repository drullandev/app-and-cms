// SentryManager.ts
import * as Sentry from "@sentry/browser";

interface SentryManagerConfig {
  dsn: string;
  environment: string;
}

export class SentryManager {
  private config: SentryManagerConfig;

  /**
   * Constructor for SentryManager.
   * Initializes Sentry with the provided DSN and environment settings.
   * @param config - Configuration object including Sentry DSN and environment
   */
  constructor(config: SentryManagerConfig) {
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
   */
  public captureException = (error: Error): void => {
    Sentry.captureException(error);
  };

  /**
   * Captures a custom message as an error log in Sentry.
   */
  public captureMessage = (message: string): void => {
    Sentry.captureMessage(message, "error"); // 'error' indicates the severity level
  };
}

export default SentryManager;
