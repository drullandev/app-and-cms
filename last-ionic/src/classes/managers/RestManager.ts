import axios, { AxiosRequestConfig } from 'axios';

/**
 * This module provides a class `Rest` that encapsulates the functionality for making REST API calls.
 * It includes methods for performing synchronous and asynchronous calls, setting default request properties,
 * and handling responses and errors.
 *
 * Usage:
 * - Import the `Rest` class and call its methods with the appropriate `CallProps`.
 * - Define success, error, and finally handlers as needed.
 *
 * Example:
 * 
 * import Rest, { CallProps } from './path/to/Rest';
 *
 * const callProps: CallProps = {
 *   req: {
 *     method: 'get',
 *     url: 'api/endpoint',
 *   },
 *   onSuccess: {
 *     default: (response) => console.log('Success:', response),
 *   },
 *   onError: {
 *     default: (error) => console.error('Error:', error),
 *   },
 *   onFinally: () => console.log('Call finished'),
 * };
 *
 * // Perform a synchronous call
 * Rest.RestCall(callProps);
 *
 * // Perform an asynchronous call
 * Rest.RestCallAsync(callProps);
 *
 * This code is designed to be reusable and maintainable, ensuring default values are set and errors are properly handled.
 */

export interface CallProps {
  req: AxiosRequestConfig;
  onSuccess: {
    default: (response: any) => void;
  };
  onError: {
    default: (error: any) => void;
  };
  onFinally?: () => void;
}

/**
 * Class encapsulating operations for making REST calls.
 */
class RestCall {

  /**
   * Performs an asynchronous REST call.
   * @param call - The properties of the API call.
   * @returns A promise with the result of the call.
   */
  static async RestCallAsync(call: CallProps) {
    return this.setCall(this.commonCall(call));
  }

  /**
   * Performs a REST call.
   * @param call - The properties of the API call.
   * @returns A promise with the result of the call.
   */
  static RestCall(call: CallProps) {
    return this.setCall(this.commonCall(call));
  }

  /**
   * Modifies the API call properties, setting default values.
   * @param call - The properties of the API call.
   * @returns The modified call properties.
   */
  private static commonCall(call: CallProps): CallProps {

    // Set 'get' as the default method if not defined
    if (!call.req.method) {
      call.req.method = 'get';
    }

    // Set the base URL from environment variables
    call.req.url = call.req.url ? `${call.req.url}` : undefined;

    // Add the '?populate=*' parameter if the method is 'get'
    if (call.req.method.toLowerCase() === 'get') {
      call.req.url = `${call.req.url}?populate=*`;//TODO: Invest why
    }

    return call;
  }

  /**
   * Executes the API call using Axios and handles the responses.
   * @param call - The properties of the API call.
   * @returns A promise with the result of the Axios call.
   */
  private static async setCall(call: CallProps) {
    try {
      try {
        const res = await axios(call.req);
        return call.onSuccess.default(res);
      } catch (err) {
        return call.onError.default(err);
      }
    } finally {
      if (call.onFinally) {
        return call.onFinally();
      }
    }
  }

}

export default RestCall;