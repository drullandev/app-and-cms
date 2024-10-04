import React, { useEffect } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAppRest } from '../../../integrations/all-Integrations';
import { Method } from 'axios';

/**
 * DataWrapper is a higher-order React component that handles the process of fetching data
 * from an API endpoint, managing loading and error states, and passing the retrieved data 
 * to child components. It leverages Zustand for state management and React Query for data 
 * fetching and caching. The component also allows for custom headers, HTTP methods, and 
 * callbacks on successful data retrieval.
 * 
 * Props include options for setting loading and error components, and passing additional 
 * request parameters, headers, and body data.
 * 
 * @template T The expected shape of the data being fetched.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date October 1, 2024
 */
interface DataWrapperProps<T> {
  url: string;
  params?: Record<string, any>;  // Optional params to be passed with the request
  method?: Method;  // HTTP method to use (default: GET)
  body?: Record<string, any>;  // Optional body data for POST/PUT requests
  headers?: Record<string, string>;  // Optional headers for the request
  queryOptions?: UseQueryOptions<T, unknown, T, [string, Record<string, any>]>;  // React Query options
  onSuccessCallback?: (data: T) => void;  // Callback to be invoked when data is successfully fetched
  ZustandStore: any;  // Zustand store to manage state
  ZustandActions: any;  // Zustand actions to modify the store
  LoadingComponent?: React.ReactNode;  // Component to show during loading
  ErrorComponent?: React.ReactNode;  // Component to show in case of error
  children: React.ReactNode;  // Children components to render when data is loaded
}

const DataWrapper: React.FC<DataWrapperProps<any>> = ({
  url,
  params = {},
  method = 'GET',
  body = {},
  headers = {},  // Default headers value
  queryOptions = {},
  onSuccessCallback,
  ZustandStore,
  ZustandActions,
  LoadingComponent = <div>Loading...</div>,  // Default loading component
  ErrorComponent = <div>Error loading data</div>,  // Default error component
  children,
}) => {
  const { setAppStore, setLoading } = ZustandActions;
  const ZustandState = ZustandStore();

  // Function to fetch data using useAppRest
  const fetchData = async () => {
    const response = await useAppRest.makeRequest({
      method: method,
      url: url,
      data: body,
      params: params,
      headers: { 
        ...headers,  // Merge custom headers with default headers
        Authorization: 'Bearer your_token'  // Example header (can be modified or removed)
      }
    });
    return response;
  };

  // Use useQuery to handle data fetching and caching
  const { data, isLoading, error } = useQuery({
    queryKey: [url, params],  // Unique key for caching purposes
    queryFn: fetchData,  // Function to fetch data
    ...queryOptions  // Additional React Query options
  });

  // Update the loading state in Zustand store
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  // Handle data once it's fetched, optionally invoke a success callback
  useEffect(() => {
    if (data) {
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    }
  }, [data, onSuccessCallback]);

  // Handle loading and error states
  if (isLoading) return <>{LoadingComponent}</>;
  if (error) return <>{ErrorComponent}</>;

  // Render children components if data is successfully loaded
  return <>{children}</>;
};

export default DataWrapper;
