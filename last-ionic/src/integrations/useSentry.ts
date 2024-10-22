import axios from 'axios';
import { useLogger } from './useLogger'
import { RestManager } from "../classes/managers/RestManager";
import { ServiceManager } from "../classes/managers/ServiceManager";
import { sentryDns, sentryEnv, sentryToken } from '../app/config/env';

export const sentryInstance = axios.create({
  baseURL: sentryDns,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sentryToken}`
  },
});

export const sentryApiRest = RestManager.getInstance(sentryInstance)

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

const useSentry = ServiceManager.getInstance(sentryApiRest, {
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
