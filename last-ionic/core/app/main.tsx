import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ServiceWorker } from '../classes/workers/ServiceWorker';
import i18n from '../components/main/i18n';
import AppContainer from './index';
import ToastManager from '../classes/managers/ToastManager';

const strictMode = false; // Set to `true` during development
const registerSW = true; // Set to `false` if you don't want to register the service worker

const renderApp = () => {

  // Get the root DOM element where the React app will be mounted
  const container = document.getElementById('root');
  
  if (!container) {
    console.error('Root container element not found');
    return;
  }

  // Create a root for rendering the React application
  const root = createRoot(container);
  
  // Create an instance of the service worker service
  const sw = new ServiceWorker();

  // Determine the environment
  const isProduction = import.meta.env.NODE_ENV === 'production';

  // Verifica si `i18next` está listo antes de renderizar la aplicación
  i18n
    .init()
    .then(() => {

      if (isProduction) {
        root.render(
          <>
            <AppContainer />
            <ToastManager />
          </>
        );
        sw.register();
      } else {
        root.render(
          <>
            {strictMode
              ? <StrictMode>
                  <AppContainer />
                </StrictMode>
              : <AppContainer />
            }
            <ToastManager />
          </>
        );

        if (registerSW) {
          sw.register();
        } else {
          sw.unregister();
        }
      }

    })
    .catch((error) => {
      console.error('Error initializing i18next:', error);
    });

}

renderApp();
