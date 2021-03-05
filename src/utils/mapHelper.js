import { cloneDeep } from "lodash";

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

	const result = initialModel != null ? cloneDeep(initialModel) : {};

	const modifiedFields = Object.keys(model);

	modifiedFields.forEach(modifiedFeild => {
		const tempRule = mappingRules.find(rule => rule.modelName === modifiedFeild);
		if (tempRule != null) {
			if (tempRule.transform) {
				tempRule.transform(model, model[tempRule.modelName].value, result);
			} else {
				result[tempRule.domainName] = model[tempRule.modelName].value;
			}
		} else {
			result[modifiedFeild] = model[modifiedFeild].value;
		}
	});

	return result;
};
