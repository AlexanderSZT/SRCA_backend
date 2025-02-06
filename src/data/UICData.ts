import { UICCountryCode, UICKindCode } from "../utils/types";

const KIND_CODES: UICKindCode[] = [
	{
		code: 50,
		label: "Voiture de passagers, usage domestique uniquement",
		type: "passenger",
	},
	{
		code: 51,
		label: "Voiture de passagers, usage international (RIC), écartement fixe",
		type: "passenger",
	},
	{
		code: 52,
		label: "Voiture de passagers, usage international (RIC), écartement variable",
		type: "passenger",
	},
	{
		code: 61,
		label: "Voiture de passagers, Eurocity, écartement fixe",
		type: "passenger",
	},
	{
		code: 62,
		label: "Voiture de passagers, Eurocity, écartement variable",
		type: "passenger",
	},
	{
		code: 90,
		label: "Autre, vapeur",
		type: "passenger",
	},
	{
		code: 91,
		label: "Locomotive électrique",
		type: "motorised",
	},
	{
		code: 92,
		label: "Locomotive diesel",
		type: "motorised",
	},
	{
		code: 93,
		label: "Automotrice électrique (grande vitesse) - Motrice ou remorque",
		type: "motorised",
	},
	{
		code: 94,
		label: "Automotrice électrique (basse vitesse) - Motrice ou remorque",
		type: "motorised",
	},
	{
		code: 95,
		label: "Automotrice diesel - Motrice ou remorque",
		type: "motorised",
	},
	{
		code: 96,
		label: "Remorque spéciale",
		type: "other",
	},
	{
		code: 97,
		label: "Locomotive de manoeuvre électrique",
		type: "motorised",
	},
	{
		code: 98,
		label: "Locomotive de manoeuvre diesel",
		type: "motorised",
	},
	{
		code: 99,
		label: "Spécial",
		type: "other",
	},
];

const COUNTRY_CODES: UICCountryCode[] = [
	{
		code: 10,
		iso: "FIN",
		label: "Finlande",
	},
	{
		code: 20,
		iso: "RUS",
		label: "Russie",
	},
	{
		code: 21,
		iso: "BY",
		label: "Biélorussie",
	},
	{
		code: 22,
		iso: "UA",
		label: "Ukraine",
	},
	{
		code: 23,
		iso: "MD",
		label: "Moldavie",
	},
	{
		code: 24,
		iso: "LT",
		label: "Lituanie",
	},
	{
		code: 25,
		iso: "LV",
		label: "Lettonie",
	},
	{
		code: 26,
		iso: "EST",
		label: "Estonie",
	},
	{
		code: 41,
		iso: "AL",
		label: "Albanie",
	},
	{
		code: 44,
		iso: "BA",
		label: "Bosnie-Herzégovine (République serbe)",
	},
	{
		code: 49,
		iso: "BA",
		label: "Bosnie-Herzégovine",
	},
	{
		code: 50,
		iso: "BA",
		label: "Bosnie-Herzgovine (Fédération croato-musulmane)",
	},
	{
		code: 51,
		iso: "PL",
		label: "Pologne",
	},
	{
		code: 52,
		iso: "BG",
		label: "Bulgarie",
	},
	{
		code: 53,
		iso: "RO",
		label: "Roumanie",
	},
	{
		code: 54,
		iso: "CZ",
		label: "Tchéquie (République Tchèque)",
	},
	{
		code: 55,
		iso: "H",
		label: "Hongrie",
	},
	{
		code: 56,
		iso: "SK",
		label: "Slovaquie",
	},
	{
		code: 60,
		iso: "IRL",
		label: "Irlande",
	},
	{
		code: 62,
		iso: "MNE",
		label: "Monténégro",
	},
	{
		code: 65,
		iso: "MK",
		label: "Macédoine du Nord",
	},
	{
		code: 70,
		iso: "GB",
		label: "Royaume-Uni",
	},
	{
		code: 71,
		iso: "E",
		label: "Espagne",
	},
	{
		code: 72,
		iso: "SRB",
		label: "Serbie",
	},
	{
		code: 73,
		iso: "GR",
		label: "Grèce",
	},
	{
		code: 74,
		iso: "S",
		label: "Suède",
	},
	{
		code: 75,
		iso: "TR",
		label: "Turquie",
	},
	{
		code: 76,
		iso: "N",
		label: "Norvège",
	},
	{
		code: 78,
		iso: "HR",
		label: "Croatie",
	},
	{
		code: 79,
		iso: "SLO",
		label: "Slovénie",
	},
	{
		code: 80,
		iso: "D",
		label: "Allemagne",
	},
	{
		code: 81,
		iso: "A",
		label: "Autriche",
	},
	{
		code: 82,
		iso: "L",
		label: "Luxembourg",
	},
	{
		code: 83,
		iso: "I",
		label: "Italie",
	},
	{
		code: 84,
		iso: "NL",
		label: "Pays-Bas",
	},
	{
		code: 85,
		iso: "CH",
		label: "Suisse",
	},
	{
		code: 86,
		iso: "DK",
		label: "Danemark",
	},
	{
		code: 87,
		iso: "F",
		label: "France",
	},
	{
		code: 88,
		iso: "B",
		label: "Belgique",
	},
	{
		code: 94,
		iso: "P",
		label: "Portugal",
	},
];
export { KIND_CODES, COUNTRY_CODES };
