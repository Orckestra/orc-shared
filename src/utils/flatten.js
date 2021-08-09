/* Flattens nested arrays */
export const flatten = array =>
	array.reduce(
		(flatArray, item) => (Array.isArray(item) ? flatArray.concat(flatten(item)) : flatArray.concat([item])),
		[],
	);

export const flattenObj = (obj, separator = ".", prefix = "") =>
	Object.entries(obj).reduce((flatObj, [key, val]) => {
		const prefixedKey = prefix + key;
		if (typeof val === "object") {
			const flattenedVal = flattenObj(val, separator, prefixedKey + separator);
			return { ...flatObj, ...flattenedVal };
		}
		flatObj[prefixedKey] = val;
		return flatObj;
	}, {});
