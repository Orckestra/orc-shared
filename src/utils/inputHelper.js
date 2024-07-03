export const trimSpacesAndLeadingZeros = (value, fallback = "") => {
	const trimmed = (value ?? "").trim().replace(/^0+/, "");
	return trimmed === "" ? fallback : limitNumericValueLength(trimmed);
};

export const limitNumericValueLength = (value, maximum = 9) => value.substring(0, maximum);
