import { Router, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { fetchRollingStock } from "../utils/customFetchMethods";

dotenv.config();

export const rollingStockRouter = Router();
const API_KEY = process.env.API_KEY;

rollingStockRouter.use(function timeLog(
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log("Time: ", Date.now());
	next();
});

rollingStockRouter.get("/", (req: Request, res: Response) => {
	res.send("Rolling Stock router root endpoint");
});

rollingStockRouter.get("/all", async (req: Request, res: Response) => {
	const rollingStock = await fetchRollingStock(
		`https://train-empire.com/api/getAllEngines.php?auth=${API_KEY}&noPic=1`
	);
	if (rollingStock) {
		res.status(200).json(rollingStock);
	} else {
		res.status(404).json({
			message: "Pas de matériel roulant",
		});
	}
});

rollingStockRouter.get("/company", async (req: Request, res: Response) => {
	const customLiveryQuery = req.query.customLivery as string;
	console.log(customLiveryQuery);
	const rollingStock = await fetchRollingStock(
		`https://train-empire.com/api/getCompanyEngines.php?auth=${API_KEY}&noPic=1`,
		customLiveryQuery
	);
	if (rollingStock) {
		res.status(200).json(rollingStock);
	} else {
		res.status(404).json({
			message: "Pas de matériel roulant",
		});
	}
});
