import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectMongo } from "./config/dbConnection";
import userRouter from "./routes/userRouter";
import EventModel, { Event } from "./models/event";
import mongoose from "mongoose";
import event from "./models/event";
import user from "./models/user";
dotenv.config();
connectMongo();

const app: Express = express();
const port = process.env.PORT || 3000;

// middleware
app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
	const event: Event = {
		name: "soccer",
		userid: 1,
		day: 2,
		month: 2,
		year: 2024,
		start: 0,
		end: 23,
	};

	const foo = new EventModel(event);
	foo
		.save()
		.then((saved) => console.log(saved, " was saved"))
		.catch((e) => console.log(e));
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`server listening on port ${port}`);
});
