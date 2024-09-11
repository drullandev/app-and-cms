import axios from "axios";
import NodeCache from "node-cache";
import LoggerUtils, {initLogger } from "../utils/LoggerUtils";
import DebugUtils from "../utils/DebugUtils";

/**
 * Interface for the StrapiManager class.
 * Describes the methods and properties available in StrapiManager.
 */
interface IStrapiManager {
  /**
   * Registers a webhook listener in Strapi.
   * @param url - The URL of the webhook to register.
   * @param events - Array of events to listen to.
   */
  registerWebhook(url: string, events: string[]): Promise<void>;

  /**
   * Handles incoming webhook events from Strapi.
   * @param event - The event data sent by Strapi.
   */
  handleWebhookEvent(event: any): void;

  /**
   * Fetches data from Strapi with caching and retry logic.
   * @param endpoint - The Strapi endpoint to query.
   * @param retries - Number of retry attempts in case of failure.
   * @returns The data from Strapi, either from cache or fresh.
   */
  fetchDataWithRetry(endpoint: string, retries?: number): Promise<any>;

  /**
   * Fetches data from Strapi with caching, retry logic, and fallback.
   * @param endpoint - The Strapi endpoint to query.
   * @param retries - Number of retry attempts in case of failure.
   * @param fallbackData - Optional fallback data to return in case of failure.
   * @returns The data from Strapi, either from cache, fresh, or fallback.
   */
  fetchDataWithFallback(endpoint: string, retries?: number, fallbackData?: any): Promise<any>;
}

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
  private logger: LoggerUtils;
  private cache: NodeCache;
  private baseUrl: string;
  private debug: boolean = false; // Debug mode flag

  /**
   * Private constructor to enforce Singleton pattern. Initializes the logger,
   * cache for storing Strapi API responses, and sets the base URL for the Strapi API.
   * 
   * @param baseUrl - The base URL of the Strapi backoffice API.
   */
  private constructor(baseUrl: string, debug: boolean = false) {
    this.debug = DebugUtils.setDebug(debug ?? this.debug);
    this.logger =initLogger(this.constructor.name, false, 100);
    this.cache = new NodeCache({ stdTTL: 600 }); // Cache TTL set to 10 minutes
    this.baseUrl = baseUrl;
  }

  /**
   * Returns the singleton instance of StrapiManager, creating it if it doesn't exist.
   *
   * @param baseUrl - The base URL of the Strapi backoffice API.
   * @returns The singleton instance of StrapiManager.
   */
  public static getInstance(baseUrl: string): StrapiManager {
    if (this.instance === null) {
      this.instance = new StrapiManager(baseUrl);
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
      const response = await axios.post(`${this.baseUrl}/webhooks`, {
        url,
        events,
      });
      this.logger.info("Webhook registered successfully", response.data);
    } catch (error) {
      this.logger.error("Error registering webhook", error);
    }
  }

  /**
   * Handles incoming webhook events from Strapi.
   * This method should be called by the route that receives the webhooks.
   *
   * @param event - The event data sent by Strapi.
   */
  public handleWebhookEvent(event: any): void {
    this.logger.info("Received Strapi webhook event", event);
    // Add your logic to handle the event here.
  }

  /**
   * Fetches data from Strapi with caching and retry logic.
   *
   * @param endpoint - The Strapi endpoint to query.
   * @param retries - Number of retry attempts in case of failure.
   * @returns The data from Strapi, either from cache or fresh.
   */
  public async fetchDataWithRetry(
    endpoint: string,
    retries: number = 3
  ): Promise<any> {
    const cacheKey = `strapi_${endpoint}`;
    const cachedData = this.cache.get(cacheKey);

    if (cachedData) {
      this.logger.info(`Cache hit for ${endpoint}`);
      return cachedData;
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await axios.get(`${this.baseUrl}${endpoint}`);
        this.cache.set(cacheKey, response.data);
        this.logger.info(`Cache miss for ${endpoint}, data cached`);
        return response.data;
      } catch (error) {
        this.logger.warn(`Attempt ${attempt} failed for ${endpoint}`);
        if (attempt === retries) {
          this.logger.error("Max retries reached, unable to fetch data", error);
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
  public async fetchDataWithFallback(
    endpoint: string,
    retries: number = 3,
    fallbackData?: any
  ): Promise<any> {
    try {
      return await this.fetchDataWithRetry(endpoint, retries);
    } catch (error) {
      this.logger.warn(`Returning fallback data for ${endpoint}`);
      return fallbackData || null;
    }
  }
}

export default StrapiManager;