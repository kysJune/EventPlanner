import mongoose, { Document, Schema } from "mongoose";

interface User {
	username: string;
	password: string;
	location?: string;
}

const userSchema = new Schema<User & Document>({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: false,
	},
});

const UserModel = mongoose.model<User & Document>("User", userSchema);
export default UserModel;
