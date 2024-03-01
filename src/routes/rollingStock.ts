import { Router, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { fetchRollingStock } from "../utils/customFetchMethods";
import {
	calculateAutocontrol,
	formatLocomotiveNumber,
} from "../utils/rollingStockUtils";
import { COUNTRY_CODES, KIND_CODES } from "../data/UICData";

dotenv.config();

const rollingStockRouter = Router();
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
			message: "Aucun train trouvé",
		});
	}
});

rollingStockRouter.get("/company", async (req: Request, res: Response) => {
	const customLiveryQuery = req.query.customLivery as string;
	const rollingStock = await fetchRollingStock(
		`https://train-empire.com/api/getCompanyEngines.php?auth=${API_KEY}&noPic=1`,
		customLiveryQuery
	);
	if (rollingStock) {
		res.status(200).json(rollingStock);
	} else {
		res.status(404).json({
			message: "Aucun train trouvé",
		});
	}
});

rollingStockRouter.get(
	"/find-autocontrol",
	async (req: Request, res: Response) => {
		const uicQuery = req.query.uic as string;

		if (!uicQuery || uicQuery.length !== 11) {
			return res
				.status(400)
				.json({ error: "Merci de rentrer un numéro valide de 11 chiffres" });
		}

		try {
			const autocontrol = calculateAutocontrol(uicQuery);
			const formattedNumber = formatLocomotiveNumber(uicQuery, autocontrol);
			console.log(formattedNumber);
			res.status(200).json({
				message: `Le numéro UIC formatté est ${formattedNumber}`,
			});
		} catch (error) {
			res.status(400).json({
				message:
					"Une erreur est survenue lors du calcul de la clé ou lors du formattage du numéro UIC",
			});
		}
	}
);

rollingStockRouter.get("/kind-code", (req: Request, res: Response) => {
	res.status(200).json(KIND_CODES);
});

rollingStockRouter.get("/country-code", (req: Request, res: Response) => {
	res.status(200).json(COUNTRY_CODES);
});
export { rollingStockRouter };
