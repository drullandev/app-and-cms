import React, { useEffect } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAppRest } from '../../../integrations/all-Integrations';

interface FetchDataWrapperProps<T> {
  url: string;
  params?: Record<string, any>;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, any>;
  headers?: Record<string, string>;  // Nueva prop para aceptar cabeceras
  queryOptions?: UseQueryOptions<T, unknown, T, [string, Record<string, any>]>;
  onSuccessCallback?: (data: T) => void;
  ZustandStore: any;
  ZustandActions: any;
  LoadingComponent?: React.ReactNode;  // Componente para mostrar mientras se carga
  ErrorComponent?: React.ReactNode;    // Componente para mostrar en caso de error
  children: React.ReactNode;
}

const FetchDataWrapper: React.FC<FetchDataWrapperProps<any>> = ({
  url,
  params = {},
  method = 'GET',
  body = {},
  headers = {},  // Prop de cabeceras con un valor por defecto vacío
  queryOptions = {},
  onSuccessCallback,
  ZustandStore,
  ZustandActions,
  LoadingComponent = <div>Loading...</div>, // Componente predeterminado
  ErrorComponent = <div>Error loading data</div>, // Componente predeterminado
  children,
}) => {
  const { setData, setLoading } = ZustandActions;
  const ZustandState = ZustandStore();

  // Define la función para obtener datos usando RestCall
  const fetchData = async () => {
    const response = await useAppRest.makeRequest({
      method: method,
      url: url,
      data: body,
      params: params,
      headers: { 
        ...headers,  // Añade las cabeceras personalizadas aquí
        Authorization: 'Bearer your_token' // Ejemplo de cabecera, puedes eliminarlo o modificarlo
      }
    });
    return response;
  };

  // Usa useQuery con queryKey, queryFn y opcionalmente, queryOptions
  const { data, isLoading, error } = useQuery({
    queryKey: [url, params],  // queryKey
    queryFn: fetchData,      // queryFn
    ...queryOptions          // Opciones opcionales de React Query
  });

  // Actualiza el estado de carga en Zustand
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  // Cuando los datos están disponibles, actualiza el store de Zustand
  useEffect(() => {
    if (data) {
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    }
  }, [data, onSuccessCallback]);

  // Maneja los estados de carga y error
  if (isLoading) return <>{LoadingComponent}</>;
  if (error) return <>{ErrorComponent}</>;

  // Renderiza los children si todo está bien
  return <>{children}</>;
};

export default FetchDataWrapper;
