/**
 * Utility class for managing time conversions and parsing time expressions.
 * Provides methods to convert between different units of time (e.g., seconds, minutes, hours),
 * and to parse human-readable time expressions into milliseconds.
 *
 * This class also supports configuration for customizable time periods for months and years.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 7, 2024
 */
class TimeUtils {
  private static instance: TimeUtils | null = null;

  private millisecondsInSecond = 1000;
  private secondsInMinute = 60;
  private minutesInHour = 60;
  private hoursInDay = 24;

  private millisecondsInMinute: number;
  private millisecondsInHour: number;
  private millisecondsInDay: number;
  private millisecondsInWeek: number;
  private millisecondsInMonth: number;
  private millisecondsInYear: number;
  private millisecondsInCentury: number;

  private regex =
    /(\d+)\s*(h|hours?|min|minutes?|d|days?|w|weeks?|m|months?|y|years?|c|centuries?|s|sec|secs|seconds?)/gi;

  // Configurable options
  private daysPerMonth: number;
  private daysPerYear: number;

  /**
   * Private constructor to prevent direct instantiation.
   * Initializes time conversions and allows configuration of month and year length.
   * 
   * @param {number} daysPerMonth - The number of days to consider in a month. Defaults to 30.
   * @param {number} daysPerYear - The number of days to consider in a year. Defaults to 365.
   */
  private constructor(daysPerMonth: number = 30, daysPerYear: number = 365) {
    this.daysPerMonth = daysPerMonth;
    this.daysPerYear = daysPerYear;

    this.millisecondsInMinute = this.millisecondsInSecond * this.secondsInMinute;
    this.millisecondsInHour = this.millisecondsInMinute * this.minutesInHour;
    this.millisecondsInDay = this.millisecondsInHour * this.hoursInDay;
    this.millisecondsInWeek = this.millisecondsInDay * 7;
    this.millisecondsInMonth = this.millisecondsInDay * this.daysPerMonth;
    this.millisecondsInYear = this.millisecondsInDay * this.daysPerYear;
    this.millisecondsInCentury = this.millisecondsInYear * 100;
  }

  /**
   * Returns the singleton instance of the TimeUtils class.
   * If an instance already exists, it returns that instance; otherwise, it creates a new one.
   * 
   * @param {number} [daysPerMonth] - Optional configuration for the number of days per month.
   * @param {number} [daysPerYear] - Optional configuration for the number of days per year.
   * @returns {TimeUtils} The singleton instance of TimeUtils.
   */
  public static getInstance(daysPerMonth?: number, daysPerYear?: number): TimeUtils {
    if (!this.instance) {
      this.instance = new TimeUtils(daysPerMonth, daysPerYear);
    }
    return this.instance;
  }

  /**
   * Parses a time expression and returns the time in milliseconds.
   * Supports time units such as seconds, minutes, hours, days, weeks, months, years, and centuries.
   * 
   * @param {string} input - The human-readable time expression to parse (e.g., "2 hours", "30 minutes").
   * @returns {number} The total time in milliseconds.
   * @throws {Error} If the input is invalid or contains unknown time units.
   */
  public parseTime(input: string): number {
    let totalMilliseconds = 0;
    let match: RegExpExecArray | null;

    while ((match = this.regex.exec(input)) !== null) {
      const value = parseInt(match[1], 10);
      if (isNaN(value)) {
        throw new Error(`Invalid number in time expression: ${match[1]}`);
      }
      const unit = match[2].toLowerCase();

      switch (unit) {
        case "day":
        case "days":
          totalMilliseconds += this.daysToMilliseconds(value);
          break;
        case "w":
        case "week":
        case "weeks":
          totalMilliseconds += this.weeksToMilliseconds(value);
          break;
        case "month":
        case "months":
          totalMilliseconds += this.monthsToMilliseconds(value);
          break;
        case "y":  
        case "year":
        case "years":
          totalMilliseconds += this.yearsToMilliseconds(value);
          break;
        case "century":
        case "centuries":
          totalMilliseconds += this.centuriesToMilliseconds(value);
          break;
        case "h":  
        case "hour":
        case "hours":
          totalMilliseconds += this.hoursToMilliseconds(value);
          break;
        case "min":
        case "minute":
        case "minutes":
          totalMilliseconds += this.minutesToMilliseconds(value);
          break;
        case "s":  
        case "sec": 
        case "secs": 
        case "second":
        case "seconds":
          totalMilliseconds += this.secondsToMilliseconds(value);
          break;
        default:
          throw new Error(`Unknown time unit: ${unit}`);
      }
    }

    return totalMilliseconds;
  }

