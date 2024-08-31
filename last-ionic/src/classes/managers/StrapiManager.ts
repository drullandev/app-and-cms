import { CallProps } from "./RestManager";
import mainRest from "../../integrations/RestIntegration";
import LoggerClass from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

/**
 * StrapiCrud provides a utility function for performing CRUD operations on a Strapi model.
 * It abstracts the HTTP method and URL construction, allowing for easy interaction with
 * Strapi's REST API. The function supports the following operations: insert, update, delete, get, and options.
 *
 * @param operation - The CRUD operation to perform. Valid options are 'insert', 'update', 'delete', 'get', and 'options'.
 * @param model - The name of the Strapi model to operate on. This should be the singular form of the model name.
 * @param data - Optional. The data to be sent with the request, typically for 'insert', 'update', and 'delete' operations.
 * @param onSuccess - Optional. A callback function to be executed if the request is successful.
 * @param onError - Optional. A callback function to be executed if the request fails.
 * @returns A promise that resolves with the result of the RestManager's makeCall function.
 *
 * @example
 * // Example usage of StrapiCrud to fetch an article with ID 1:
 * StrapiCrud('get', 'article', { id: 1 }, (data) => console.log(data), (err) => console.error(err));
 *
 * @author David Rullán - https://github.com/drullandev
 * @date Agoust 31, 2024
 */
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";
type StrapiOperations = "insert" | "update" | "delete" | "get" | "options";

export const StrapiCrud = (
  operation: StrapiOperations,
  model: string,
  data?: any,
  onSuccess?: Function,
  onError?: Function
) => {
  const debug = DebugUtils.setDebug(false);
  const logger = LoggerClass.getInstance("StrapiCrud", debug, 100);

  // Determine the appropriate HTTP method based on the operation
  const method: HttpMethod =
    operation === "insert"
      ? "PUT"
      : operation === "update"
      ? "POST"
      : operation === "delete"
      ? "DELETE"
      : operation === "get"
      ? "GET"
      : operation === "options"
      ? "OPTIONS"
      : "GET"; // Default to GET if no match

  // Construct the API endpoint URI, pluralizing the model name according to Strapi's convention
  let uri = `${model}s`;

  // If the method is GET, construct a query string with the provided data
  if (method === "GET") {
    let queryStr = "/";
    Object.entries(data || {}).forEach(([key, value]) => {
      queryStr =
        key === "id" ? `${queryStr}${value}` : `${queryStr}${key}=${value}&`;
    });
    queryStr = queryStr.replace(/&+$/, ""); // Remove trailing ampersand
    uri += queryStr;
  }

  logger.info("Preparing Strapi CRUD operation", { operation, model, method, uri, data });

  // Prepare the call properties for the RestManager
  let call: CallProps = {
    req: {
      url: `api/${uri}`,
      data: method !== "GET" ? data : undefined, // Only include data for non-GET requests
      method: method,
    },
    onSuccess: {
      default: onSuccess
        ? (ret: any) => {
            logger.info("Strapi CRUD operation successful", { data: ret });
            onSuccess(ret);
          }
        : () => {},
    },
    onError: {
      default: onError
        ? (err: Error) => {
            logger.error("Strapi CRUD operation failed", err);
            onError(err);
          }
        : () => {},
    },
  };

  // Call the RestManager's makeCall function using the prepared call properties
  return mainRest.makeCall(call);
};
