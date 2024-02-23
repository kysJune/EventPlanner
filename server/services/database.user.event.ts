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
		} else {console.info("Event not found");
			return undefined;
		}
	}

	/**
	 * Lists all events by the given filter
	 */
	static async listEvents(
		filterData: Partial<UserEventRequest>
	): Promise<UserEventResponse[] | undefined> {
		const events: UserEventResponse[] = await UserEventModel.find(
			filterData
		).sort({ start: 1, end: 1 });

		if (events.length > 0) {
			return events;
		} else {
			return undefined;
		}
	}

	/**
	 *
	 * @param searchTerm
	 * @param id
	 * @returns a list of events that match the search term and the user id (in mysql would be: WHERE name LIKE %searchTerm%)
	 */
	static async searchEventsByName(
		searchTerm: string,
		userid: string
	): Promise<UserEventResponse[] | undefined> {
		const events: UserEventResponse[] = await UserEventModel.find(
			// regex matches any string that contains the search term and the i option makes it case insensitive
			{
				name: { $regex: searchTerm, $options: "i" },
				userid: new mongoose.Types.ObjectId(userid)
			}
		).sort({ year: 1, month: 1, day: 1, start: 1, end: 1 });

		if (events.length > 0) {
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
