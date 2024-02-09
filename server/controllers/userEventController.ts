import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { DatabaseUserEvent } from "../services/database.user.event";

import BadRequestError from "../errors/BadRequest";
import { UserEventResponse } from "../types/responses/userEventResponse";
import {
	isValidPartialUserEventRequest,
	isValidUserEventRequest
} from "../utils/isValidRequest";
import { includeIfDefined } from "../utils/includeIfDefined";
import mongoose from "mongoose";

export const create = async (req: Request, res: Response) => {
	const userid: string | undefined = req.session.userid;

	const data: unknown = {
		...req.body,
		userid: new mongoose.Types.ObjectId(userid)
	};

	if (!isValidUserEventRequest(data)) {
		throw new BadRequestError("Invalid UserEvent Request data");
	}
	try {
		const event: UserEventResponse = await DatabaseUserEvent.create(data);
		res.status(StatusCodes.CREATED).send({
			event,
			message: "Event created"
		});
	} catch (error) {
		console.error("error creating event", error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error });
	}
};

export const read = async (req: Request, res: Response) => {
	const id: string | undefined = req.params.id;
	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
		throw new BadRequestError();
	}

	const event: UserEventResponse | undefined = await DatabaseUserEvent.read(
		new mongoose.Types.ObjectId(id)
	);

	let statusCode: StatusCodes;
	let message: string;

	if (!event) {
		statusCode = StatusCodes.NOT_FOUND;
		message = "No events found";
	} else {
		statusCode = StatusCodes.OK;
		message = "Events found";
	}

	res.status(statusCode).send({
		...includeIfDefined("event", event),
		message
	});
};

export const listEvents = async (req: Request, res: Response) => {
	const userid: undefined | string = req.session.userid;

	const filterData: unknown = {
		...req.body,
		userid: new mongoose.Types.ObjectId(userid)
	};

	if (!isValidPartialUserEventRequest(filterData)) {
		throw new BadRequestError("Invalid Filter data");
	}

	const events: UserEventResponse[] | undefined =
		await DatabaseUserEvent.listEvents(filterData);

	let statusCode: StatusCodes;
	let userEvents: UserEventResponse[];
	let message: string;

	if (!events) {
		userEvents = [];
		statusCode = StatusCodes.NO_CONTENT;
		message = "No events found";
	} else {
		userEvents = events;
		statusCode = StatusCodes.OK;
		message = "Events found";
	}

	res.status(statusCode).send({
		userEvents,
		message
	});
};

export const update = async (req: Request, res: Response) => {
	const data: unknown = req.body;
	if (!isValidPartialUserEventRequest(data)) {
		throw new BadRequestError("Invalid UserEvent request data");
	}

	const id: string | undefined = req.body.id;
	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
		throw new BadRequestError();
	}
	try {
		await DatabaseUserEvent.update(new mongoose.Types.ObjectId(id), data);
	} catch (error) {
		console.error("error updating event", error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error });
		return;
	}
	res.status(StatusCodes.OK).send({
		message: "Event was successfully updated"
	});
};

export const deleteEvent = async (req: Request, res: Response) => {
	const id: string | undefined = req.body.id;
	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
		throw new BadRequestError();
	}
	try {
		await DatabaseUserEvent.delete(new mongoose.Types.ObjectId(id));
	} catch (error) {
		console.error("error deleting event", error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error });
		return;
	}
	res.status(StatusCodes.NO_CONTENT).send({
		message: "Event Deleted"
	});
};
