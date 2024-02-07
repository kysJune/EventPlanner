import { includeIfDefined } from "../includeIfDefined";

describe("includeIfDefined", () => {
	it("should include the property if defined", () => {
		const property = "name";
		const value = "George Washington";

		const result = includeIfDefined(property, value);

		expect(result).toEqual({ name: "George Washington" });
	});

	it("should not include the property if value is undefined", () => {
		const property = "name";
		const value = undefined;

		const result = includeIfDefined(property, value);

		expect(result).toEqual({});
	});
});
