export const trimSpacesAndLeadingZeros = (value, fallback = "") => {
	if (!value || isNaN(value)) {
		return fallback;
	}

	let trimmed = value.trim();
	const isNegative = trimmed[0] === "-";
	if (isNegative) {
		trimmed = trimmed.substring(1, trimmed.length);
	}

	const withoutLeadingZeros = trimmed.replace(/^0+/, "");
	if (withoutLeadingZeros == "") {
		return "0";
	}

	const cleanNumber = `${isNegative ? "-" : ""}${withoutLeadingZeros}`;

	return limitNumericValueLength(cleanNumber);
};

export const limitNumericValueLength = (value, maximum = 9) => value.substring(0, maximum);
