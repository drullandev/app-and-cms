import React, { useEffect } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import RestCall, { CallProps } from '../../classes/utils/RestUtils'; // Importa la clase RestCall

interface FetchDataWrapperProps<T> {
  url: string;
  params?: Record<string, any>;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, any>;
  queryOptions?: UseQueryOptions<T, unknown, T, [string, Record<string, any>]>;
  onSuccessCallback?: (data: T) => void;
  ZustandStore: any;
  ZustandActions: {
    setData: (data: T) => void;
    setLoading: (isLoading: boolean) => void;
  };
  LoadingComponent?: React.ReactNode;  // Componente para mostrar mientras se carga
  ErrorComponent?: React.ReactNode;    // Componente para mostrar en caso de error
  children: React.ReactNode;
}

const FetchDataWrapper: React.FC<FetchDataWrapperProps<any>> = ({
  url,
  params = {},
  method = 'GET',
  body = {},
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
    const callProps: CallProps = {
      req: {
        url,
        method,
        params,
        data: body,
      },
      onSuccess: {
        default: (response) => response.data,  // Retorna los datos directamente
      },
      onError: {
        default: (error) => {
          throw error;  // Deja que React Query maneje el error
        },
      },
    };

    return RestCall.restCallAsync(callProps);
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
      setData(data);
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    }
  }, [data, setData, onSuccessCallback]);

  // Maneja los estados de carga y error
  if (isLoading) return <>{LoadingComponent}</>;
  if (error) return <>{ErrorComponent}</>;

  // Renderiza los children si todo está bien
  return <>{children}</>;
};

export default FetchDataWrapper;
