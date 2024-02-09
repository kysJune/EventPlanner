import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.session.isLoggedIn && req.session.userid) {
		next();
	} else {
		res
			.status(401)
			.send("Unauthorized user. Must be logged in to access this route.");
	}
};

export default authMiddleware;
