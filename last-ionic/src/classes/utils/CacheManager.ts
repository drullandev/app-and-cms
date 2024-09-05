import NodeCache from 'node-cache';

/**
 * CacheManager is a utility class that provides an interface for caching data using NodeCache.
 * It supports multiple named caches, each with its own TTL and data.
 * 
 * TTL levels:
 *  - short: 30 seconds
 *  - medium: 5 minutes
 *  - long: 1 hour
 *  - veryLong: 24 hours
 *
 * Each cache can be uniquely identified by a name, allowing you to create different caches for 
 * different components or purposes.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
 */
class CacheManager {
  // Singleton instances for different cache names
  private static instances: Map<string, CacheManager> = new Map();
  private cache: NodeCache;

  // Predefined TTL levels in seconds
  private static readonly TTL_LEVELS = {
    short: 30,        // 30 seconds
    medium: 300,      // 5 minutes
    long: 3600,       // 1 hour
    veryLong: 86400,  // 24 hours
  };

  /**
   * Private constructor to enforce unique caches per name.
   * Accepts a TTL level or custom TTL value to initialize the cache.
   *
   * @param ttlLevelOrSeconds - Either a TTL level (short, medium, long, veryLong) or a custom TTL in seconds.
   */
  private constructor(ttlLevelOrSeconds: keyof typeof CacheManager.TTL_LEVELS | number) {
    const ttlSeconds = typeof ttlLevelOrSeconds === 'number'
      ? ttlLevelOrSeconds
      : CacheManager.TTL_LEVELS[ttlLevelOrSeconds];

    this.cache = new NodeCache({ stdTTL: ttlSeconds });
  }

  /**
   * Returns the singleton instance of CacheManager for a specific cache name.
   * If no instance exists for the given name, it creates one with the provided TTL level or custom TTL.
   *
   * @param cacheName - A unique identifier for the cache (e.g., the name of a component).
   * @param ttlLevelOrSeconds - Either a TTL level (short, medium, long, veryLong) or a custom TTL in seconds.
   * @returns The singleton instance of CacheManager associated with the cache name.
   */
  public static getInstance(cacheName: string, ttlLevelOrSeconds: keyof typeof CacheManager.TTL_LEVELS | number = 'long'): CacheManager {
    if (!this.instances.has(cacheName)) {
      const instance = new CacheManager(ttlLevelOrSeconds);
      this.instances.set(cacheName, instance);
    }
    return this.instances.get(cacheName)!;
  }

  /**
   * Caches a value associated with a specific key in the current cache instance.
   * You can optionally provide a custom TTL for this specific value.
   *
   * @param key - The key to store the value under.
   * @param value - The value to store in the cache.
   * @param ttlSeconds - Optional TTL for the specific entry.
   * @returns True if the value was stored successfully, otherwise false.
   */
  public set<T>(key: string, value: T, ttlSeconds?: number): boolean {
    try {
      return this.cache.set(key, value, CacheManager.TTL_LEVELS.short);
    } catch (error) {
      console.error(`Failed to set cache for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Retrieves a value from the cache associated with the specified key in the current cache instance.
   *
   * @param key - The key to retrieve the value for.
   * @returns The cached value, or undefined if the key is not found or expired.
   */
  public get<T>(key: string): T | undefined {
    try {
      return this.cache.get<T>(key);
    } catch (error) {
      console.error(`Failed to get cache for key ${key}:`, error);
      return undefined;
    }
  }

  /**
   * Removes a specific key from the cache in the current cache instance.
   *
   * @param key - The key to remove from the cache.
   * @returns The number of deleted entries (0 if the key doesn't exist).
   */
  public remove(key: string): number {
    try {
      return this.cache.del(key);
    } catch (error) {
      console.error(`Failed to remove cache for key ${key}:`, error);
      return 0;
    }
  }

  /**
   * Clears all entries from the current cache instance.
   */
  public flushAll(): void {
    try {
      this.cache.flushAll();
    } catch (error) {
      console.error('Failed to flush cache:', error);
    }
  }

  /**
   * Checks if a specific key exists in the cache for the current cache instance.
   *
   * @param key - The key to check in the cache.
   * @returns True if the key exists and is not expired, otherwise false.
   */
  public has(key: string): boolean {
    try {
      return this.cache.has(key);
    } catch (error) {
      console.error(`Failed to check cache for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Retrieves cache statistics such as hits, misses, and keys count for the current cache instance.
   *
   * @returns The statistics object from NodeCache.
   */
  public getStats(): NodeCache.Stats {
    return this.cache.getStats();
  }
}

export default CacheManager;