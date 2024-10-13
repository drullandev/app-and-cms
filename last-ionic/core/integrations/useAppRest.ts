import { RestManager, IRestManager } from '../classes/managers/RestManager';
import { apiUrl } from '../app/config/env';

const useAppRest: IRestManager = RestManager.getInstance(apiUrl);

export default useAppRest;