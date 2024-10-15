import { RestManager, IRestManager } from '../classes/managers/RestManager';
import { apiUrl } from '../app/config/env';
import axios from 'axios';

export const apiRestInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const useAppRest: IRestManager = RestManager.getInstance(apiRestInstance);

export default useAppRest;

