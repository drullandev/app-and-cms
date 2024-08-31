import axios from 'axios';
import NodeCache from 'node-cache';
import LoggerClass, { initializeLogger } from '../utils/LoggerUtils';

/**
 * StrapiManager provides functionality to interact with the Strapi API, including 
 * caching, retry mechanisms, and support for webhooks. It is designed to improve 
 * performance and resiliency when communicating with Strapi.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date August 31, 2024
 */
class StrapiManager {
  private static instance: StrapiManager | null = null;
  private logger: LoggerClass;
  private cache: NodeCache;

  /**
   * Private constructor to enforce Singleton pattern. Initializes the logger 
   * and cache for storing Strapi API responses.
   */
  private constructor() {
    this.logger = initializeLogger(this.constructor.name, false, 100);
    this.cache = new NodeCache({ stdTTL: 600 }); // Cache TTL set to 10 minutes
  }

  /**
   * Returns the singleton instance of StrapiManager, creating it if it doesn't exist.
   *
   * @returns The singleton instance of StrapiManager.
   */
  public static getInstance(): StrapiManager {
    if (this.instance === null) {
      this.instance = new StrapiManager();
    }
    return this.instance;
  }

  /**
   * Registers a webhook listener in Strapi.
   *
   * @param url - The URL of the webhook to register.
   * @param events - Array of events to listen to.
   */
  public async registerWebhook(url: string, events: string[]): Promise<void> {
    try {
      const response = await axios.post('/strapi/webhooks', {
        url,
        events,
      });
      this.logger.info('Webhook registered successfully', response.data);
    } catch (error) {
      this.logger.error('Error registering webhook', error);
    }
  }

  /**
   * Handles incoming webhook events from Strapi.
   * This method should be called by the route that receives the webhooks.
   *
   * @param event - The event data sent by Strapi.
   */
  public handleWebhookEvent(event: any): void {
    this.logger.info('Received Strapi webhook event', event);
    // Add your logic to handle the event here.
  }

  /**
   * Fetches data from Strapi with caching and retry logic.
   *
   * @param endpoint - The Strapi endpoint to query.
   * @param retries - Number of retry attempts in case of failure.
   * @returns The data from Strapi, either from cache or fresh.
   */
  public async fetchDataWithRetry(endpoint: string, retries: number = 3): Promise<any> {
    const cacheKey = `strapi_${endpoint}`;
    const cachedData = this.cache.get(cacheKey);

    if (cachedData) {
      this.logger.info(`Cache hit for ${endpoint}`);
      return cachedData;
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await axios.get(endpoint);
        this.cache.set(cacheKey, response.data);
        this.logger.info(`Cache miss for ${endpoint}, data cached`);
        return response.data;
      } catch (error) {
        this.logger.warn(`Attempt ${attempt} failed for ${endpoint}`);
        if (attempt === retries) {
          this.logger.error('Max retries reached, unable to fetch data', error);
          throw error;
        }
      }
    }
  }

  /**
   * Fetches data from Strapi with caching, retry logic, and fallback.
   *
   * @param endpoint - The Strapi endpoint to query.
   * @param retries - Number of retry attempts in case of failure.
   * @param fallbackData - Optional fallback data to return in case of failure.
   * @returns The data from Strapi, either from cache, fresh, or fallback.
   */
  public async fetchDataWithFallback(endpoint: string, retries: number = 3, fallbackData?: any): Promise<any> {
    try {
      return await this.fetchDataWithRetry(endpoint, retries);
    } catch (error) {
      this.logger.warn(`Returning fallback data for ${endpoint}`);
      return fallbackData || null;
    }
  }
}

export default StrapiManager;
