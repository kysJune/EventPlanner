import mongoose, { Document, Schema } from "mongoose";
import { EventRequest } from "../types/requests/eventRequest";

const eventSchema = new Schema<EventRequest & Document>({
	name: {
		type: String,
		required: true,
	},
	userid: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User",
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

const EventModel = mongoose.model<EventRequest & Document>(
	"Event",
	eventSchema
);

export default EventModel;
