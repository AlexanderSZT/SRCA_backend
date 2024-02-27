/**
 *
 * @param number An eleven string representing the UIC number of the locomotive
 * @returns The autocontrol key of the input number using the Luhn algorithm
 */
function calculateAutocontrol(number: string): number {
	let sum = 0;
	let shouldDouble = true;

	for (let i = 0; i < number.length; i++) {
		let digit = parseInt(number.charAt(i), 10);

		if (shouldDouble) {
			digit *= 2;

			if (digit > 9) {
				digit = (digit % 10) + 1;
			}
		}

		sum += digit;
		shouldDouble = !shouldDouble;
	}

	const checkDigit = (10 - (sum % 10)) % 10;

	return checkDigit;
}

/**
 *
 * @param digits An eleven string representing the UIC number of the locomotive
 * @param autocontrol The 12th number of the UIC number representing it's autocontrol value
 * @returns A formatted string representing in a readable manner the full UIC number with spaces between groups of number
 */
function formatLocomotiveNumber(digits: string, autocontrol: number): string {
	if (digits.length !== 11) {
		throw new Error(
			"Le paramètre digits doit obligatoirement être une chaîne contenant un numéro de 11 chiffres"
		);
	}

	const typeCode = digits.slice(0, 2);
	const countryCode = digits.slice(2, 4);
	const seriesNumber = digits.slice(4, 8);
	const serialNumber = digits.slice(8, 11);

	return `${typeCode} ${countryCode} ${seriesNumber} ${serialNumber}-${autocontrol}`;
}

export { calculateAutocontrol, formatLocomotiveNumber };
