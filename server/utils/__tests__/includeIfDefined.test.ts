import { includeIfDefined } from "../includeIfDefined";

describe("includeIfDefined", () => {
	it("includes the key-value pair if the value is defined", () => {
		const property = "name";
		const value = "George Washington";

		const result = includeIfDefined(property, value);

		expect(result).toEqual({ name: "George Washington" });
	});

	it("returns an empty object if the value is undefined", () => {
		const property = "name";
		const value = undefined;

		const result = includeIfDefined(property, value);

		expect(result).toEqual({});
	});
});
