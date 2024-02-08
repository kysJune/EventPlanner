import mongoose from "mongoose";
import { EventResponse } from "./eventResponse";

export interface UserEventResponse extends EventResponse {
	userid: mongoose.Types.ObjectId;
}
