import { getDay, Month } from "../CalculateWeekDay";

describe("Gets the week day", () => {
	it("Returns the weekday given the day, month and year", () => {
		const expected: number = 1;

		const actual = getDay(5, Month.February, 2024);
		expect(actual).toEqual(expected);
	});

	it("Returns negative one if the day is out of bounds", () => {
		const actual = getDay(40, Month.February, 2024);
		expect(actual).toEqual(-1);
	});
});
