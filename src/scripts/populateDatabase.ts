import mongoose from "mongoose";
import dotenv from "dotenv";
import { UICKindCode, UICCountryCode } from "../schemas/UICData";
import { KIND_CODES, COUNTRY_CODES } from "../data/UICData";

dotenv.config();

const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const mongoUri = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.cu5p8.mongodb.net/SRCA?retryWrites=true&w=majority&appName=Cluster0`;

const populateDatabase = async () => {
	try {
		await mongoose.connect(mongoUri);
		await UICKindCode.deleteMany({});
		await UICCountryCode.deleteMany({});

		await UICKindCode.insertMany(KIND_CODES);
		await UICCountryCode.insertMany(COUNTRY_CODES);

		console.log("Database populated successfully");
		mongoose.disconnect();
	} catch (error) {
		console.error("Error populating database:", error);
	}
};

populateDatabase();
