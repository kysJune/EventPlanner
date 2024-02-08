import mongoose from "mongoose";

export interface UserResponse {
	id: mongoose.Types.ObjectId;
	username: string;
	password: string;
	location?: string;
}
