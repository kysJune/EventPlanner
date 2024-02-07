import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { DatabaseUserEvent } from "../services/database.user.event";

import UnauthorizedError from "../errors/UnauthorizedError";
import { ObjectId } from "mongoose";
import BadRequestError from "../errors/BadRequest";
import { UserEventResponse } from "../types/responses/userEventResponse";
import {
	isValidPartialUserEventRequest,
	isValidUserEventRequest
} from "../utils/isValidRequest";
import { includeIfDefined } from "../utils/includeIfDefined";

export const create = async (req: Request, res: Response) => {
	const id: ObjectId | undefined = req.session.userid;
	if (!id) {
		throw new UnauthorizedError();
	}

	const data: unknown = {
		id,
		...req.body
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
		throw new Error();
	}
};

interface ReadQueryParam {
	name?: string;
}

export const read = async (req: Request, res: Response) => {
	const userid: undefined | ObjectId = req.session.userid;
	if (!userid) {
		throw new UnauthorizedError();
	}

	const { name }: ReadQueryParam = req.query;
	if (!name) {
		throw new BadRequestError();
	}

	const event: UserEventResponse | undefined = await DatabaseUserEvent.read(
		userid,
		name
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

interface ListQueryParams {
	day?: string;
	month?: string;
	year?: string;
}

export const listEvents = async (req: Request, res: Response) => {
	const userid: undefined | ObjectId = req.session.userid;
	if (!userid) {
		throw new UnauthorizedError();
	}

	const { day, month, year }: ListQueryParams = req.query;
	if (!day || !month || !year) {
		throw new BadRequestError("Missing query params");
	}

	const events: UserEventResponse[] | undefined =
		await DatabaseUserEvent.listEvents(
			userid,
			parseInt(day),
			parseInt(month),
			parseInt(year)
		);

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
	const userid: undefined | ObjectId = req.session.userid;
	if (!userid) {
		throw new UnauthorizedError();
	}

	const data: unknown = req.body;
	if (!isValidPartialUserEventRequest(data)) {
		throw new BadRequestError("Invalid UserEvent request data");
	}

	const id: ObjectId = req.body.id;
	await DatabaseUserEvent.update(id, data);

	res.status(StatusCodes.OK).send({
		message: "Event was successfully updated"
	});
};

export const deleteEvent = async (req: Request, res: Response) => {
	const userid: undefined | ObjectId = req.session.userid;
	if (!userid) {
		throw new UnauthorizedError();
	}

	const id: ObjectId = req.body.id;

	await DatabaseUserEvent.delete(id);
	res.status(StatusCodes.NO_CONTENT).send({
		message: "Event Delete"
	});
};
