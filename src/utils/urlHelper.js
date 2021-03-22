export const getValueFromUrlByKey = (url, path, key) => {
	const valuesFromUrl = url.split("/");

	// remove the regex of the parameters, the part between parentheses (path to regex syntax)
	// eslint-disable-next-line no-useless-escape
	const keysFromPath = path.replace(/(\([^\/]+?\))/g, "").split("/");

	const keyIndex = keysFromPath.indexOf(key);

	return valuesFromUrl[keyIndex];
};

export const NEW_ENTITY_URL_KEY = "new";
/* expected url formats for new mode:
	/new => new
	/new/section => new
	/new{number} => new{number}
	/new{number}/section => new{number}
*/
export const tryGetNewEntityIdKey = url => {
	const valuesFromUrl = url.split("/");
	if (valuesFromUrl.length < 2) return;

	for (const section of valuesFromUrl) {
		if (section === NEW_ENTITY_URL_KEY) return section;
		let match = section.match(`(${NEW_ENTITY_URL_KEY}[0-9]+$)`);
		if (match) return match[1];
	}
};
