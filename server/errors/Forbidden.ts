import { StatusCodes } from "http-status-codes";

class Forbidden extends Error {
	statusCode: StatusCodes;

	constructor(message: string = "Forbidden") {
		super(message);
		this.name = "Forbidden";
		this.statusCode = StatusCodes.FORBIDDEN;
	}
}

export default Forbidden;
