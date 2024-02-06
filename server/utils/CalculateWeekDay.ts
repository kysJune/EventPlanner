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

// TODO : Consider better error handling and constraint checking
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
export const numDaysInMonth = (y:number, m:number): number => {
 return new Date(y, m, 0).getDate();
}
