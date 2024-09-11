import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAppRest from '../../../../src/integrations/RestIntegration';
const FetchDataWrapper = ({ url, params = {}, method = 'GET', body = {}, queryOptions = {}, onSuccessCallback, ZustandStore, ZustandActions, LoadingComponent = _jsx("div", { children: "Loading..." }), // Componente predeterminado
ErrorComponent = _jsx("div", { children: "Error loading data" }), // Componente predeterminado
children, }) => {
    const { setData, setLoading } = ZustandActions;
    const ZustandState = ZustandStore();
    // Define la función para obtener datos usando RestCall
    const fetchData = async () => {
        const callProps = {
            req: {
                url,
                method,
                params,
                data: body,
            },
            onSuccess: {
                default: (response) => response.data, // Retorna los datos directamente
            },
            onError: {
                default: (error) => {
                    throw error; // Deja que React Query maneje el error
                },
            },
        };
        return useAppRest.makeAsyncCall(callProps);
    };
    // Usa useQuery con queryKey, queryFn y opcionalmente, queryOptions
    const { data, isLoading, error } = useQuery({
        queryKey: [url, params], // queryKey
        queryFn: fetchData, // queryFn
        ...queryOptions // Opciones opcionales de React Query
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
    if (isLoading)
        return _jsx(_Fragment, { children: LoadingComponent });
    if (error)
        return _jsx(_Fragment, { children: ErrorComponent });
    // Renderiza los children si todo está bien
    return _jsx(_Fragment, { children: children });
};
export default FetchDataWrapper;
