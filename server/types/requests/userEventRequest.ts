import { ObjectId } from "mongoose";
import { EventRequest } from "./eventRequest";

export interface UserEventRequest extends EventRequest {
	userid: ObjectId;
}
