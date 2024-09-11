interface TimerOptions {
  leading?: boolean;  // Execute function at the beginning of the debounce/throttle cycle
  trailing?: boolean; // Execute function at the end of the debounce/throttle cycle
  onError?: (error: any) => void;  // Optional error handler for execution issues
}

/**
 * Class responsible for managing timers and aborting operations.
 * It encapsulates the logic for running delayed operations and handles abortion if needed.
 * 
 * @author David Rullán
 * @date September 7, 2024
 */
class TimerHandler {
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private callback: Function, 
    private delay: number, 
    private thisArg?: any, 
    private abortController?: AbortController
  ) {}

  /**
   * Starts the timer and returns a promise that resolves when the timer finishes
   * or rejects if the operation is aborted.
   * 
   * @param args The arguments to pass to the callback.
   * @returns A promise that resolves or rejects based on the timer and abort state.
   */
  public start(args: any[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.abortController?.signal.aborted) {
        reject('Operation aborted');
        return;
      }
      this.timer = setTimeout(() => {
        if (this.abortController?.signal.aborted) {
          reject('Operation aborted');
        } else {
          this.callback.apply(this.thisArg, args);
          resolve();
        }
      }, this.delay);
    });
  }

  /**
   * Clears the timer if it exists, ensuring no future execution of the callback.
   */
  public clear() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

/**
 * Utility class for managing function execution delays, throttling, and debouncing.
 * This class provides advanced options such as leading/trailing executions and error handling.
 * 
 * @author David Rullán
 * @date September 7, 2024
 */
class FunctionUtils {
  private static instance: FunctionUtils | null = null;
  private debounceTimers: WeakMap<Function, TimerHandler> = new WeakMap();
  private delayTimers: WeakMap<Function, TimerHandler> = new WeakMap();

  /**
   * Retrieves the singleton instance of FunctionUtils. If the instance does not exist, it is created.
   * 
   * @returns The singleton instance of FunctionUtils.
   */
  public static getInstance(): FunctionUtils {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  /**
   * Validates that the provided callback is a function.
   * 
   * @param callback The function to validate.
   * @throws Error if the provided callback is not a function.
   */
  private validateCallback(callback: Function): void {
    if (typeof callback !== 'function') {
      throw new Error('The callback provided must be a function.');
    }
  }

  /**
   * Validates that the provided delay is a non-negative number.
   * 
   * @param delay The delay in milliseconds.
   * @throws Error if the delay is not a valid non-negative number.
   */
  private validateDelay(delay: number): void {
    if (typeof delay !== 'number' || delay < 0) {
      throw new Error('The delay must be a non-negative number.');
    }
  }

  /**
   * Debounce function that delays the execution of the callback until after
   * a specified delay period has passed since the last invocation. It supports
   * options for leading and trailing executions, and error handling.
   * 
   * @param callback The function to debounce.
   * @param delay The debounce delay in milliseconds.
   * @param options Configuration options for leading/trailing execution and error handling.
   * @param thisArg The context in which to invoke the callback.
   * @param abortController Optional AbortController to allow for cancellation of the debounce.
   * @returns A debounced version of the callback.
   */
  public debounce<T extends (...args: any[]) => void>(
    callback: T, 
    delay: number, 
    options: TimerOptions = {},
    thisArg?: any, 
    abortController?: AbortController
  ): (...args: Parameters<T>) => Promise<void> {
    this.validateCallback(callback);
    this.validateDelay(delay);

    let timer: TimerHandler | null = null;
    let lastArgs: Parameters<T> | null = null;

    return (...args: Parameters<T>): Promise<void> => {
      if (options.leading && !timer) {
        callback.apply(thisArg, args);
      }

      return new Promise((resolve, reject) => {
        if (timer) {
          timer.clear();
        }

        lastArgs = args;
        timer = new TimerHandler(() => {
          if (options.trailing && lastArgs) {
            callback.apply(thisArg, lastArgs);
          }
          resolve();
        }, delay, thisArg, abortController);

        timer.start().catch((err) => {
          if (options.onError) {
            options.onError(err);
          }
          reject(err);
        });
      });
    };
  }

  /**
   * Throttle function that ensures the callback is invoked at most once within the specified limit.
   * Supports options for leading/trailing execution and error handling.
   * 
   * @param callback The function to throttle.
   * @param limit The time limit in milliseconds between function invocations.
   * @param options Configuration options for leading/trailing execution and error handling.
   * @param thisArg The context in which to invoke the callback.
   * @param abortController Optional AbortController to allow for cancellation of the throttle.
   * @returns A throttled version of the callback.
   */
  public throttle<T extends (...args: any[]) => void>(
    callback: T, 
    limit: number, 
    options: TimerOptions = {},
    thisArg?: any, 
    abortController?: AbortController
  ): (...args: Parameters<T>) => Promise<void> {
    this.validateCallback(callback);
    this.validateDelay(limit);

    let lastCall = 0;

    return (...args: Parameters<T>): Promise<void> => {
      const now = Date.now();
      return new Promise((resolve, reject) => {
        if (abortController?.signal.aborted) {
          reject('Operation aborted');
          return;
        }

        if (now - lastCall >= limit) {
          lastCall = now;
          const handler = new TimerHandler(callback, 0, thisArg, abortController);
          handler.start(args).then(resolve).catch((err) => {
            if (options.onError) {
              options.onError(err);
            }
            reject(err);
          });
        }
      });
    };
  }

  /**
   * Delay function that delays the execution of the callback for a specified time.
   * Supports error handling and cancellation via AbortController.
   * 
   * @param callback The function to delay.
   * @param delay The delay in milliseconds.
   * @param options Configuration options for error handling.
   * @param thisArg The context in which to invoke the callback.
   * @param abortController Optional AbortController to allow for cancellation of the delay.
   * @returns A promise that resolves when the delay is complete or rejects if aborted.
   */
  public delay<T extends (...args: any[]) => void>(
    callback: T, 
    delay: number, 
    options: TimerOptions = {},
    thisArg?: any, 
    abortController?: AbortController
  ): Promise<void> {
    this.validateCallback(callback);
    this.validateDelay(delay);

    return new Promise((resolve, reject) => {
      if (this.delayTimers.has(callback)) {
        this.delayTimers.get(callback)?.clear();
      }

      const handler = new TimerHandler(callback, delay, thisArg, abortController);
      this.delayTimers.set(callback, handler);

      handler.start().then(resolve).catch((err) => {
        if (options.onError) {
          options.onError(err);
        }
        reject(err);
      });
    });
  }

  /**
   * Clears the timers for the specified callback, preventing any pending executions.
   * 
   * @param callback The callback whose timers should be cleared.
   */
  public clear(callback: Function) {
    this.validateCallback(callback);
    if (this.debounceTimers.has(callback)) {
      this.debounceTimers.get(callback)?.clear();
      this.debounceTimers.delete(callback);
    }
    if (this.delayTimers.has(callback)) {
      this.delayTimers.get(callback)?.clear();
      this.delayTimers.delete(callback);
    }
  }

  /**
   * Clears all active debounce and delay timers.
   * This is useful for resetting the state of the utility.
   */
  public clearAll() {
    this.debounceTimers = new WeakMap();
    this.delayTimers = new WeakMap();
  }
}

export default FunctionUtils.getInstance();
