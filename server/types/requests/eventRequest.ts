import { ObjectId } from "mongoose";

export interface EventRequest {
	name: string;
	userid: ObjectId;
	day: number;
	month: number;
	year: number;
	start: number;
	end: number;
}
