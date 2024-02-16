import { WeekDay, getDay, numDaysInMonth } from "../../../../server/utils/CalculateWeekDay";
import axios from "axios";

const populateMonth = async (month, year) => {
	const todayMonth = getCurrentMonth();
	const todayYear = getCurrentYear();
	let todayDay = getCurrentDay();

	const firstWeekDay = getDay(1, month, year);

	const numDaysCurr = numDaysInMonth(year, month);

	let prevMonth;
	let prevYear;
	if (month - 1 < 0) {
		prevMonth = 11;
		prevYear = year - 1;
	} else {
		prevMonth = month - 1;
		prevYear = year;
	}

	let prevEvents;
	let status;
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/event/list`,
			{
				month: prevMonth,
				year: prevYear
			},
			{ withCredentials: true }
		);
		prevEvents = response.data.userEvents;
		status = response.status;
	} catch (error) {
		throw error;
	}

	if (status !== 200 && status !== 204) {
		console.error("PANIC");
		prevEvents = []; // TODO: notify user that we couldn't fetch events
	} else if (status === 204) {
		prevEvents = [];
	}

	const numDaysPrev = numDaysInMonth(prevYear, prevMonth);
	const weeks = [];
	const numWeeks = 6;
	const daysOfLastMonth = [];
	for (let i = numDaysPrev - firstWeekDay + 1; i <= numDaysPrev; i++) {
		daysOfLastMonth.push({
			events: [...prevEvents.filter((event) => event.day === i)],
			day: i,
			weekDay: WeekDay[i - numDaysPrev + firstWeekDay - 1],
			monthStatus: "prev"
		});
	}

	let curEvents;
	status = undefined;
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/event/list`,
			{
				month: month,
				year: year
			},
			{ withCredentials: true }
		);
		curEvents = response.data.userEvents;
		status = response.status;
	} catch (error) {
		throw error;
	}

	if (status !== 200 && status !== 204) {
		console.error("PANIC");
	} else if (status === 204) {
		curEvents = [];
	}

	// complete the first week with days of the current month
	for (let i = 1; i <= 7 - firstWeekDay; i++) {
		daysOfLastMonth.push({
			events: [...curEvents.filter((event) => event.day === i)],
			day: i,
			weekDay: WeekDay[firstWeekDay + i - 1],
			monthStatus: "curr"
		});
	}
	weeks.push(daysOfLastMonth);

	// fill the rest remaining days with their events
	let nextMonth;
	let nextYear;
	if (month + 1 > 11) {
		nextMonth = 0;
		nextYear = year + 1;
	} else {
		nextMonth = month + 1;
		nextYear = year;
	}

	let nextEvents;
	status = undefined;
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/event/list`,
			{
				month: nextMonth,
				year: nextYear
			},
			{ withCredentials: true }
		);
		nextEvents = response.data.userEvents;
		status = response.status;
	} catch (error) {
		throw error;
	}

	if (status !== 200 && status !== 204) {
		console.error("PANIC");
	} else if (status === 204) {
		nextEvents = [];
	}

	loop1: for (let week = 1; week < numWeeks; week++) {
		const days = [];
		for (let i = 0; i < 7; i++) {
			days.push({
				events: [...curEvents.filter((event) => event.day === week * 7 + i + 1 - firstWeekDay)],
				day: week * 7 + i + 1 - firstWeekDay,
				weekDay: "",
				monthStatus: "curr"
			});
			if (week * 7 + i + 1 - firstWeekDay === numDaysCurr) {
				weeks.push(days);
				break loop1;
			}

			if (week * 7 + i + 1 - firstWeekDay === numDaysCurr) {
				weeks.push(days);
				break loop1;
			}
		}

		weeks.push(days);
	}

	// fill the remaining days with the next month
	if (weeks[weeks.length - 1].length < 7) {
		let stoppingCondition = 7 - weeks[weeks.length - 1].length;
		for (let i = 1; i <= stoppingCondition; i++) {
			weeks[weeks.length - 1].push({
				events: [...nextEvents.filter((event) => event.day === i)],
				day: i,
				weekDay: "",
				monthStatus: "next"
			});
		}
	}

	// if the month is the current month, mark the current day
	if (month === todayMonth && year === todayYear) {
		todayDay += firstWeekDay; //offset the todayDay index by the number of days from previous month
		weeks[Math.floor((todayDay - 1) / 7)][(todayDay - 1) % 7].monthStatus = "today";
	}

	return weeks;
};

export const getCurrentMonth = () => {
	const date = new Date();
	return date.getMonth();
};

export const getCurrentYear = () => {
	const date = new Date();
	return date.getFullYear();
};

export const getCurrentDay = () => {
	const date = new Date();
	return date.getDate();
};

export default populateMonth;
