/**
 * CheckTrustClass is responsible for evaluating the trustworthiness of users based on their behavior 
 * and activity within a specified time window. It keeps track of failed login attempts, user actions, 
 * request times, and maintains a list of suspicious IP addresses.
 */
 class CheckTrustClass {

    private static instance: CheckTrustClass | null = null; // Singleton instance

    private failedAttempts: number = 0; // Count of failed login attempts
    private userActions: number[] = []; // Timestamps of user actions
    private requestTimes: number[] = []; // Timestamps of requests made
    private suspiciousIPs: string[] = []; // List of suspicious IP addresses
    // TODO: No se hace nada con blocked IP, hay que hacerlo!
    private blockedIPs: { [key: string]: number } = {}; // Dictionary of blocked IPs with unblock timestamp
    private maxFailedAttempts: number; // Maximum allowed failed attempts
    private maxActions: number; // Maximum allowed user actions
    private maxRequests: number; // Maximum allowed requests in the time window
    private timeWindow: number; // Time window in milliseconds for tracking actions
    private blocked = false;
    private blockDuration: number; // Default block duration in milliseconds

    /**
     * Constructor to initialize the CheckTrustClass with specific limits for failed attempts, 
     * user actions, requests, the time window, and block duration.
     * 
     * @param maxFailedAttempts - Maximum number of failed login attempts allowed.
     * @param maxActions - Maximum number of actions allowed within the time window.
     * @param maxRequests - Maximum number of requests allowed within the time window.
     * @param timeWindow - Time window in milliseconds for tracking user actions.
     * @param blockDuration - Duration in milliseconds for blocking IPs.
     */
    private constructor(
			maxFailedAttempts = 3,
			maxActions = 20,
			maxRequests = 60,
			timeWindow = 60000,
			blockDuration = 31536000000
    ) {
			this.maxFailedAttempts = maxFailedAttempts;
			this.maxActions = maxActions;
			this.maxRequests = maxRequests;
			this.timeWindow = timeWindow; 
			this.blockDuration = blockDuration;
    }

    /**
     * Get the singleton instance of CheckTrustClass.
     * 
     * @returns The singleton instance of CheckTrustClass.
     */
    public static getInstance(): CheckTrustClass {
			if (this.instance === null) {
				this.instance = new CheckTrustClass();
			}
			return this.instance;
    }

    /** 
     * Records a failed login attempt by incrementing the failed attempts counter.
     */
    private recordFailedAttempt() {
			this.failedAttempts++;
    }

    /** 
     * Resets the failed attempts counter to zero.
     */
    private resetFailedAttempts() {
			this.failedAttempts = 0;
    }

    /** 
     * Records a user action by capturing the current timestamp and filtering out old actions 
     * that fall outside the time window.
     */
    private recordUserAction() {
			const now = Date.now();
			this.userActions.push(now);
			this.userActions = this.userActions.filter(timestamp => now - timestamp <= this.timeWindow);
    }

    /** 
     * Records a request by capturing the current timestamp and filtering out old requests 
     * that fall outside the time window.
     */
    private recordRequest() {
			const now = Date.now();
			this.requestTimes.push(now);
			this.requestTimes = this.requestTimes.filter(timestamp => now - timestamp <= this.timeWindow);
    }

    /** 
     * Checks if the provided IP address is in the list of suspicious IPs.
     * 
     * @param ip - The IP address to check.
     * @returns boolean - True if the IP address is suspicious, false otherwise.
     */
    private checkIPAddress(ip: string): boolean {
			return this.suspiciousIPs.includes(ip);
    }
        
    /** 
     * Checks if the provided IP address is in the list of suspicious IPs.
     * 
     * @param ip - The IP address to check.
     * @returns boolean - True if the IP address is suspicious, false otherwise.
     */
    public getTrustScore(ip: string): number {

			let score = 10; // Iniciamos con la máxima puntuación

			// Penaliza la puntuación según los criterios
			if (this.failedAttempts >= this.maxFailedAttempts) {
				score -= 5; // Reduce la puntuación si se alcanzan los intentos fallidos
			}

			if (this.userActions.length >= this.maxActions) {
				score -= 3; // Reduce la puntuación si se alcanzan las acciones
			}

			if (this.checkIPAddress(ip)) {
				score -= 4; // Reduce la puntuación si la IP es sospechosa
			}

			if (this.requestTimes.length > this.maxRequests) {
				score -= 2; // Reduce la puntuación si se alcanzan las solicitudes
			}

			// Aseguramos que la puntuación esté entre 0 y 10
			if (score == 0) {
				this.blocked = true;
			}

			return Math.max(0, Math.min(10, score));
    }

    public handleUserAction(ip: string, success: boolean): void {
			if (!success) {
				this.recordFailedAttempt();
			} else {
				this.resetFailedAttempts();
			}

			this.recordUserAction();
			this.recordRequest();
    }

    public addSuspiciousIP(ip: string): void {
			if (!this.suspiciousIPs.includes(ip)) {
				this.suspiciousIPs.push(ip);
				// TODO: Save to database
			}
    }

    public removeSuspiciousIP(ip: string): void {
			this.suspiciousIPs = this.suspiciousIPs.filter(suspiciousIP => suspiciousIP !== ip);
    }

    // Método adicional para mostrar el estado de confianza
    public displayTrustStatus(ip: string): void {
			const trustScore = this.getTrustScore(ip);
			console.log(`El usuario tiene un puntaje de confianza de: ${trustScore}`);
    }

    public isBlocked(ip: string): boolean {
			return this.blockedIPs[ip]!== undefined;
    }
}

export default CheckTrustClass;
