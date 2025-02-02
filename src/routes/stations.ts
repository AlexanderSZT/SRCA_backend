import { Router, Request, Response, NextFunction } from "express";
import stationsController from "../controllers/stationsController";

const stationsRouter = Router();

stationsRouter.use(function timeLog(req: Request, res: Response, next: NextFunction) {
	console.log("Time: ", Date.now());
	next();
});

stationsRouter.get("/", stationsController.index);
stationsRouter.get("/all", stationsController.getAllStations);
stationsRouter.get("/company", stationsController.getCompanyStations);

export { stationsRouter };
