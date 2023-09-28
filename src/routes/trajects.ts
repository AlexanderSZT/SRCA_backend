import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import { fetchStations, fetchTraject } from "../utils/customFetchMethods";
import { Traject } from "../utils/types";

dotenv.config();

export const trajectsRouter = Router();
const API_KEY = process.env.API_KEY;

trajectsRouter.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

trajectsRouter.get("/", (req: Request, res: Response) => {
  res.send("Trajects router root endpoint");
});

trajectsRouter.get("/all", async (req: Request, res: Response) => {
  const trajects = await fetchTraject(
    `https://train-empire.com/api/getTrajects.php?auth=${API_KEY}`,
    (traject: Traject) => traject.ongoing === "1"
  );

  if (trajects) {
    res.status(200).json(trajects);
  } else {
    res.status(404).json({
      message: "Pas de trajets",
    });
  }
});

trajectsRouter.get("/service", async (req: Request, res: Response) => {
  const trajectService = req.query.name as string;
  const trajects = await fetchTraject(
    `https://train-empire.com/api/getTrajects.php?auth=${API_KEY}`,
    (traject: Traject) => traject.service === trajectService
  );

  if (trajects) {
    res.status(200).json(trajects);
  } else {
    res.status(404).json({
      message: "Pas de trajets pour la classification désirée",
    });
  }
});

trajectsRouter.get("/from", async (req: Request, res: Response) => {
  const stationId = req.query.station as string;
  let stationName: string | undefined = "";
  const limit = req.query.limit || 10;
  const stationsEndpoint = `https://train-empire.com/api/getCompanyStations.php?auth=${API_KEY}`;
  const stations = await fetchStations(stationsEndpoint);

  if (stations) {
    stations.map(({ countryStations }) => {
      countryStations.map(({ id, name }) => {
        if (id === stationId) {
          stationName = name;
        }
      });
    });
  }

  const endpoint = `https://train-empire.com/api/getFromStation.php?auth=${API_KEY}&station=${stationId}&limit=${limit}`;

  const trajects = await fetchTraject(endpoint);
  if (trajects?.length !== 0) {
    res.status(200).json(trajects);
  } else {
    res.status(400).send(`Aucun trajet trouvé depuis ${stationName}`);
  }
});
