import _ from "lodash";

export const partialDeepEqual = (x, y, ignoredRootProps = null) => {
	if (x == null || y == null) return x === y;

	const keys = Object.keys(x);
	if (!_.isEqual(keys, Object.keys(y))) {
		return false;
	}

	for (let key of keys) {
		if (ignoredRootProps && ignoredRootProps.includes(key)) {
			continue;
		}

		if (!_.isEqual(x[key], y[key])) {
			return false;
		}
	}

	return true;
};

export const areGuidsEquals = (first, second) => {
	function stripDash(value) {
		return value?.replace(/-/g, "");
	}

	return areEqualCaseInsensitive(stripDash(first), stripDash(second));
};

export const areEqualCaseInsensitive = (first, second) => {
	const isFirstNullish = first === null || first === undefined;
	const isSecondNullish = second === null || second === undefined;

	if (isFirstNullish || isSecondNullish) {
		return isFirstNullish && isSecondNullish;
	}

	return first.localeCompare(second, undefined, { sensitivity: "accent" }) === 0;
};

const processOrderResult = (ascendingOrder, compareResult) => {
	if (!ascendingOrder && compareResult != 0) {
		return compareResult * -1;
	}
	return compareResult;
};

export const compareTextCaseInsensitive = (first, second, ascendingOrder = true, nullValue = "") => {
	return processOrderResult(
		ascendingOrder,
		(first ?? nullValue).localeCompare(second ?? nullValue, undefined, { sensitivity: "accent" }),
	);
};

export const getBooleanValue = value => {
	let result = null;

	if (typeof value === "string") {
		if (areEqualCaseInsensitive(value, "true")) {
			result = true;
		} else if (areEqualCaseInsensitive(value, "false")) {
			result = false;
		}
	} else if (typeof value === "boolean") {
		result = value === true;
	}

	return result;
};

export const compareBoolean = (first, second) => {
	const firstBool = getBooleanValue(first);
	const secondBool = getBooleanValue(second);

	if (firstBool === null && secondBool === null) {
		return false;
	}

	return firstBool === secondBool;
};

export const compareNumeric = (first, second, ascendingOrder = true, nullValue = 0.0) => {
	if (typeof first === "string" || first instanceof String || typeof second === "string" || second instanceof String) {
		return processOrderResult(
			ascendingOrder,
			(first ?? nullValue.toString()).localeCompare(second ?? nullValue.toString(), undefined, {
				numeric: true,
			}),
		);
	}

	let result = 0;
	if ((first ?? nullValue) < (second ?? nullValue)) {
		result = -1;
	} else if ((first ?? nullValue) > (second ?? nullValue)) {
		result = 1;
	}

	return processOrderResult(ascendingOrder, result);
};

export const doesObjectContainsTextCaseInsensitive = (obj, searchTerm, properties = []) => {
	const caseInsensitiveIncludes = (a, b) => {
		return a?.toLowerCase().includes(b);
	};

	if (!obj) {
		return false;
	}

	if (searchTerm === null || searchTerm === undefined || searchTerm === "") {
		return true;
	}

	const loweredSearchTerm = searchTerm.toLowerCase();
	const propertiesToSearch = properties.length > 0 ? properties : Object.keys(obj);
	const result =
		propertiesToSearch.find(key => {
			if (typeof obj[key] === "string") {
				return caseInsensitiveIncludes(obj[key], loweredSearchTerm);
			}

			if (typeof obj[key] === "object" && obj[key]) {
				const objectValues = Object.values(obj[key]);
				return objectValues.find(
					ovKey => typeof ovKey === "string" && caseInsensitiveIncludes(ovKey, loweredSearchTerm),
				);
			}

			return false;
		}) !== undefined;
	return result;
};
