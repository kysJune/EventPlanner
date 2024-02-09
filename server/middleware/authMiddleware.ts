import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const userid: string | undefined = req.session.userid;
	if (
		req.session.isLoggedIn &&
		userid &&
		mongoose.Types.ObjectId.isValid(userid)
	) {
		next();
	} else {
		res
			.status(401)
			.send("Unauthorized user. Must be logged in to access this route.");
	}
};

export default authMiddleware;
