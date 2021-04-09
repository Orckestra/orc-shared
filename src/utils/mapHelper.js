import { cloneDeep, merge, get } from "lodash";

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
	// notice you need to define a full pass to you property to get it correctly
	// 	{
	// 		modelName: "modelName3.path1.path2",
	// 		transform: (objValue, srcValue, object, source) => { /* Custom mapping code. */ }
	// 	},
	// ]
	// if you don't need this - just don't pass any value for that parameter

	const mapModifiedData = model => {
		const mapModifiedObj = obj => {
			if (typeof obj !== "object" || Array.isArray(obj)) return obj;
			if (obj.wasModified != null) return mapModifiedObj(obj.value);

			return mapModifiedData(obj);
		};

		const result = {};

		const modifiedFields = Object.keys(model);

		modifiedFields.forEach(modifiedField => {
			const tempRule = mappingRules.find(rule => rule.modelName === modifiedField);
			if (tempRule != null && tempRule.domainName) {
				result[tempRule.domainName] = mapModifiedObj(model[tempRule.modelName]);
			} else {
				result[modifiedField] = mapModifiedObj(model[modifiedField]);
			}
		});

		return result;
	};

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
