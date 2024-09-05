/**
 * TimeUtils provides methods to convert various time units
 * (days, weeks, months, years, centuries, hours, and minutes) to milliseconds.
 *
 * @author David Rullán - https://github.com/drullandev
 * @date September 3, 2024
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

  // Private constructor to prevent direct instantiation
  private constructor() {
    this.millisecondsInMinute =
    this.millisecondsInSecond * this.secondsInMinute;
    this.millisecondsInHour = this.millisecondsInMinute * this.minutesInHour;
    this.millisecondsInDay = this.millisecondsInHour * this.hoursInDay;
    this.millisecondsInWeek = this.millisecondsInDay * 7;
    this.millisecondsInMonth = this.millisecondsInDay * 30; // Approximation for 1 month
    this.millisecondsInYear = this.millisecondsInDay * 365; // Approximation for 1 year
    this.millisecondsInCentury = this.millisecondsInYear * 100;
  }

  // Static method to get the single instance of the class
  public static getInstance(): TimeUtils {
    if (this.instance === null) {
      this.instance = new TimeUtils();
    }
    return this.instance;
  }

  // Static utility methods

  public getCurrentTimestamp(): number {
    return Date.now();
  }

  public convertTimestampToDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toString();
  }

  public getElapsedTimeFromNow(expiration: number): number {
    return expiration - this.getCurrentTimestamp();
  }

  public hasElapsed(timestamp: number): boolean {
    return this.getCurrentTimestamp() > timestamp;
  }

  public addDurationToNow(duration: number): number {
    return this.getCurrentTimestamp() + duration;
  }

  // Instance methods

  public parseFutureTimeString(timeString: string): number {
    return this.getCurrentTimestamp() + this.parseTime(timeString);
  }

  public parseTime(input: string): number {
    let totalMilliseconds = 0;
    let match: RegExpExecArray | null;

    while ((match = this.regex.exec(input)) !== null) {
      const value = parseInt(match[1], 10);
      const unit = match[2].toLowerCase();

      switch (unit) {
        case "now":
          totalMilliseconds += this.getCurrentTimestamp();
          break;
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
          break;
      }
    }

    return totalMilliseconds;
  }

  public secondsToMilliseconds(seconds: number): number {
    return seconds * this.millisecondsInSecond;
  }

  public minutesToMilliseconds(minutes: number): number {
    return minutes * this.millisecondsInMinute;
  }

  public hoursToMilliseconds(hours: number): number {
    return hours * this.millisecondsInHour;
  }

  public daysToMilliseconds(days: number): number {
    return days * this.millisecondsInDay;
  }

  public weeksToMilliseconds(weeks: number): number {
    return weeks * this.millisecondsInWeek;
  }

  public monthsToMilliseconds(months: number): number {
    return months * this.millisecondsInMonth;
  }

  public yearsToMilliseconds(years: number): number {
    return years * this.millisecondsInYear;
  }

  public centuriesToMilliseconds(centuries: number): number {
    return centuries * this.millisecondsInCentury;
  }

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

// Export the singleton instance
export default TimeUtils.getInstance();
