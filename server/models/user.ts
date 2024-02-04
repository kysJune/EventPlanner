import mongoose, { Document, Schema } from "mongoose";
import { UserRequest } from "../types/requests/userRequest";

const userSchema = new Schema<UserRequest & Document>({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: false
	}
});

const UserModel = mongoose.model<UserRequest & Document>("User", userSchema);
export default UserModel;
