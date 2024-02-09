import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../errors/UnauthorizedError";
import BadRequestError from "../errors/BadRequest";
import { StatusCodes } from "http-status-codes";
import Forbidden from "../errors/Forbidden";
import Conflict from "../errors/Conflict";

export const errorHandlerMiddleware = (
	error: Error,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	if (
		error instanceof UnauthorizedError ||
		error instanceof BadRequestError ||
		error instanceof Forbidden ||
		error instanceof Conflict
	) {
		res.status(error.statusCode).send({
			message: error.message
		});
	} else {
		res.send(StatusCodes.INTERNAL_SERVER_ERROR).send({
			message: error.message
		});
	}

	next();
};
