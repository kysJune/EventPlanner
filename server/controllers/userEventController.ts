import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { DatabaseUserEvent } from "../services/database.user.event";

import BadRequestError from "../errors/BadRequest";
import { UserEventResponse } from "../types/responses/userEventResponse";
import {
	isValidPartialUserEventRequest,
	isValidUserEventRequest
} from "../utils/isValidRequest";
import { includeIfDefined } from "../utils/includeIfDefined";
import mongoose from "mongoose";
import UnauthorizedError from "../errors/UnauthorizedError";

export const create = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userid: string | undefined = req.session.userid;
	if (!userid || !mongoose.Types.ObjectId.isValid(userid)) {
		return next(new UnauthorizedError("Must be logged in to make this request"));
	}

	const data: unknown = {
		...req.body,
		userid: new mongoose.Types.ObjectId(userid)
	};

	if (!isValidUserEventRequest(data)) {
		return next(new BadRequestError("Invalid UserEvent Request data"));
	}

	try {
		const event: UserEventResponse = await DatabaseUserEvent.create(data);
		res.status(StatusCodes.CREATED).send({
			event,
			message: "Event created"
		});
	} catch (error) {
		return next(error);
	}
};

export const read = async (req: Request, res: Response, next: NextFunction) => {
	const id: string | undefined = req.params.id;
	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
		return next(new UnauthorizedError());
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

export const listEvents = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userid: undefined | string = req.session.userid;
	if (!userid || !mongoose.Types.ObjectId.isValid(userid)) {
		return next(new UnauthorizedError());
	}

	const filterData: unknown = {
		...req.body,
		userid: new mongoose.Types.ObjectId(userid)
	};

	if (!isValidPartialUserEventRequest(filterData)) {
		return next(new BadRequestError("Invalid User Event Filter data"));
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

export const searchEventsByName = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const searchTerm: string | undefined = req.body.searchTerm;
	if (req.session.userid === undefined) {
		return next(new UnauthorizedError("User not logged in"));
	}

	const userid: string = req.session.userid;
	if (!searchTerm) {
		return next(new BadRequestError("Invalid search term"));
	}

	const events: UserEventResponse[] | undefined =
		await DatabaseUserEvent.searchEventsByName(searchTerm, userid);

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

export const update = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id: string | undefined = req.params.id;
	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
		return next(new BadRequestError());
	}

	const data: unknown = {
		...req.body,
		_id: new mongoose.Types.ObjectId(id)
	};
	if (!isValidPartialUserEventRequest(data)) {
		return next(new BadRequestError("Invalid UserEvent request data"));
	}

	try {
		await DatabaseUserEvent.update(new mongoose.Types.ObjectId(id), data);
	} catch (error) {
		console.error("error updating event", error);
		return next(error);
	}

	res.status(StatusCodes.OK).send({
		message: "Event was successfully updated"
	});
};

export const deleteEvent = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id: string | undefined = req.params.id;
	if (!id || !mongoose.Types.ObjectId.isValid(id)) {
		return next(new BadRequestError("Invalid Event ID"));
	}

	try {
		await DatabaseUserEvent.delete(new mongoose.Types.ObjectId(id));
	} catch (error) {
		console.error("error deleting event", error);
		return next(error);
	}

	res.status(StatusCodes.NO_CONTENT).send({
		message: "Event Deleted"
	});
};
