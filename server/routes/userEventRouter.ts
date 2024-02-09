import express from "express";
import {
	create,
	listEvents,
	read,
	deleteEvent,
	update
} from "../controllers/userEventController";
import authMiddleware from "../middleware/authMiddleware";

const userEventRouter = express.Router();

userEventRouter.post("/create", authMiddleware, create);
userEventRouter.get("/:id/read", authMiddleware, read);
userEventRouter.post("/list", authMiddleware, listEvents);
userEventRouter.put("/update", authMiddleware, update);
userEventRouter.delete("/delete", authMiddleware, deleteEvent);

export default userEventRouter;
