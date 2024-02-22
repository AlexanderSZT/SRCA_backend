export type Traject = {
	innerId: number;
	name: string;
	service: string;
	from: string;
	to: string;
	intermediate: string;
	departure: string;
	arrival: string;
	arrivalR: string | null;
	trainset: string;
	filiale: string;
	type: string;
	price1: string;
	price2: string;
	ongoing: string;
	day: string;
};

export type CountryStations = {
	country: string;
	countryStations: {
		id: string;
		name: string;
	}[];
};

export type RollingStock = {
	id: number;
	name: string;
	quant: number;
	img: string;
};
