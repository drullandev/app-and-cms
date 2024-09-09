import RestManager, { IRestManager } from '../managers/RestManager';

/**
 * This is the single instance of RestManager that will be used throughout the application.
 * It can optionally include an authorization token if needed.
 * 
 * @param token - Optional Bearer token to be used for authorization.
 * @returns A singleton instance of RestManager.
 */
const useAppRest: IRestManager = RestManager.getInstance(process.env.REACT_APP_API_URL);

export default useAppRest;
