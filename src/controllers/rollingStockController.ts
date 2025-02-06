import dotenv from "dotenv";
import { Request, Response } from "express";
import { fetchRollingStock } from "../utils/customFetchMethods";
import { calculateAutocontrol, formatRollingStockNumber } from "../utils/rollingStockUtils";
import { COUNTRY_CODES, KIND_CODES } from "../data/UICData";

dotenv.config();
const API_KEY = process.env.API_KEY;

const index = (req: Request, res: Response) => {
	return res.send("Rolling Stock router root endpoint");
};

const getAllRollingStock = async (req: Request, res: Response) => {
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
};

const getCompanyRollingStock = async (req: Request, res: Response) => {
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
};

const findAutocontrol = async (req: Request, res: Response) => {
	const uicQuery = req.query.uic as string;

	if (!uicQuery || uicQuery.length !== 11) {
		return res.status(400).json({ error: "Merci de rentrer un numéro valide de 11 chiffres" });
	}

	try {
		const autocontrol = calculateAutocontrol(uicQuery);
		const formattedNumber = formatRollingStockNumber(uicQuery, autocontrol);
		console.log(formattedNumber);
		res.status(200).json({
			message: `Le numéro UIC formatté est ${formattedNumber}`,
		});
	} catch (error) {
		res.status(400).json({
			message: "Une erreur est survenue lors du calcul de la clé ou lors du formattage du numéro UIC",
		});
	}
};

const kindCode = async (req: Request, res: Response) => {
	res.status(200).json(KIND_CODES);
};

const countryCode = async (req: Request, res: Response) => {
	res.status(200).json(COUNTRY_CODES);
};

const rollingStockController = {
	index,
	getAllRollingStock,
	getCompanyRollingStock,
	findAutocontrol,
	kindCode,
	countryCode,
};

export default rollingStockController;
