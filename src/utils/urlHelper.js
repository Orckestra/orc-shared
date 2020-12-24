export const getValueFromUrlByKey = (url, path, key) => {
	const valuesFromUrl = url.split("/");

	const keysFromPath = path.split("/");

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
	if (url.endsWith(`/${NEW_ENTITY_URL_KEY}`) || url.indexOf(`/${NEW_ENTITY_URL_KEY}/`) >= 0) return NEW_ENTITY_URL_KEY;

	let match = url.match(`/(${NEW_ENTITY_URL_KEY}[0-9]+$)`);
	if (match) return match[1];

	match = url.match(`/(${NEW_ENTITY_URL_KEY}[0-9]+)(/+)`);
	if (match) return match[1];

	return undefined;
};
