/* eslint-disable no-unused-vars */
export enum Month {
	January = 0,
	February,
	March,
	April,
	May,
	June,
	July,
	August,
	September,
	October,
	November,
	December
}

export enum WeekDay {
	Sun = 0,
	Mon,
	Tue,
	Wed,
	Thu,
	Fri,
	Sat
}

/**
 *
 * @param day
 * @param month
 * @param year
 * @returns a number representing the day of the week (0-6)
 */
export const getDay = (day: number, month: Month, year: number) => {
	if (day < 1 || day > 31) {
		return -1;
	}

	const date: Date = new Date(year, month, day);
	return date.getDay();
};
/**
 *
 * @param year
 * @param month zero indexed
 * @returns the number of days in that month
 */
export const numDaysInMonth = (y: number, m: number): number => {
	return new Date(y, m + 1, 0).getDate();
};
