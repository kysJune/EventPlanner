import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectMongo } from "./config/dbConnection";
import userRouter from "./routes/userRouter";
dotenv.config();
connectMongo();

const app: Express = express();
const port = process.env.PORT || 3000;

// middleware
app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`server listening on port ${port}`);
});
