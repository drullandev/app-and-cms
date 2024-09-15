import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppContainer from './index';
import { ServiceWorker } from '../classes/workers/ServiceWorker';
import i18n from '../components/main/i18n';
import React from 'react';

const strictMode = false; // Set to `true` during development
const registerSW = true; // Set to `false` if you don't want to register the service worker

/**
 * Sets up the React application with or without StrictMode based on the environment.
 */
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
  const isProduction = process.env.NODE_ENV === 'production';

  // Verifica si `i18next` está listo antes de renderizar la aplicación
  i18n
    .init()
    .then(() => {

      if (isProduction) {
        root.render(<AppContainer />);
        sw.register();
      } else {
        root.render(
          strictMode
            ? <StrictMode>
                <AppContainer />
              </StrictMode>
            : <AppContainer />
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
