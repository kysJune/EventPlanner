import mongoose, { Document, Schema } from "mongoose";

export interface Event {
	name: string;
	userid: number;
	day: number;
	month: number;
	year: number;
	start: number;
	end: number;
}

const eventSchema = new Schema<Event & Document>({
	name: {
		type: String,
		required: true,
	},
	userid: {
		type: Number,
		required: true,
	},
	day: {
		type: Number,
		required: true,
	},
	month: {
		type: Number,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	start: {
		type: Number,
		required: true,
	},
	end: {
		type: Number,
		required: true,
	},
});

const EventModel = mongoose.model<Event & Document>("Event", eventSchema);

export default EventModel;
