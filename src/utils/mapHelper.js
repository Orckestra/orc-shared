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
	// ]
	// if you don't need this - just don't pass any value for that parameter

	const result = cloneDeep(initialModel);

	const modifiedFeilds = Object.keys(model);

	modifiedFeilds.forEach(modifiedFeild => {
		const tempRule = mappingRules.find(rule => rule.modelName === modifiedFeild);
		if (tempRule != null) {
			result[tempRule.domainName] = model[tempRule.modelName].value;
		} else {
			result[modifiedFeild] = model[modifiedFeild].value;
		}
	});

	return result;
};
