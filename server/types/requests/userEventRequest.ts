import { EventRequest } from "./eventRequest";
import mongoose from "mongoose";

export interface UserEventRequest extends EventRequest {
	userid: mongoose.Types.ObjectId;
}
