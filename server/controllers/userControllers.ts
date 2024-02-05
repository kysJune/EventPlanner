import { Request, Response } from "express";
import { DatabaseUser } from "../services/database.user";
import { UserRequest } from "../types/requests/userRequest";
// import { Session } from "express-session";
declare module "express-session" {
	interface SessionData {
		isLoggedIn?: boolean;
		// Add any other custom properties you need
	}
}

export const login = async (req: Request, res: Response) => {
	// TODO: implement login
	res.send("inside login");
};

export const register = async (req: Request, res: Response) => {
	const username = req.body.username;
	const password = req.body.password;
	// const location = req.body?.location;
	// TODO check user table so that user dne
	const newuser: UserRequest = { username, password };
	try {
		await DatabaseUser.create(newuser);
		req.session.isLoggedIn = true;
		res.status(200).send("inside register");
	} catch (error) {
		console.error("failed register");
		throw error;
	}
};
