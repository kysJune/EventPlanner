import mongoose from "mongoose";
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
	 * Get a single event by its id
	 */
	static async read(
		id: mongoose.Types.ObjectId
	): Promise<UserEventResponse | undefined> {
		const event: UserEventResponse | null = await UserEventModel.findById({
			_id: id
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
	 * Lists all events by the given filter
	 */
	static async listEvents(
		filterData: Partial<UserEventRequest>
	): Promise<UserEventResponse[] | undefined> {
		const events: UserEventResponse[] = await UserEventModel.find(filterData);

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
		id: mongoose.Types.ObjectId,
		eventUpdateData: Partial<UserEventRequest>
	): Promise<void> {
		await UserEventModel.updateOne({ _id: id }, eventUpdateData);
	}

	/**
	 * Delete an Event
	 */
	static async delete(id: mongoose.Types.ObjectId): Promise<void> {
		await UserEventModel.deleteOne({ _id: id });
	}
}
