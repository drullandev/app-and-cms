import { useEffect } from 'react';
import RestManager, { IRestManager } from '../classes/managers/RestManager';
import { apiUrl } from '../app/config/env';
import useUserStore from '../integrations/stores/user.store';

const restManagerInstance = RestManager.getInstance(apiUrl);

const useAppRest = (): IRestManager => { // Retornamos RestManager
  const jwt = useUserStore((state) => state.jwt);

  useEffect(() => {
    if (jwt) {
      restManagerInstance.updateHeaders({ Authorization: `Bearer ${jwt}` });
    } else {
      restManagerInstance.updateHeaders({ Authorization: '' });
    }
  }, [jwt]);

  return restManagerInstance;
};

export default useAppRest;
