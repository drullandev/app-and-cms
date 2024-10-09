import { useEffect } from 'react';
import RestManager, { IRestManager } from '../classes/managers/RestManager';
import { apiUrl } from '../app/config/env';
import useUserStore, { IUserStore } from '../integrations/stores/user.store';

// Instancia singleton de RestManager
const restManagerInstance: IRestManager = RestManager.getInstance(apiUrl);

// Hook para manejar el RestManager y actualizar los headers cuando el JWT cambie
const useAppRest = (): IRestManager => {
  const jwt = null;//useUserStore((state: IUserStore) => state.jwt);  // Obtenemos el JWT del store

  // Usamos useEffect para actualizar los headers cuando el JWT cambie

    if (jwt) {
      restManagerInstance.updateHeaders({ Authorization: `Bearer ${jwt}` });
    } else {
      restManagerInstance.updateHeaders({ Authorization: '' });
    }


  // Retornamos la instancia del RestManager
  return restManagerInstance;
};

export default useAppRest();

