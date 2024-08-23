/**
 * TimeUtils provides methods to convert various time units 
 * (days, weeks, months, years, centuries, hours, and minutes) to milliseconds.
 */
 class TimeUtils {

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

    constructor() {
        this.millisecondsInMinute = this.millisecondsInSecond * this.secondsInMinute;
        this.millisecondsInHour = this.millisecondsInMinute * this.minutesInHour;
        this.millisecondsInDay = this.millisecondsInHour * this.hoursInDay;
        this.millisecondsInWeek = this.millisecondsInDay * 7;
        this.millisecondsInMonth = this.millisecondsInDay * 30; // Approximation for 1 month
        this.millisecondsInYear = this.millisecondsInDay * 365; // Approximation for 1 year
        this.millisecondsInCentury = this.millisecondsInYear * 100;
    }

    /**
     * Returns the current timestamp in milliseconds.
     * @returns {number} - Current timestamp in milliseconds.
     */
    public getCurrentTimestamp(): number {
        return Date.now();
    }

    /**
     * Converts a timestamp to a readable date string.
     * @param {number} timestamp - The timestamp to convert.
     * @returns {string} - The readable date string.
     */
    public convertTimestampToDate(timestamp: number): string {
        const date = new Date(timestamp);
        return date.toString();
    }

    /**
     * Returns the elapsed time in milliseconds from now to a specified end time.
     * @param {number} expiration - The end timestamp.
     * @returns {number} - The elapsed time in milliseconds.
     */
    public getElapsedTimeFromNow(expiration: number): number {
        return expiration - this.getCurrentTimestamp();
    }

    /**
     * Checks if the specified end time has already passed.
     * @param {number} expiration - The end timestamp.
     * @returns {boolean} - True if the end time has passed, false otherwise.
     */
    public hasElapsed(expiration: number): boolean {
        return this.getElapsedTimeFromNow(expiration) < 0;
    }

    /**
     * Parses a future time string and returns the corresponding timestamp.
     * @param {string} timeString - The time string to parse.
     * @returns {number} - The future timestamp.
     */
    public parseFutureTimeString(timeString: string): number {
        return this.getCurrentTimestamp() + this.parseTime(timeString);
    }

    /**
     * Parses a natural language string and converts it to milliseconds.
     * @param {string} input - The input string in natural language (e.g., "12days", "35minutes").
     * @returns {number} - The equivalent milliseconds or 0 if invalid input.
     */
    public parseTime(input: string): number {
        const regex = /(\d+)\s*(hours?|minutes?|days?|weeks?|months?|years?|centuries?)/gi;
        let totalMilliseconds = 0;
        let match;

        while ((match = regex.exec(input)) !== null) {
            const value = parseInt(match[1], 10);
            const unit = match[2].toLowerCase();

            switch (unit) {
                case 'now':
                    totalMilliseconds += Date.now();
                    break;
                case 'day':
                case 'days':
                    totalMilliseconds += this.daysToMilliseconds(value);
                    break;
                case 'week':
                case 'weeks':
                    totalMilliseconds += this.weeksToMilliseconds(value);
                    break;
                case 'month':
                case 'months':
                    totalMilliseconds += this.monthsToMilliseconds(value);
                    break;
                case 'year':
                case 'years':
                    totalMilliseconds += this.yearsToMilliseconds(value);
                    break;
                case 'century':
                case 'centuries':
                    totalMilliseconds += this.centuriesToMilliseconds(value);
                    break;
                case 'hour':
                case 'hours':
                    totalMilliseconds += this.hoursToMilliseconds(value);
                    break;
                case 'minute':
                case 'minutes':
                    totalMilliseconds += this.minutesToMilliseconds(value);
                    break;
				case 'second':
				case 'seconds':
					totalMilliseconds += this.minutesToMilliseconds(value/60);
					break;
                default:
                    break;
            }
        }

        return totalMilliseconds;
    }

    /**
     * Converts a given number of minutes to milliseconds.
     * @param {number} minutes - The number of minutes.
     * @returns {number} - The equivalent milliseconds.
     */
    public minutesToMilliseconds(minutes: number): number {
        return minutes * this.millisecondsInMinute;
    }

    /**
     * Converts a given number of hours to milliseconds.
     * @param {number} hours - The number of hours.
     * @returns {number} - The equivalent milliseconds.
     */
    public hoursToMilliseconds(hours: number): number {
        return hours * this.millisecondsInHour;
    }

    /**
     * Converts a given number of days to milliseconds.
     * @param {number} days - The number of days.
     * @returns {number} - The equivalent milliseconds.
     */
    public daysToMilliseconds(days: number): number {
        return days * this.millisecondsInDay;
    }

    /**
     * Converts a given number of weeks to milliseconds.
     * @param {number} weeks - The number of weeks.
     * @returns {number} - The equivalent milliseconds.
     */
    public weeksToMilliseconds(weeks: number): number {
        return weeks * this.millisecondsInWeek;
    }

    /**
     * Converts a given number of months to milliseconds.
     * @param {number} months - The number of months.
     * @returns {number} - The equivalent milliseconds.
     */
    public monthsToMilliseconds(months: number): number {
        return months * this.millisecondsInMonth;
    }

    /**
     * Converts a given number of years to milliseconds.
     * @param {number} years - The number of years.
     * @returns {number} - The equivalent milliseconds.
     */
    public yearsToMilliseconds(years: number): number {
        return years * this.millisecondsInYear;
    }

    /**
     * Converts a given number of centuries to milliseconds.
     * @param {number} centuries - The number of centuries.
     * @returns {number} - The equivalent milliseconds.
     */
    public centuriesToMilliseconds(centuries: number): number {
        return centuries * this.millisecondsInCentury;
    }

    /**
     * Converts a combination of days, weeks, months, years, centuries, hours, and minutes to milliseconds.
     * @param {number} days - The number of days.
     * @param {number} weeks - The number of weeks.
     * @param {number} months - The number of months.
     * @param {number} years - The number of years.
     * @param {number} centuries - The number of centuries.
     * @param {number} hours - The number of hours.
     * @param {number} minutes - The number of minutes.
     * @returns {number} - The total time in milliseconds.
     */
    public convertToMilliseconds(
        days: number = 0,
        weeks: number = 0,
        months: number = 0,
        years: number = 0,
        centuries: number = 0,
        hours: number = 0,
        minutes: number = 0
    ): number {
        return (
            this.daysToMilliseconds(days) +
            this.weeksToMilliseconds(weeks) +
            this.monthsToMilliseconds(months) +
            this.yearsToMilliseconds(years) +
            this.centuriesToMilliseconds(centuries) +
            this.hoursToMilliseconds(hours) +
            this.minutesToMilliseconds(minutes)
        );
    }
}

export default new TimeUtils(); // Export the class instance directly
