import { ServiceManager } from "../classes/managers/ServiceManager";
import { RestManager } from "../classes/managers/RestManager";
import { sentryDns, sentryEnv, sentryToken } from '../app/config/env'; // Asegúrate de que `apiToken` sea el correcto para el Bearer
import { useLogger } from '../integrations/useLogger'

// Instancia de RestManager con el Bearer Token adecuado
const sentryRestManager = RestManager.getInstance(sentryDns, {
    Authorization: `Bearer ${sentryToken}` // Usa el token de API correcto
});

const logger = useLogger('useSentry');

const onRegister = (token: string) =>{
  logger.log('Sentry registered!', token);
}

const onNotificationReceived = (notification: any) =>{
  logger.log('Notification received!', notification);
}

const onError = (err: any) =>{
  logger.log('Notification error!', err);
}

// Instancia de ServiceManager, inyectando RestManager y las configuraciones necesarias
const useSentry = ServiceManager.getInstance(sentryRestManager, {
  SentryManagerConfig: { 
    dsn: sentryDns,
    environment: sentryEnv
  },
  pushNotificationConfig: {
    onRegister: onRegister,
    onNotificationReceived: onNotificationReceived,
    onError: onError,
  },
});

export default (!sentryDns || !sentryEnv) ? useSentry : null;

