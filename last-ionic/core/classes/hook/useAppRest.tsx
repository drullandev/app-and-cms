// useAppRest.ts

import { useEffect } from 'react';
import RestManager from '../../classes/managers/RestManager';
import { apiUrl } from '../../app/config/env';
import useUserStore from '../../integrations/stores/user.store';

const restManagerInstance = RestManager.getInstance(apiUrl);

const useAppRest = (): RestManager => {
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
