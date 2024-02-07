import mongoose, { Document, Schema } from "mongoose";
import { EventRequest } from "../types/requests/eventRequest";

const eventSchema = new Schema<EventRequest & Document>({
	name: {
		type: String,
		required: true
	},
	day: {
		type: Number,
		required: true
	},
	month: {
		type: Number,
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	start: {
		type: Number,
		required: true
	},
	end: {
		type: Number,
		required: true
	}
});

const NationalEventModel = mongoose.model<EventRequest & Document>(
	"NationalEvent",
	eventSchema
);

export default NationalEventModel;
