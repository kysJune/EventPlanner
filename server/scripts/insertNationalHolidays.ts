import mongoose from "mongoose";
import { connectMongo } from "../config/dbConnection";
import NationalEventModel from "../models/nationalEvent";

const connectToMongoDB = async () => {
	await connectMongo();
};

// US Federal holidays from 2024 to 2034
const federalHolidays = [
	{ name: "New Year's Day", month: 0, day: 1 },
	{
		name: "Birthday of Martin Luther King, Jr.",
		month: 0,
		dayOfWeek: 1,
		weekNumber: 3
	},
	{ name: "Inauguration Day", month: 0, day: 20, year: 2025, interval: 4 },
	{
		name: "Washington's Birthday",
		month: 1,
		day: 1,
		dayOfWeek: 1,
		weekNumber: 3
	},
	{ name: "Memorial Day", month: 4, dayOfWeek: 1, weekNumber: 5 },
	{ name: "Juneteenth National Independence Day", month: 5, day: 19 },
	{ name: "Independence Day", month: 6, day: 4 },
	{ name: "Labor Day", month: 8, dayOfWeek: 1, weekNumber: 1 },
	{ name: "Columbus Day", month: 9, dayOfWeek: 1, weekNumber: 2 },
	{ name: "Veterans Day", month: 10, day: 11 },
	{ name: "Thanksgiving Day", month: 10, dayOfWeek: 4, weekNumber: 4 },
	{ name: "Christmas Day", month: 11, day: 25 }
];

async function insertFederalHolidays() {
	try {
		await connectToMongoDB();

		const startYear = 2024;
		const endYear = 2034;
		// Insert each federal holiday into the database
		for (let year = startYear; year <= endYear; year++) {
			for (const holiday of federalHolidays) {
				const { name, month, day, dayOfWeek, weekNumber } = holiday;

				let holidayDate;
				if (dayOfWeek !== undefined && weekNumber !== undefined) {
					holidayDate = calculateHolidayDateByWeek(
						month,
						dayOfWeek,
						weekNumber,
						year
					);
				} else {
					holidayDate = new Date(year, month, day);
				}

				// Skip Inauguration Day in non-leap years
				if (name === "Inauguration Day" && !isLeapYear(year)) continue;

				await NationalEventModel.create({
					name,
					day: holidayDate.getDate(),
					month: holidayDate.getMonth(),
					year: holidayDate.getFullYear(),
					start: 0,
					end: 24
				});
			}
		}

		console.info("Federal holidays inserted successfully");
	} catch (error) {
		console.error("Error inserting federal holidays:", error);
	} finally {
		await mongoose.disconnect();
		console.info("Disconnected from MongoDB");
	}
}

function calculateHolidayDateByWeek(
	month: number,
	dayOfWeek: number,
	weekNumber: number,
	year: number
): Date {
	const firstDayOfMonth = new Date(year, month, 1);
	const firstDayOfWeek = firstDayOfMonth.getDay();
	const offset = ((7 - firstDayOfWeek + dayOfWeek) % 7) + (weekNumber - 1) * 7;
	return new Date(year, month, 1 + offset);
}

function isLeapYear(year: number): boolean {
	return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

insertFederalHolidays();
