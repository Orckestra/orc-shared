import { cloneDeep, merge } from "lodash";

export const mapModel = (model, initialModel, mappingRules = []) => {
	// if need to map fields with different model and domain keys then
	// mappingRules should be an array like
	// [
	// 	{
	// 		modelName: "modelName1",
	// 		domainName: "domainName1"
	// 	},
	// 	{
	// 		modelName: "modelName2",
	// 		domainName: "domainName2"
	// 	},
	// 	{
	// 		modelName: "modelName3",
	// 		transform: (model, modelValue, result) => { /* Custom mapping code. */ }
	// 	},
	// ]
	// if you don't need this - just don't pass any value for that parameter

	const mapModifiedData = model => {
		const mapModifiedObj = obj => {
			if (typeof obj !== "object" || Array.isArray(obj)) return obj;
			if (obj.wasModified !== undefined) return mapModifiedObj(obj.value);

			return mapModifiedData(obj);
		};

		const result = {};

		const modifiedFields = Object.keys(model);

		modifiedFields.forEach(modifiedField => {
			const tempRule = mappingRules.find(rule => rule.modelName === modifiedField);
			if (tempRule != null) {
				if (tempRule.transform) {
					tempRule.transform(model, model[tempRule.modelName].value, result);
				} else {
					result[tempRule.domainName] = mapModifiedObj(model[tempRule.modelName]);
				}
			} else {
				result[modifiedField] = mapModifiedObj(model[modifiedField]);
			}
		});

		return result;
	};

	return merge({}, initialModel, mapModifiedData(model));
};
