/**
 * RandomUtils provides a collection of utility methods for generating random values.
 * These methods can be used throughout the application wherever random data is needed.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
 */
class RandomUtils {
  private static instance: RandomUtils | null = null;

  /**
   * Returns the single instance of DebugUtils.
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

  // Other random utility methods can be added here in the future
}

export default RandomUtils.getInstance();