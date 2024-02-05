import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUri: string | undefined = process.env.MONGO_DB_URL;

export async function connectMongo() {
	try {
		await mongoose.connect(mongoUri!, {
			family: 4
		});
		console.info("connected to the mongo database");
	} catch (error) {
		console.error(error);
	}
}
