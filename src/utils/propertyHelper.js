const { Map } = require("immutable");

const caseInsensitiveCompare = (prop, property) => prop.toLowerCase() === property.toLowerCase();

const caseInsensitiveStartWithCompare = (prop, property) => prop.toLowerCase().startsWith(property.toLowerCase());

export function getPropertyOrDefaultFromMap(map, property, defaultValue, ignoreCase, startWith) {
	if (ignoreCase === false && startWith === false) return map.get(property) || defaultValue;

	const compareFunction = startWith ? caseInsensitiveStartWithCompare : caseInsensitiveCompare;

	return map.find((value, key) => compareFunction(key, property)) || defaultValue;
}

export function getPropertyOrDefault(obj, property, defaultValue, ignoreCase = false, startWith = false) {
	if (!obj) {
		return defaultValue;
	}

	if (Map.isMap(obj)) {
		return getPropertyOrDefaultFromMap(obj, property, defaultValue, ignoreCase, startWith);
	}

	if (ignoreCase === false && startWith === false) {
		return obj.hasOwnProperty(property) ? obj[property] : defaultValue;
	}

	const compareFunction = startWith ? caseInsensitiveStartWithCompare : caseInsensitiveCompare;

	for (let prop in obj) {
		if (obj.hasOwnProperty(prop) && compareFunction(prop, property)) {
			return obj[prop];
		}
	}

	return defaultValue;
}

export const isObjectContainsPropertyWithValue = (obj, propertyName, value) => {
	if (obj.hasOwnProperty(propertyName) && obj[propertyName] === value) {
		return true;
	}

	for (let prop in obj) {
		if (obj.hasOwnProperty(prop) && typeof obj[prop] === "object") {
			if (isObjectContainsPropertyWithValue(obj[prop], propertyName, value)) return true;
		}
	}

	return false;
};
