import { Router, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import rollingStockController from "../controllers/rollingStockController";

dotenv.config();

const rollingStockRouter = Router();

rollingStockRouter.use(function timeLog(req: Request, res: Response, next: NextFunction) {
	const time = new Date().toUTCString();
	console.log("Time: ", time);
	next();
});

rollingStockRouter.get("/", rollingStockController.index);
rollingStockRouter.get("/all", rollingStockController.getAllRollingStock);
rollingStockRouter.get("/company", rollingStockController.getCompanyRollingStock);
rollingStockRouter.get("/find-autocontrol", rollingStockController.findAutocontrol);
rollingStockRouter.get("/kind-code", rollingStockController.kindCode);
rollingStockRouter.get("/country-code", rollingStockController.countryCode);

export { rollingStockRouter };
