import { cookies } from "../../../App.jsx";

export const removeCookies = () => {
	// Get all cookies
	const allCookies = cookies.getAll();

	// Iterate over all cookies and remove each one
	Object.keys(allCookies).forEach((cookieName) => {
		cookies.remove(cookieName);
	});
};

/**
 * @param {string} yearMonthDayString of the form "2024-01-15"
 * @returns {Object} - date object with day, month, and year properties
 */
export const getDateFromSearch = (yearMonthDayString) => {
	//2024-01-15
	const dateArray = yearMonthDayString.split("-");
	return {
		day: dateArray[2],
		month: dateArray[1],
		year: dateArray[0]
	};
};
