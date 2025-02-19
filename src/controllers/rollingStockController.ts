import dotenv from "dotenv";
import { Request, Response } from "express";
import { fetchRollingStock } from "../utils/customFetchMethods";
import { calculateAutocontrol, formatRollingStockNumber } from "../utils/rollingStockUtils";
import { UICCountryCode, UICKindCode } from "../schemas/UICData";

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
		const formattedNumber = await formatRollingStockNumber(uicQuery, autocontrol);
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
	try {
		const kindCodes = await UICKindCode.find({});
		res.status(200).json(kindCodes);
	} catch (error) {
		res.status(500).json({ error: "Une erreur est survenue lors de la récupération des codes de type" });
	}
};

const countryCode = async (req: Request, res: Response) => {
	try {
		const countryCodes = await UICCountryCode.find({});
		res.status(200).json(countryCodes);
	} catch (error) {
		res.status(500).json({ error: "Une erreur est survenue lors de la récupération des codes de pays" });
	}
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
