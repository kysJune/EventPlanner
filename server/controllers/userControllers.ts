import { Request, Response } from "express";
import { DatabaseUser } from "../services/database.user";
import { UserRequest } from "../types/requests/userRequest";
import { hashPassword, isPassword } from "../utils/hashing";
import { ObjectId } from "mongoose";
import { StatusCodes } from "http-status-codes";

declare module "express-session" {
	interface SessionData {
		isLoggedIn?: boolean;
		userid?: ObjectId;
		// Add any other custom properties you need
	}
}

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	// check if username exists and retrieve the hashed password
	const user = await DatabaseUser.readByUsername(username);
	if (user === undefined) {
		res
			.status(StatusCodes.FORBIDDEN)
			.send("username password combo is incorrect");
		return;
	}
	const isAuthenticated: boolean | undefined = await isPassword(
		password,
		user.password
	);
	if (typeof isAuthenticated === "undefined") {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send("error comparing passwords");
		
	} else {
		if (!isAuthenticated) {
			res
				.status(StatusCodes.FORBIDDEN)
				.send("username password combo is incorrect");
			return;
		}
		// log the user in
		req.session.isLoggedIn = true;
		// set the user id in the session
		req.session.userid = user.id;
		res.status(StatusCodes.OK).send("successfully logged in");
	}
};

export const register = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	// const location = req.body?.location
	// check if the username already exists
	const isDuplicate = (await DatabaseUser.readByUsername(username)) !== undefined;
	if (isDuplicate) {
		res.status(StatusCodes.CONFLICT).send("username already exists");
		return;
	}
	// hash the password
	const hashedPassword = await hashPassword(password);
	if (hashedPassword === undefined) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("error hashing password");
		return;
	}
	const newuser: UserRequest = { username, password: hashedPassword };
	try {
		const userId = await DatabaseUser.create(newuser);
		req.session.isLoggedIn = true;
		// set the user id in the session
		req.session.userid = userId;
		res.status(StatusCodes.OK).send("successfully registered user");
	} catch (error) {
		console.error("something went wrong in register controller");
		throw error;
	}
};
