import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectMongo } from "./config/dbConnection";
import userRouter from "./routes/userRouter";
import cors from "cors";
import bodyParser from "body-parser";
import mongoSession from "../server/config/session";

const startServer = async () => {
	dotenv.config();

	const app: Express = express();
	const port = process.env.PORT || 3000;

	await connectMongo();

	// allow sending up to 1mb of data from client to server
	app.use(bodyParser.json({ limit: "1mb" }));
	// Enable CORS for all routes
	app.use(cors({ origin: true, credentials: true }));
	// for express session }));

	// middleware
	mongoSession(app);

	app.use("/user", userRouter);

	app.get("/", (req: Request, res: Response) => {
		res.send("Hello World!");
	});

	app.listen(port, () => {
		console.info(`server listening on port ${port}`);
	});
};

startServer();
