import { ObjectId } from "mongoose";

export interface EventResponse {
	_id: ObjectId;
	name: string;
	day: number;
	month: number;
	year: number;
	start: number;
	end: number;
}
