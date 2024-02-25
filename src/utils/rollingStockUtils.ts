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

function formatLocomotiveNumber(digits: string, luhnDigit: number): string {
	if (digits.length !== 11) {
		throw new Error("Input string must be exactly 12 characters long");
	}

	const typeCode = digits.slice(0, 2);
	const countryCode = digits.slice(2, 4);
	const seriesNumber = digits.slice(4, 8);
	const serialNumber = digits.slice(8, 11);

	return `${typeCode} ${countryCode} ${seriesNumber} ${serialNumber}-${luhnDigit}`;
}

export { calculateAutocontrol, formatLocomotiveNumber };
