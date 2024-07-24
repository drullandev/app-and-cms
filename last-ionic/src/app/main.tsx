import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '.';

// Get the root DOM element where the React app will be mounted
const container = document.getElementById('root');

// Create a root for rendering the React application
const root = createRoot(container!);

/**
 * React.StrictMode is a development tool that helps identify potential problems in an application.
 * It intentionally double-invokes certain lifecycle methods and effects to assist in detecting side effects
 * and other issues in development mode. This behavior helps ensure that components are resilient to unexpected
 * changes and side effects.
 *
 * In production builds, React.StrictMode is not applied, and the rendering behavior will be optimized for performance.
 * 
 * TODO: Consider setting `strictMode` to `true` for development to leverage these additional checks.
 *       If `false`, the application will render without the extra development checks, which might be less confusing
 *       but will miss the additional debugging assistance. Evaluate the impact based on your specific needs and development experience.
 */
const strictMode = true;

// Render the React application with or without StrictMode based on the `strictMode` flag
root.render(
  !strictMode 
    ? <App />
    : <StrictMode>
        <App />
      </StrictMode>
);
