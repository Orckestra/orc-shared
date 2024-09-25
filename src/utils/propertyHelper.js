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
		return Object.prototype.hasOwnProperty.call(obj, property) ? obj[property] : defaultValue;
	}

	const compareFunction = startWith ? caseInsensitiveStartWithCompare : caseInsensitiveCompare;

	for (let prop in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, prop) && compareFunction(prop, property)) {
			return obj[prop];
		}
	}

	return defaultValue;
}

export const isObjectContainsPropertyWithValue = (obj, propertyName, value) => {
	if (obj === null || obj === undefined) return false;

	if (Object.prototype.hasOwnProperty.call(obj, propertyName) && obj[propertyName] === value) {
		return true;
	}

	for (let prop in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, prop) && typeof obj[prop] === "object") {
			if (isObjectContainsPropertyWithValue(obj[prop], propertyName, value)) return true;
		}
	}

	return false;
};

export const isObjectContainsPropertyWithAnyValue = (obj, propertyName) => {
	if (!obj) return false;

	if (Object.prototype.hasOwnProperty.call(obj, propertyName) && obj[propertyName]) {
		return true;
	}

	for (let prop in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, prop) && typeof obj[prop] === "object") {
			if (isObjectContainsPropertyWithAnyValue(obj[prop], propertyName)) return true;
		}
	}

	return false;
};

export const compareObjectProperty = (obj1, obj2, propertyName) => {
	if (propertyName == null || propertyName === "") {
		return 0;
	}

	const val1 = obj1?.[propertyName];
	const val2 = obj2?.[propertyName];

	if (val1 === val2) {
		return 0;
	}

	if (val1 < val2) {
		return -1;
	}

	return 1;
};

export const compareObjectPropertyDescending = (obj1, obj2, propertyName) => {
	if (propertyName == null || propertyName === "") {
		return 0;
	}

	const val1 = obj1?.[propertyName];
	const val2 = obj2?.[propertyName];

	if (val1 === val2) {
		return 0;
	}

	if (val1 > val2) {
		return -1;
	}

	return 1;
};
