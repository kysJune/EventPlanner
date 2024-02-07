import { ObjectId } from "mongoose";
import UserEventModel from "../models/userEvent";
import { UserEventRequest } from "../types/requests/userEventRequest";
import { UserEventResponse } from "../types/responses/userEventResponse";

export class DatabaseUserEvent {
	/**
	 * Create a user event
	 */
	static async create(event: UserEventRequest): Promise<UserEventResponse> {
		const newEvent = new UserEventModel(event);
		return await newEvent.save();
	}

	/**
	 * Get a single event by userid and name
	 */
	static async read(
		userid: ObjectId,
		name: string
	): Promise<UserEventResponse | undefined> {
		const event: UserEventResponse | null = await UserEventModel.findOne({
			userid,
			name
		});
		if (event) {
			console.info("Event found");
			return event;
		} else {
			console.info("Event not found");
			return undefined;
		}
	}

	/**
	 * Lists all events by the userid, day, month and year
	 */
	static async listEvents(
		userid: ObjectId,
		day: number,
		month: number,
		year: number
	): Promise<UserEventResponse[] | undefined> {
		const events: UserEventResponse[] = await UserEventModel.find({
			userid,
			day,
			month,
			year
		});

		if (events.length > 0) {
			console.info("Events found");
			return events;
		} else {
			return undefined;
		}
	}

	/**
	 * Update an event
	 */
	static async update(
		id: ObjectId,
		eventUpdateData: Partial<UserEventRequest>
	): Promise<void> {
		await UserEventModel.updateOne({ _id: id }, eventUpdateData);
	}

	/**
	 * Delete an Event
	 */
	static async delete(id: ObjectId): Promise<void> {
		await UserEventModel.deleteOne({ _id: id });
	}
}
