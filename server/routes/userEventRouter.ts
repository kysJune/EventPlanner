import express from "express";
import {
	create,
	listEvents,
	read,
	remove,
	update
} from "../controllers/userEventController";

const userEventRouter = express.Router();

userEventRouter.post("/create", create);
userEventRouter.get("/read", read);
userEventRouter.get("/list", listEvents);

// TODO : convert these two to use path param id if possible
userEventRouter.put("/update", update);
userEventRouter.delete("/delete", remove);

export default userEventRouter;