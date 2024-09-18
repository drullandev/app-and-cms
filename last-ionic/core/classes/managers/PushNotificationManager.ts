import { PushNotifications, PushNotificationToken, PushNotification } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import LoggerUtils from '../utils/LoggerUtils'; // Logger for structured logging
import DebugUtils from '../utils/DebugUtils';   // Debugging helper

export type PushNotificationConfig = {
  onRegister?: (token: string) => void;
  onNotificationReceived?: (notification: PushNotification) => void;
  onNotificationActionPerformed?: (action: any) => void;
  onError?: (error: any) => void;
  onPermissionDenied?: () => void;
};

type RetryConfig = {
  maxAttempts?: number; // Maximum retry attempts
  baseDelay?: number;   // Base delay for exponential backoff in ms
};

/**
 * PushNotificationManager Class
 * 
 * Manages push notifications for an Ionic React app. Supports device registration, 
 * notification handling, reattempts, scheduling of local notifications, and more.
 * 
 * **Features**:
 * - Registers the device for push notifications.
 * - Handles received push notifications and actions.
 * - Retry logic with exponential backoff.
 * - Program local notifications for future delivery.
 * - Manage silent notifications and cancellation.
 * 
 * **Usage**:
 * 1. Create an instance of `PushNotificationManager`.
 * 2. Call `registerForPushNotifications()` to register the device and receive push notifications.
 * 3. Optionally configure retry behavior, error handling, and scheduled notifications.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 2024
 */
export class PushNotificationManager {
  private logger: LoggerUtils;
  private debug: boolean;
  private registered: boolean = false;
  private retryCount: number = 0;
  private maxAttempts: number;
  private baseDelay: number;

  /**
   * Initializes the PushNotificationManager with optional configuration.
   * Sets up logger and debug mode. Handles optional retry configuration.
   * 
   * @param config - Optional configuration object for callbacks.
   * @param retryConfig - Optional configuration for retry logic (max attempts, base delay).
   * @param debug - Optional boolean to enable or disable debug logging.
   */
  constructor(
    private config?: PushNotificationConfig,
    retryConfig?: RetryConfig,
    debug?: boolean
  ) {
    this.debug = DebugUtils.setDebug(debug ?? false);
    this.logger = LoggerUtils.getInstance( this.debug, this.constructor.name);
    this.maxAttempts = retryConfig?.maxAttempts || 3;  // Default to 3 attempts
    this.baseDelay = retryConfig?.baseDelay || 1000;   // Default to 1 second delay

    {
      this.logger.info('PushNotificationManager initialized', { config });
    }

    // Set up listeners for push notification events
    this.setupPushListeners();
  }

  /**
   * Registers the device for push notifications.
   * If already registered, it skips registration. Uses retry logic in case of failure.
   */
  public async registerForPushNotifications(): Promise<void> {
    if (this.registered) {
      this.logger.info('Already registered for push notifications');
      return;
    }

    try {
      const permission = await PushNotifications.requestPermissions();
      if (permission.receive === 'granted') {
        this.logger.info('Push notification permission granted');
        PushNotifications.register();

        // Handle registration success
        PushNotifications.addListener('registration', (token: PushNotificationToken) => {
          this.logger.info('Push notification token:', token.value);
          this.config?.onRegister?.(token.value);
          this.registered = true;
          this.resetRetryCount(); // Reset retry count on success
        });

        // Handle registration errors
        PushNotifications.addListener('registrationError', (error) => {
          this.logger.error('Error during push registration:', error);
          this.retryRegistration();
        });
      } else {
        this.logger.warn('Push notification permission denied');
        this.config?.onPermissionDenied?.();
      }
    } catch (error) {
      this.handleError(error, 'Error registering for push notifications');
    }
  }

  /**
   * Retries registration after a failed attempt using exponential backoff.
   * The retry count is limited by the maxAttempts property.
   */
  private retryRegistration(): void {
    if (this.retryCount < this.maxAttempts) {
      const delay = this.getRetryDelay();
      this.logger.warn(`Retrying push notification registration in ${delay}ms`);
      
      setTimeout(() => {
        this.retryCount++;
        this.registerForPushNotifications();
      }, delay);
    } else {
      this.logger.error('Max retry attempts reached. Push notification registration failed.');
      this.config?.onError?.('Max retry attempts reached');
    }
  }

  /**
   * Calculates the delay using exponential backoff.
   * 
   * @returns {number} - The calculated delay in milliseconds.
   */
  private getRetryDelay(): number {
    return this.baseDelay * Math.pow(2, this.retryCount);
  }

  /**
   * Resets the retry count back to zero upon successful registration.
   */
  private resetRetryCount(): void {
    this.retryCount = 0;
  }

  /**
   * Cancels all active push notifications.
   */
  public async cancelAllNotifications(): Promise<void> {
    try {
      await PushNotifications.removeAllDeliveredNotifications();
      this.logger.info('All notifications cancelled');
    } catch (error) {
      this.handleError(error, 'Error cancelling notifications');
    }
  }

  /**
   * Schedules a local notification at a future date.
   * 
   * @param title - The title of the notification.
   * @param body - The body text of the notification.
   * @param scheduleDate - The date and time to trigger the notification.
   */
  public async scheduleLocalNotification(
    title: string,
    body: string,
    scheduleDate: Date
  ): Promise<void> {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id: new Date().getTime(), // Unique ID for the notification
            schedule: { at: scheduleDate },
            sound: undefined, // Omit sound property or set to undefined if not needed
            attachments: [],  // Empty array for no attachments
            actionTypeId: '',  // Set a valid actionTypeId if needed
            extra: {},         // Additional data if needed
          },
        ],
      });
      this.logger.info(`Local notification scheduled for: ${scheduleDate}`);
    } catch (error) {
      this.handleError(error, 'Error scheduling local notification');
    }
  }

  /**
   * Subscribes the device to a specific notification topic (for use with FCM).
   * 
   * @param topic - The topic to subscribe to.
   */
  public async subscribeToTopic(topic: string): Promise<void> {
    try {
      this.logger.info(`Subscribed to topic: ${topic}`);
      // Placeholder: You would need to handle this logic via FCM or other services
    } catch (error) {
      this.handleError(error, `Error subscribing to topic: ${topic}`);
    }
  }

  /**
   * Sets up listeners for push notification events.
   * Handles received notifications and actions performed on notifications.
   */
  private setupPushListeners(): void {
    // Listen for push notifications received
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      this.logger.info('Push notification received:', notification);
      this.config?.onNotificationReceived?.(notification);
    });

    // Listen for actions performed on push notifications
    PushNotifications.addListener('pushNotificationActionPerformed', (action: any) => {
      this.logger.info('Push notification action performed:', action);
      this.config?.onNotificationActionPerformed?.(action);
    });
  }

  /**
   * Centralized error handling for push notifications.
   * Logs the error and triggers the custom error callback if provided.
   * 
   * @param error - The error encountered during the push notification process.
   * @param message - A custom message to log along with the error.
   */
  private handleError(error: any, message: string): void {
    if (this.config?.onError) {
      this.config.onError(error);
    } else {
      this.logger.error(message, error);
    }
  }

  /**
   * Cleans up all listeners and resources to prevent memory leaks.
   */
  public cleanUp(): void {
    this.logger.info('Cleaning up PushNotificationManager resources');
    PushNotifications.removeAllListeners(); // Removes all registered listeners
  }
}

export default PushNotificationManager;
