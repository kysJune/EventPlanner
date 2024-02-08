import mongoose from "mongoose";
import {
	isValidPartialUserEventRequest,
	isValidUserEventRequest
} from "../isValidRequest";

describe("isValidRequest", () => {
	it("Returns true on valid request data type", () => {
		const validData: unknown = {
			userid: new mongoose.Types.ObjectId(),
			name: "Example Event",
			day: 1,
			month: 1,
			year: 2024,
			start: 0,
			end: 24
		};

		expect(isValidUserEventRequest(validData)).toBe(true);
	});

	it("Returns false on invalid request data type", () => {
		expect(isValidUserEventRequest(undefined)).toBe(false);
		expect(isValidUserEventRequest(null)).toBe(false);
		expect(isValidUserEventRequest("invalid")).toBe(false);
		expect(isValidUserEventRequest(123)).toBe(false);

		// Test with missing properties
		expect(
			isValidUserEventRequest({
				name: "Example Event",
				day: 1,
				month: 1,
				year: 2024,
				start: 0,
				end: 24
			})
		).toBe(false);

		// Test with incorrect property types
		expect(
			isValidUserEventRequest({
				userid: "invalid",
				name: "Example Event",
				day: "invalid",
				month: 1,
				year: 2024,
				start: 0,
				end: 24
			})
		).toBe(false);
	});
});

describe("isValidPartialUserEventRequest", () => {
	it("Returns true on valid request data type", () => {
		const validData: unknown = {
			userid: new mongoose.Types.ObjectId(),
			name: "Example Event",
			day: 1,
			month: 1,
			year: 2024,
			start: 0,
			end: 24
		};

		expect(isValidPartialUserEventRequest(validData)).toBe(true);
	});

	it("Returns true on valid partial", () => {
		const validData: unknown = {
			userid: new mongoose.Types.ObjectId(),
			name: "Example Event",
			day: 1,
			month: 1
		};

		expect(isValidPartialUserEventRequest(validData)).toBe(true);
	});

	it("Returns false on invalid partial", () => {
		const invalidData: unknown = {
			foo: "Washington DC"
		};

		expect(isValidPartialUserEventRequest(invalidData)).toBe(false);
	});
});
