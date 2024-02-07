import { ObjectId } from "mongoose";
import { EventResponse } from "./eventResponse";

export interface UserEventResponse extends EventResponse {
	userid: ObjectId;
}
