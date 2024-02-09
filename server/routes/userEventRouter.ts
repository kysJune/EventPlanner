import express from "express";
import {
	create,
	listEvents,
	read,
	deleteEvent,
	update
} from "../controllers/userEventController";
import authMiddleware from "../middleware/authMiddleware";
import { errorHandlerMiddleware } from "../middleware/errorHandler";

const userEventRouter = express.Router();

userEventRouter.post("/create", authMiddleware, create, errorHandlerMiddleware);
userEventRouter.get("/:id/read", authMiddleware, read, errorHandlerMiddleware);
userEventRouter.post(
	"/list",
	authMiddleware,
	listEvents,
	errorHandlerMiddleware
);
userEventRouter.put(
	"/:id/update",
	authMiddleware,
	update,
	errorHandlerMiddleware
);
userEventRouter.delete(
	"/:id/delete",
	authMiddleware,
	deleteEvent,
	errorHandlerMiddleware
);

export default userEventRouter;
