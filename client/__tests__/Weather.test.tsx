const { convertKelvinToFahrenheit, getIcon } = require("../src/components/weather/Logic");

// TODO Find out why jest is being annoying
describe("Gets the weather", () => {
	it("converts Kelvin to Fahrenheit", () => {
		expect(convertKelvinToFahrenheit(280)).toBe(44);
	});

	it("Gets the icon url", () => {
		const expected = "http://openweathermap.org/img/w/foo.png";

		const actual = getIcon("foo");

		expect(expected).toEqual(actual);
	});
});
