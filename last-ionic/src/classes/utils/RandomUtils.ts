/**
 * RandomUtils provides a collection of utility methods for generating random values.
 * These methods can be used throughout the application wherever random data is needed.
 * Includes generation of random booleans, numbers, strings, UUIDs, arrays, and values following specific distributions.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 7, 2024
 */
class RandomUtils {
  private static instance: RandomUtils | null = null;

  /**
   * Returns the singleton instance of RandomUtils.
   * @returns {RandomUtils} The singleton instance.
   */
  public static getInstance(): RandomUtils {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  /**
   * Generates a random boolean value.
   * This method returns `true` 50% of the time and `false` the other 50%.
   *
   * @returns A boolean value that is randomly true or false.
   */
  public getRandomBoolean(): boolean {
    return Math.random() >= 0.5;
  }

  /**
   * Generates a random number between the specified min and max values.
   * This includes the min value and excludes the max value.
   *
   * @param min - The minimum number (inclusive).
   * @param max - The maximum number (exclusive).
   * @returns A random number between min (inclusive) and max (exclusive).
   */
  public getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * Generates a random floating-point number between the specified min and max values.
   *
   * @param min - The minimum number (inclusive).
   * @param max - The maximum number (inclusive).
   * @returns A random floating-point number between min and max.
   */
  public getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Generates a random string of the specified length using alphanumeric characters.
   *
   * @param length - The length of the random string to generate.
   * @returns A random alphanumeric string of the specified length.
   */
  public getRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generates a random UUID (version 4) in the standard format.
   *
   * @returns A randomly generated UUID.
   */
  public getRandomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Generates a custom UUID based on a specific pattern.
   * The pattern can include "x" for random hexadecimal digits and "y" for a limited range.
   *
   * @param pattern - The pattern for the custom UUID (e.g., "xxxy-xxxx-4xxx-yxxx-xxxxxxxxxxxx").
   * @returns A custom formatted UUID.
   */
  public getCustomUUID(pattern: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'): string {
    return pattern.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Randomly shuffles an array and returns a new array with the shuffled values.
   *
   * @param array - The array to shuffle.
   * @returns A new array with the elements shuffled in random order.
   */
  public shuffleArray<T>(array: T[]): T[] {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Selects a random element from the provided array.
   *
   * @param array - The array to select from.
   * @returns A random element from the array.
   */
  public getRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  /**
   * Generates a random date between two specified dates.
   *
   * @param startDate - The start date (inclusive).
   * @param endDate - The end date (inclusive).
   * @returns A random date between startDate and endDate.
   */
  public getRandomDate(startDate: Date, endDate: Date): Date {
    const start = startDate.getTime();
    const end = endDate.getTime();
    const randomTimestamp = Math.random() * (end - start) + start;
    return new Date(randomTimestamp);
  }

  /**
   * Generates a pseudo-random number using a seed.
   * This function produces deterministic results based on the provided seed.
   *
   * @param seed - The seed for the pseudo-random generator.
   * @returns A pseudo-random number between 0 and 1.
   */
  public getSeededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  /**
   * Generates a random number following a normal distribution using the Box-Muller transform.
   * This is useful for generating data that follows a normal bell-curve distribution.
   *
   * @param mean - The mean value of the distribution.
   * @param stdDev - The standard deviation of the distribution.
   * @returns A random number following a normal distribution.
   */
  public getRandomNormal(mean: number = 0, stdDev: number = 1): number {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); // Convert [0,1) to (0,1)
    while(v === 0) v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdDev + mean;
  }

  /**
   * Generates a random value from a set of predefined options.
   *
   * @param options - An array of possible values.
   * @returns A random value selected from the provided options.
   */
  public getRandomFromSet<T>(options: T[]): T {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }
}

export default RandomUtils.getInstance();
