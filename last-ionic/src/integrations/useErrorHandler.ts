import { useCallback } from 'react';
import * as Sentry from '@sentry/react';

interface ErrorHandlerOptions {
  notifyUser?: boolean;  // Si quieres notificar al usuario de los errores
  logError?: boolean;    // Si quieres registrar el error en un servicio como Sentry
}

const useErrorHandler = () => {

  // Manejador de errores centralizado
  const handleError = useCallback((error: unknown, options: ErrorHandlerOptions = { notifyUser: true, logError: true }) => {
    // Notificar al usuario si se especifica
    if (options.notifyUser) {
      alert('Algo salió mal. Por favor, inténtalo de nuevo.');  // Puedes reemplazar alert por una mejor notificación
    }

    // Registrar el error en Sentry u otro servicio
    if (options.logError) {
      Sentry.captureException(error);  // Registramos el error en Sentry
    }

    // También puedes hacer otras cosas aquí como logging adicional o redirigir a una página de error
    console.error(error); // Logging en consola para desarrollo
  }, []);

  return { handleError };

};

export default useErrorHandler;
