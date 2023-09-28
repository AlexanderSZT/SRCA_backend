import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { fetchStations } from "../utils/customFetchMethods";

dotenv.config();

export const stationsRouter = Router();
const API_KEY = process.env.API_KEY;

stationsRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

stationsRouter.get("/", (req: Request, res: Response) => {
    res.send("Stations router root endpoint");
  });

stationsRouter.get("/all", async (req: Request, res: Response) => {
    const endpoint = `https://train-empire.com/api/getAllStations.php?auth=${API_KEY}`;
    const stations = await fetchStations(endpoint);
  
    if (stations) {
      res.status(200).json(stations);
    } else {
      res.status(404).send(`Aucune gare`);
    }
  });

stationsRouter.get("/company", async (req: Request, res: Response) => {
  const endpoint = `https://train-empire.com/api/getCompanyStations.php?auth=${API_KEY}`;
  const stations = await fetchStations(endpoint);

  if (stations) {
    res.status(200).json(stations);
  } else {
    res.status(404).send(`Aucune gare`);
  }
});
