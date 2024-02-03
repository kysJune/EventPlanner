import { EventResponse } from "../types/responses/eventResponse";
import { ObjectId } from "mongoose";
import { EventRequest } from "../types/requests/eventRequest";
import EventModel from "../models/event";

class DatabaseEvent {
	/**
	 * Create an event
	 */
	async create(event: EventRequest) {
		const newEvent = new EventModel(event);
		return await newEvent.save();
	}

	/**
	 * Get a single event by userid and name
	 */
	async read(
		userid: ObjectId,
		name: string,
	): Promise<EventResponse | undefined> {
		const event: EventResponse | null = await EventModel.findOne({
			userid,
			name,
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
	 *
	 */
	async listEvents(
		userid: ObjectId,
		day: number,
		month: number,
		year: number,
	): Promise<EventResponse[] | undefined> {
		const events: EventResponse[] = await EventModel.find({
			userid,
			day,
			month,
			year,
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
	async update(
		id: ObjectId,
		eventUpdate: Partial<EventRequest>,
	): Promise<void> {
		await EventModel.updateOne({ _id: id }, eventUpdate);
	}

	/**
	 * Delete a user
	 */
	async delete(id: ObjectId) {
		await EventModel.deleteOne({ _id: id });
	}
}
