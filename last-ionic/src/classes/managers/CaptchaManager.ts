class CaptchaManager {

    private failedAttempts: number = 0;
    private userActions: number[] = [];
    private requestTimes: number[] = [];
    private suspiciousIPs: string[] = []; // TODO: save and get from a database...
    private maxFailedAttempts: number;
    private maxActions: number;
    private maxRequests: number;
    private timeWindow: number;
  
    constructor(maxFailedAttempts = 3, maxActions = 20, maxRequests = 60, timeWindow = 60000) {
      this.maxFailedAttempts = maxFailedAttempts;
      this.maxActions = maxActions;
      this.maxRequests = maxRequests;
      this.timeWindow = timeWindow; // Tiempo en milisegundos (1 minuto)
    }
  
    private recordFailedAttempt() {
      this.failedAttempts++;
    }
  
    private resetFailedAttempts() {
      this.failedAttempts = 0;
    }
  
    private recordUserAction() {
      const now = Date.now();
      this.userActions.push(now);
  
      // Eliminar acciones fuera de la ventana de tiempo
      this.userActions = this.userActions.filter(timestamp => now - timestamp <= this.timeWindow);
    }
  
    private recordRequest() {
      const now = Date.now();
      this.requestTimes.push(now);
  
      // Eliminar solicitudes fuera de la ventana de tiempo
      this.requestTimes = this.requestTimes.filter(timestamp => now - timestamp <= this.timeWindow);
    }
  
    private checkIPAddress(ip: string): boolean {
      return this.suspiciousIPs.includes(ip);
    }
  
    public shouldShowCaptcha(ip: string): boolean {
      return (
        this.failedAttempts >= this.maxFailedAttempts ||
        this.userActions.length >= this.maxActions ||
        this.checkIPAddress(ip) ||
        this.requestTimes.length > this.maxRequests
      );
    }
  
    public handleLoginAttempt(ip: string, success: boolean): boolean {
      if (!success) {
        this.recordFailedAttempt();
      } else {
        this.resetFailedAttempts();
      }
  
      this.recordUserAction();
      this.recordRequest();
  
      return this.shouldShowCaptcha(ip);
    }
  
    public showCaptcha() {
      // Aquí puedes agregar el código para mostrar el CAPTCHA (e.g., Google reCAPTCHA)
      console.log("Mostrar CAPTCHA");
    }

  }
  
  export default new CaptchaManager();