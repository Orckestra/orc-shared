const parseGuid = guid => {
	if (guid.length !== 32) return "";

	const partsLength = [8, 4, 4, 4, 12];
	let parsedGuid = "";

	let lastIndex = 0;

	for (let i = 0; i < partsLength.length; i++) {
		parsedGuid += guid.substring(lastIndex, lastIndex + partsLength[i]);
		lastIndex += partsLength[i];

		if (i !== partsLength.length - 1) {
			parsedGuid += "-";
		}
	}

	return parsedGuid;
};

export { parseGuid };
