import NodeCache from 'node-cache';

/**
 * CacheUtils is a utility class that provides an interface for caching data using NodeCache.
 * This class is a simple wrapper around NodeCache to facilitate cache management in the application.
 *
 * Usage Example:
 * 
 * // Obtain the cache instance with a TTL of 120 seconds
 * const cache = CacheUtils.getInstance(120);
 * 
 * // Store a value in the cache
 * cache.set('myKey', 'myValue');
 * 
 * // Retrieve a value from the cache
 * const value = cache.get<string>('myKey');
 * console.log(value); // Outputs: 'myValue'
 * 
 * // Check if a key exists in the cache
 * if (cache.has('myKey')) {
 *   console.log('Key found in cache');
 * }
 * 
 * // Remove a key from the cache
 * cache.del('myKey');
 * 
 * // Clear all entries from the cache
 * cache.flushAll();
 *
 * @author Your Name
 * @date September 1, 2024
 */
class CacheUtils {
  private static instance: CacheUtils;
  private cache: NodeCache;

  private constructor(ttlSeconds: number) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds });
  }

  /**
   * Returns the singleton instance of CacheUtils.
   * If no instance exists, it creates one with the provided TTL.
   *
   * @param ttlSeconds - The default time-to-live (TTL) for cache entries.
   * @returns The singleton instance of CacheUtils.
   */
  public static getInstance(ttlSeconds: number = 60): CacheUtils {
    if (!CacheUtils.instance) {
      CacheUtils.instance = new CacheUtils(ttlSeconds);
    }
    return CacheUtils.instance;
  }

  /**
   * Caches a value associated with a specific key.
   *
   * @param key - The key to store the value under.
   * @param value - The value to store in the cache.
   * @returns True if the value was stored successfully, otherwise false.
   */
  public set<T>(key: string, value: T): boolean {
    return this.cache.set(key, value);
  }

  /**
   * Retrieves a value from the cache associated with the specified key.
   *
   * @param key - The key to retrieve the value for.
   * @returns The cached value, or undefined if the key is not found.
   */
  public get<T>(key: string): T | undefined {
    return this.cache.get(key);
  }

  /**
   * Removes a specific key from the cache.
   *
   * @param key - The key to remove from the cache.
   * @returns The number of deleted entries.
   */
  public del(key: string): number {
    return this.cache.del(key);
  }

  /**
   * Clears all entries from the cache.
   */
  public flushAll(): void {
    this.cache.flushAll();
  }

  /**
   * Checks if a specific key is in the cache.
   *
   * @param key - The key to check in the cache.
   * @returns True if the key exists in the cache, otherwise false.
   */
  public has(key: string): boolean {
    return this.cache.has(key);
  }
}

export default CacheUtils;
