import dotenv from "dotenv";
import { Request, Response } from "express";
import { fetchStations } from "../utils/customFetchMethods";

dotenv.config();
const API_KEY = process.env.API_KEY;

const index = async (req: Request, res: Response) => {
	res.send("Stations router root endpoint");
};

const getAllStations = async (req: Request, res: Response) => {
	const endpoint = `https://train-empire.com/api/getAllStations.php?auth=${API_KEY}`;
	const stations = await fetchStations(endpoint);

	if (stations) {
		res.status(200).json(stations);
	} else {
		res.status(404).send(`Aucune gare trouvée`);
	}
};

const getCompanyStations = async (req: Request, res: Response) => {
	const endpoint = `https://train-empire.com/api/getCompanyStations.php?auth=${API_KEY}`;
	const stations = await fetchStations(endpoint);

	if (stations) {
		res.status(200).json(stations);
	} else {
		res.status(404).send(`Aucune gare trouvée`);
	}
};

const stationsController = {
	index,
	getAllStations,
	getCompanyStations,
};

export default stationsController;
