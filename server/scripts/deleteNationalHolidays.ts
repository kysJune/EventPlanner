import mongoose from "mongoose";
import { connectMongo } from "../config/dbConnection";
import NationalEventModel from "../models/nationalEvent";

const connectToMongoDB = async () => {
	await connectMongo();
};

async function deleteNationalEvents() {
	try {
		await connectToMongoDB();

		await NationalEventModel.deleteMany({});

		console.info("All entries in NationalEventModel deleted successfully");
	} catch (error) {
		console.error("Error deleting entries in NationalEventModel:", error);
	} finally {
		await mongoose.disconnect();
		console.info("Disconnected from MongoDB");
	}
}

// Call the function to delete all entries in NationalEventModel
deleteNationalEvents();
