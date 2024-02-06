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

// TODO : Consider better error handling and constraint checking
export const getDay = (day: number, month: Month, year: number) => {
	if (day < 1 || day > 31) {
		return -1;
	}

	const date: Date = new Date(year, month, day);
	return date.getDay();
};
