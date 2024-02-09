import { StatusCodes } from "http-status-codes";

class Conflict extends Error {
	statusCode: StatusCodes;

	constructor(message: string = "Conflict") {
		super(message);
		this.name = "Conflict";
		this.statusCode = StatusCodes.CONFLICT;
	}
}

export default Conflict;
