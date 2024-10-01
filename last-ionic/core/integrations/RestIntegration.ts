import RestManager from "../classes/managers/RestManager";
import { apiUrl } from '../app/config/env';

/**
 * This is the single instance of RestManager that will be used throughout the application.
 * It can optionally include an authorization token if needed.
 *
 * @param token - Optional Bearer token to be used for authorization.
 * @returns A singleton instance of RestManager.
 */
const useAppRest: RestManager = RestManager.getInstance(apiUrl);

export default useAppRest;
