import { cloneDeep, merge, get } from "lodash";

export const mapModifiedData = model => {
	const mapModifiedObj = obj => {
		if (obj === null || obj === undefined) return obj;
		if (obj.wasModified != null) return mapModifiedObj(obj.value);

		return mapModifiedData(obj);
	};

	let result;

	if (typeof model === "object" || Array.isArray(model)) {
		result = Array.isArray(model) ? [] : {};
		const modifiedFields = Object.keys(model);

		modifiedFields.forEach(modifiedField => {
			result[modifiedField] = mapModifiedObj(model[modifiedField]);
		});
	} else {
		result = model;
	}

	return result;
};

export const mapModel = (model, initialModel, mappingRules = []) => {
	// if need to map fields with different model keys then
	// mappingRules should be an array like
	// [
	// notice you need to define a full pass to you property to get it correctly
	// 	{
	// 		modelName: "modelName3.path1.path2",
	// 		transform: (objValue, srcValue, object, source) => { /* Custom mapping code. */ }
	// 	},
	// ]
	// if you don't need this - just don't pass any value for that parameter

	let mergedModel = cloneDeep(initialModel);
	const modifiedModel = mapModifiedData(model);
	mergedModel = merge(mergedModel, modifiedModel);
	mappingRules.forEach(rule => {
		let initialField = get(mergedModel, rule.modelName);
		let modifiedField = get(modifiedModel, rule.modelName);
		if (modifiedField !== undefined) {
			rule.transform(initialField, modifiedField, mergedModel, modifiedModel);
		}
	});

	return merge({}, mergedModel);
};
