import { Router, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import trajectsController from "../controllers/trajectsController";

dotenv.config();

const trajectsRouter = Router();

trajectsRouter.use(function timeLog(req: Request, res: Response, next: NextFunction) {
	console.log("Time: ", Date.now());
	next();
});

trajectsRouter.get("/", trajectsController.index);
trajectsRouter.get("/all", trajectsController.getAllTrajects);
trajectsRouter.get("/service", trajectsController.getTrajectsByService);
trajectsRouter.get("/from", trajectsController.getTrajectsFrom);

export { trajectsRouter };
