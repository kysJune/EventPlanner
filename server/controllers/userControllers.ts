import { NextFunction, Request, Response } from "express";
import { DatabaseUser } from "../services/database.user";
import { hashPassword, isPassword } from "../utils/hashing";
import { StatusCodes } from "http-status-codes";
import Forbidden from "../errors/Forbidden";
import Conflict from "../errors/Conflict";

declare module "express-session" {
	interface SessionData {
		isLoggedIn?: boolean;
		userid?: string;
	}
}

export const logout = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.session.destroy((err) => {
		if (err) {
			console.error("Error destroying session");
			return next(err);
		}
		res.status(StatusCodes.OK).send();
	});
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { username, password } = req.body;

	// check if username exists and retrieve the hashed password
	const user = await DatabaseUser.readByUsername(username);
	if (!user) {
		return next(new Forbidden("Username or Password is incorrect"));
	}

	const isAuthenticated: boolean | undefined = await isPassword(
		password,
		user.password
	);

	if (typeof isAuthenticated === "undefined") {
		return next(new Error("Error comparing passwords"));
	} else {
		if (!isAuthenticated) {
			return next(new Forbidden("Username or Password is incorrect"));
		}

		req.session.isLoggedIn = true;
		req.session.userid = user.id.toString();

		res.status(StatusCodes.OK).send({
			user,
			message: "Successful login"
		});
	}
};

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { username, password, location } = req.body;
	// TODO : future asking for the user's location in the future as part of registration

	// Check if a user already exists with that username
	const user = await DatabaseUser.readByUsername(username);
	if (user) {
		return next(new Conflict("Username already exists"));
	}

	// Create the new user
	const hashedPassword = await hashPassword(password);
	if (hashedPassword === undefined) {
		return next(new Error("Error hashing password"));
	}

	try {
		const userId = await DatabaseUser.create({
			username,
			password: hashedPassword,
			location
		});

		req.session.isLoggedIn = true;
		req.session.userid = userId.toString();

		res.status(StatusCodes.OK).send({ message: "Successfully registered user" });
	} catch (error) {
		console.error("Something went wrong in register controller");
		return next(error);
	}
};
