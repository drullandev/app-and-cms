import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { LogoutProps } from './types';
import useUserStore from '../../../classes/stores/user.store';

// Componente Reducer
const LogoutPage: React.FC<LogoutProps> = () => {
  const setUserStore = useUserStore((state) => state.setUserStore);  // Asumimos que esto proviene del store
  
  useEffect(() => {
    // Limpiar los datos del usuario al desmontar el componente
    //setUserStore(null);
    // Solo se ejecuta una vez cuando el componente se monta
  }, [setUserStore]);

  return <Redirect to="/login" />;
}

export default LogoutPage;
