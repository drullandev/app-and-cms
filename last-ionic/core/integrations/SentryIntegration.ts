import { ServiceManager } from "../classes/managers/ServiceManager";

const useServiceManager = ServiceManager.getInstance({
  exceptionManagerConfig: { dsn: "your-sentry-dsn", environment: "production" },
  restManagerConfig: "https://api.example.com",
  pushNotificationConfig: {
    onRegister: (token) => console.log("Registered token:", token),
    onNotificationReceived: (notification) =>
      console.log("Notification received:", notification),
    onError: (error) => console.error("Push notification error:", error),
  },
});

export default useServiceManager;
