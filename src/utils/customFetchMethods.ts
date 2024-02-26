import axios, { AxiosResponse } from "axios";
import { CountryStations, RollingStock, Traject } from "./types";

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

export const fetchTraject = async (
	endpoint: string,
	cb?: (traject: Traject) => boolean
) => {
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

export const fetchRollingStock = async (
	endpoint: string,
	customLivery?: string
) => {
	try {
		const rollingStock: AxiosResponse<RollingStock[]> = await axios.get(
			endpoint
		);
		if (customLivery === "1") {
			return rollingStock.data.filter((rs: RollingStock) =>
				rs.img.includes("/co")
			);
		}
		if (customLivery === "0") {
			return rollingStock.data.filter(
				(rs: RollingStock) => !rs.img.includes("/co")
			);
		}
		if (
			(customLivery && customLivery !== "0") ||
			(customLivery && customLivery !== "1")
		) {
			return undefined;
		}
		return rollingStock.data;
	} catch (error) {
		console.error(error);
	}
};
