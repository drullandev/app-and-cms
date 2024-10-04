import NodeCache from 'node-cache';

/**
 * Interface for the CacheManager class.
 * Describes the methods and properties available in CacheManager.
 */
interface ICacheManager {
  /**
   * Caches a value associated with a specific key.
   * @param key - The key to store the value under.
   * @param value - The value to store in the cache.
   * @param ttlSeconds - Optional TTL for the specific entry.
   * @returns True if the value was stored successfully, otherwise false.
   */
  set<T>(key: string, value: T, ttlSeconds?: number): boolean;

  /**
   * Retrieves a value from the cache associated with the specified key.
   * @param key - The key to retrieve the value for.
   * @returns The cached value, or undefined if the key is not found or expired.
   */
  get<T>(key: string): T | undefined;

  /**
   * Removes a specific key from the cache.
   * @param key - The key to remove from the cache.
   * @returns The number of deleted entries (0 if the key doesn't exist).
   */
  remove(key: string): number;

  /**
   * Clears all entries from the cache.
   */
  flushAll(): void;

  /**
   * Checks if a specific key exists in the cache.
   * @param key - The key to check in the cache.
   * @returns True if the key exists and is not expired, otherwise false.
   */
  has(key: string): boolean;

  /**
   * Retrieves cache statistics such as hits, misses, and keys count.
   * @returns The statistics object from NodeCache.
   */
  getStats(): NodeCache.Stats;
}

/**
 * CacheManager is responsible for managing an in-memory cache using NodeCache.
 * It provides methods for setting, retrieving, and deleting cached values, 
 * as well as methods for clearing the cache and retrieving cache statistics.
 * 
 * **Features**:
 * - Supports optional TTL (Time To Live) for cached entries.
 * - Provides cache statistics for monitoring performance.
 * - Centralized control for cache invalidation and management.
 * 
 * **Usage Example**:
 * ```typescript
 * const cacheManager = new CacheManager();
 * cacheManager.set('key', 'value', 60); // Cache 'value' for 60 seconds
 * const cachedValue = cacheManager.get('key'); // Retrieve the value
 * cacheManager.remove('key'); // Remove the key from the cache
 * ```
 * 
 * @class CacheManager
 * @author David Rullán
 * @date October 2024
 */
class CacheManager implements ICacheManager {
  private cache: NodeCache;
  private defaultTTL: number;

  /**
   * Initializes the CacheManager with an optional default TTL for cached entries.
   * 
   * @param defaultTTL - Optional default TTL in seconds for all cached entries. Defaults to 3600 seconds (1 hour).
   */
  constructor(defaultTTL: number = 3600) {
    this.cache = new NodeCache();
    this.defaultTTL = defaultTTL;
  }

  /**
   * Caches a value associated with a specific key, with an optional TTL.
   * 
   * @param key - The key to store the value under.
   * @param value - The value to store in the cache.
   * @param ttlSeconds - Optional TTL in seconds for this entry. Uses default TTL if not provided.
   * @returns {boolean} True if the value was stored successfully, otherwise false.
   */
  public set<T>(key: string, value: T, ttlSeconds?: number): boolean {
    const ttl = ttlSeconds || this.defaultTTL;
    return this.cache.set(key, value, ttl);
  }

  /**
   * Retrieves a value from the cache associated with the specified key.
   * 
   * @param key - The key to retrieve the value for.
   * @returns {T | undefined} The cached value, or undefined if the key is not found or expired.
   */
  public get<T>(key: string): T | undefined {
    try {
      return this.cache.get<T>(key);
    } catch (error) {
      console.error(`Error retrieving key "${key}" from cache:`, error);
      return undefined;
    }
  }

  /**
   * Removes a specific key from the cache.
   * 
   * @param key - The key to remove from the cache.
   * @returns {number} The number of deleted entries (0 if the key doesn't exist).
   */
  public remove(key: string): number {
    try {
      return this.cache.del(key);
    } catch (error) {
      console.error(`Error removing key "${key}" from cache:`, error);
      return 0;
    }
  }

  /**
   * Clears all entries from the cache.
   */
  public flushAll(): void {
    this.cache.flushAll();
    console.log("Cache cleared.");
  }

  /**
   * Checks if a specific key exists in the cache.
   * 
   * @param key - The key to check in the cache.
   * @returns {boolean} True if the key exists and is not expired, otherwise false.
   */
  public has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Retrieves cache statistics such as hits, misses, and keys count.
   * 
   * @returns {NodeCache.Stats} The statistics object from NodeCache.
   */
  public getStats(): NodeCache.Stats {
    return this.cache.getStats();
  }
}

export default CacheManager;
