/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { UserEventRequest } from "../types/requests/userEventRequest";

// TODO: Figure out how (if possible) to make both of these functions generic
export const isValidUserEventRequest = (
	data: unknown
): data is UserEventRequest => {
	return (
		typeof data === "object" &&
		data !== null &&
		(data as any).userid instanceof mongoose.Types.ObjectId &&
		typeof (data as any).name === "string" &&
		typeof (data as any).day === "number" &&
		typeof (data as any).month === "number" &&
		typeof (data as any).year === "number" &&
		typeof (data as any).start === "number" &&
		typeof (data as any).end === "number"
	);
};

export const isValidPartialUserEventRequest = (
	data: unknown
): data is Partial<UserEventRequest> => {
	return (
		(typeof data === "object" &&
			data !== null &&
			(data as any).userid instanceof mongoose.Types.ObjectId) ||
		typeof (data as any).name === "string" ||
		typeof (data as any).day === "number" ||
		typeof (data as any).month === "number" ||
		typeof (data as any).year === "number" ||
		typeof (data as any).start === "number" ||
		typeof (data as any).end === "number"
	);
};
