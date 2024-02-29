import mongoose, { Document, Schema } from "mongoose";
import { UserEventRequest } from "../types/requests/userEventRequest";

const eventSchema = new Schema<UserEventRequest & Document>({
	name: {
		type: String,
		required: true
	},
	userid: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "User"
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
	},
	location: {
		type: String,
		required: false
	},
	description: {
		type: String,
		required: false
	}
});

const UserEventModel = mongoose.model<UserEventRequest & Document>(
	"UserEvent",
	eventSchema
);

export default UserEventModel;