  /**
   * Parses a future time expression and returns the timestamp in milliseconds from the current time.
   * 
   * @param {string | number} timeString - A human-readable time expression (e.g., "2 hours") or a number representing seconds.
   * @returns {number} The future timestamp in milliseconds.
   */
  public parseFutureTimeString(timeString: string | number): number {
    const milliseconds = typeof timeString === 'number' ? timeString * this.millisecondsInSecond : this.parseTime(timeString);
    return this.getCurrentTimestamp() + milliseconds;
  }

  /**
   * Returns the current timestamp in milliseconds.
   * 
   * @returns {number} The current timestamp in milliseconds.
   */
  public getCurrentTimestamp(): number {
    return Date.now();
  }

  /**
   * Converts seconds to milliseconds.
   * 
   * @param {number} seconds - The number of seconds to convert.
   * @returns {number} The equivalent time in milliseconds.
   */
  public secondsToMilliseconds(seconds: number): number {
    return seconds * this.millisecondsInSecond;
  }

  /**
   * Converts minutes to milliseconds.
   * 
   * @param {number} minutes - The number of minutes to convert.
   * @returns {number} The equivalent time in milliseconds.
   */
  public minutesToMilliseconds(minutes: number): number {
    return minutes * this.millisecondsInMinute;
  }

  /**
   * Converts hours to milliseconds.
   * 
   * @param {number} hours - The number of hours to convert.
   * @returns {number} The equivalent time in milliseconds.
   */
  public hoursToMilliseconds(hours: number): number {
    return hours * this.millisecondsInHour;
  }

  /**
   * Converts days to milliseconds.
   * 
   * @param {number} days - The number of days to convert.
   * @returns {number} The equivalent time in milliseconds.
   */
  public daysToMilliseconds(days: number): number {
    return days * this.millisecondsInDay;
  }

  /**
   * Converts weeks to milliseconds.
   * 
   * @param {number} weeks - The number of weeks to convert.
   * @returns {number} The equivalent time in milliseconds.
   */
  public weeksToMilliseconds(weeks: number): number {
    return weeks * this.millisecondsInWeek;
  }

  /**
   * Converts months to milliseconds.
   * 
   * @param {number} months - The number of months to convert.
   * @returns {number} The equivalent time in milliseconds, using the configured days per month.
   */
  public monthsToMilliseconds(months: number): number {
    return months * this.millisecondsInMonth;
  }

  /**
   * Converts years to milliseconds.
   * 
   * @param {number} years - The number of years to convert.
   * @returns {number} The equivalent time in milliseconds, using the configured days per year.
   */
  public yearsToMilliseconds(years: number): number {
    return years * this.millisecondsInYear;
  }

  /**
   * Converts centuries to milliseconds.
   * 
   * @param {number} centuries - The number of centuries to convert.
   * @returns {number} The equivalent time in milliseconds.
   */
  public centuriesToMilliseconds(centuries: number): number {
    return centuries * this.millisecondsInCentury;
  }

  /**
   * Converts the given time units into milliseconds.
   * Supports converting multiple units such as days, weeks, months, and years in a single call.
   * 
   * @param {number} [days=0] - The number of days to convert.
   * @param {number} [weeks=0] - The number of weeks to convert.
   * @param {number} [months=0] - The number of months to convert.
   * @param {number} [years=0] - The number of years to convert.
   * @param {number} [centuries=0] - The number of centuries to convert.
   * @param {number} [hours=0] - The number of hours to convert.
   * @param {number} [minutes=0] - The number of minutes to convert.
   * @param {number} [seconds=0] - The number of seconds to convert.
   * @returns {number} The equivalent time in milliseconds.
   */
  public convertToMilliseconds(
    days: number = 0,
    weeks: number = 0,
    months: number = 0,
    years: number = 0,
    centuries: number = 0,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0
  ): number {
    return (
      this.daysToMilliseconds(days) +
      this.weeksToMilliseconds(weeks) +
      this.monthsToMilliseconds(months) +
      this.yearsToMilliseconds(years) +
      this.centuriesToMilliseconds(centuries) +
      this.hoursToMilliseconds(hours) +
      this.minutesToMilliseconds(minutes) +
      this.secondsToMilliseconds(seconds)
    );
  }
}

export default TimeUtils.getInstance();
