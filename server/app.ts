import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectMongo } from "./config/dbConnection";
import userRouter from "./routes/userRouter";
import mongoose from "mongoose";

import session from "express-session";
const MongoStore = require("connect-mongo")(session); // eslint-disable-line @typescript-eslint/no-var-requires

dotenv.config();
connectMongo();

const app: Express = express();
const port = process.env.PORT || 3000;

// middleware
app.use(
	session({
		secret: "your-secret-key",
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
	})
);

app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`server listening on port ${port}`);
});
