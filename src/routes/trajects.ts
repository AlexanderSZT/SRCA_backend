import { Router, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import trajectsController from "../controllers/trajectsController";
import { requireSignin } from "../utils/middlewares";

dotenv.config();

const trajectsRouter = Router();

trajectsRouter.use(function timeLog(req: Request, res: Response, next: NextFunction) {
	console.log("Time: ", Date.now());
	next();
});

trajectsRouter.get("/", trajectsController.index);
trajectsRouter.get("/all", requireSignin, trajectsController.getAllTrajects);
trajectsRouter.get("/service", requireSignin, trajectsController.getTrajectsByService);
trajectsRouter.get("/from", requireSignin, trajectsController.getTrajectsFrom);

export { trajectsRouter };
