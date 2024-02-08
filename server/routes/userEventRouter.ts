import express from "express";
import {
	create,
	listEvents,
	read,
	deleteEvent,
	update
} from "../controllers/userEventController";

const userEventRouter = express.Router();

userEventRouter.post("/create", create);
userEventRouter.get("/:id/read", read);
userEventRouter.post("/list", listEvents);
userEventRouter.put("/update", update);
userEventRouter.delete("/delete", deleteEvent);

export default userEventRouter;
