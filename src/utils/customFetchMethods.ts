import axios, { AxiosResponse } from "axios";
import { CountryStations, RollingStock, Traject } from "./types";

/**
 * Fetches a list of stations from the given endpoint and formats them by country.
 *
 * @param {string} endpoint - The API endpoint to fetch the stations from.
 * @returns {Promise<CountryStations[]>} A promise that resolves to a list of formatted stations by country.
 * @throws Will log an error to the console if the fetch operation fails.
 */
export const fetchStations = async (endpoint: string) => {
	try {
		const stations: AxiosResponse = await axios.get(endpoint);
		const formattedStationsList: CountryStations[] = [];

		for (const [country, countryStations] of Object.entries(stations.data)) {
			formattedStationsList.push({
				country: country,
				countryStations: countryStations,
			} as CountryStations);
		}

		return formattedStationsList;
	} catch (error) {
		console.error(error);
	}
};

/**
 * Fetches traject data from the specified endpoint and optionally filters it using a callback function.
 *
 * @param {string} endpoint - The endpoint URL to fetch the traject data from.
 * @param {(traject: Traject) => boolean} [cb] - Optional callback function to filter the fetched traject data.
 * @returns {Promise<Traject[]>} A promise that resolves to an array of Traject objects, optionally filtered by the callback function.
 * @throws Will log an error to the console if the fetch operation fails.
 */
export const fetchTraject = async (endpoint: string, cb?: (traject: Traject) => boolean) => {
	try {
		const trajects: AxiosResponse<Traject[]> = await axios.get(endpoint);
		if (cb) {
			return trajects.data.filter(cb);
		}
		return trajects.data;
	} catch (error) {
		console.error(error);
	}
};

/**
 * Fetches rolling stock data from the specified endpoint and optionally filters by custom livery.
 *
 * @param {string} endpoint - The API endpoint to fetch rolling stock data from.
 * @param {string} [customLivery] - Optional parameter to filter rolling stock by custom livery.
 *                                  If "1", returns rolling stock with custom livery.
 *                                  If "0", returns rolling stock without custom livery.
 *                                  If any other value, returns undefined.
 * @returns {Promise<RollingStock[] | undefined>} - A promise that resolves to an array of RollingStock objects
 *                                                  or undefined if the customLivery parameter is invalid.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetchRollingStock = async (endpoint: string, customLivery?: string) => {
	try {
		const rollingStock: AxiosResponse<RollingStock[]> = await axios.get(endpoint);
		if (customLivery === "1") {
			return rollingStock.data.filter((rs: RollingStock) => rs.img.includes("/co"));
		}
		if (customLivery === "0") {
			return rollingStock.data.filter((rs: RollingStock) => !rs.img.includes("/co"));
		}
		if ((customLivery && customLivery !== "0") || (customLivery && customLivery !== "1")) {
			return undefined;
		}
		return rollingStock.data;
	} catch (error) {
		console.error(error);
	}
};
