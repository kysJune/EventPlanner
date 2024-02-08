import mongoose from "mongoose";

export interface EventResponse {
	_id: mongoose.Types.ObjectId;
	name: string;
	day: number;
	month: number;
	year: number;
	start: number;
	end: number;
}
