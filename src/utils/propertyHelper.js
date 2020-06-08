export function getPropertyOrDefault(
	obj,
	property,
	defaultValue,
	ignoreCase = false,
	startWith = false,
) {
	if (!obj) {
		return defaultValue;
	}

	if (ignoreCase === false && startWith === false) {
		return obj.hasOwnProperty(property) ? obj[property] : defaultValue;
	}

	const compareFct =
		startWith === false
			? (prop, property) => prop.toLowerCase() === property.toLowerCase()
			: (prop, property) => prop.toLowerCase().startsWith(property.toLowerCase());

	for (let prop in obj) {
		if (obj.hasOwnProperty(prop) && compareFct(prop, property)) {
			return obj[prop];
		}
	}

	return defaultValue;
}
