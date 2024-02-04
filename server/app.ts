import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectMongo } from "./config/dbConnection";
import userRouter from "./routes/userRouter";

import session from "express-session";
import MongoStore from "connect-mongo"; // eslint-disable-line @typescript-eslint/no-var-requires

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
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_DB_URL,
			collectionName: "session"
		}),
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
