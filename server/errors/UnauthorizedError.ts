import { StatusCodes } from "http-status-codes";

class UnauthorizedError extends Error {
	statusCode: StatusCodes;

	constructor(message: string = "Unauthorized") {
		super(message);
		this.name = "UnauthorizedError";
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}

export default UnauthorizedError;
