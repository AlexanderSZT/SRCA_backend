import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { mongodbConnect } from "./utils/dbConnect";
import { trajectsRouter } from "./routes/trajects";
import { stationsRouter } from "./routes/stations";
import { rollingStockRouter } from "./routes/rollingStock";

const app: Express = express();
const port = process.env.PORT || 3001;

dotenv.config();
const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;

app.use(cors());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
	res.send("SRCA and SR&CA management tools");
});

app.use("/trajects", trajectsRouter);
app.use("/stations", stationsRouter);
app.use("/rolling-stock", rollingStockRouter);

const start = async () => {
	try {
		await mongodbConnect(
			`mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.cu5p8.mongodb.net/SRCA?retryWrites=true&w=majority&appName=Cluster0`
		);
		app.listen(port, () => {
			console.log(`Server running at http://localhost:${port}`);
		});
	} catch (error) {
		console.error(error);
		console.log("Failed to connect to the database, server not running");
	}
};

start();
