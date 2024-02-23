export const getDayOfWeek = (day, month, year) => {
	const date = new Date(year, month, day);
	const options = { weekday: "long" };
	return new Intl.DateTimeFormat("en-US", options).format(date).toString();
};
