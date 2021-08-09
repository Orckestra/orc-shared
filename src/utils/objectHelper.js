export const createObjectWithKeysAndValues = (keys = [], values = [], defaultValue = "") => {
	const result = {};

	if (keys.length !== values.length) {
		for (let i = 0; i < keys.length; i++) {
			result[keys[i]] = defaultValue;
		}
	} else {
		for (let i = 0; i < keys.length; i++) {
			result[keys[i]] = values[i] || defaultValue;
		}
	}

	return result;
};
