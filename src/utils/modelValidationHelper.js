import { isStringNullOrWhitespace, isString, isPropertyBagAttribute } from "./propertyValidator";
import { validationErrorTypes } from "../constants";
import { isEmpty } from "lodash";

export const validationRules = {
	[validationErrorTypes.fieldIsRequired]: value => {
		if (value === null || value === undefined) return false;
		if (isString(value) && isStringNullOrWhitespace(value)) return false;
		if (isPropertyBagAttribute(value) && isString(value.value) && isStringNullOrWhitespace(value.value)) return false;

		return true;
	},
};

export const showError = field => {
	if (field == null) return false;

	return field.error != null;
};

export const hasValidationErrors = (editState, validationMap) => {
	if (isEmpty(editState)) return true;

	const fields = Object.keys(editState);

	let hasAnyValidationErrors = false;

	fields.forEach(field => {
		const isValid = editState[field].isValid();
		if (isValid === false) {
			hasAnyValidationErrors = true;
		}
	});

	if (validationMap) {
		const mapKeys = Object.keys(validationMap);
		mapKeys.forEach(mapKey => {
			validationMap[mapKey].map.forEach(node => {
				const fullNodePath = mapKey.concat(".", node.path);

				if (node.elements) {
					node.elements.forEach(element => {
						const fullElementPath = `${fullNodePath}.${element.path}`;
						const errorTypes = [...validationMap[mapKey].errorTypes, ...node.errorTypes, ...element.errorTypes];
						const isValid = editState[mapKey].isValid(null, fullElementPath, errorTypes);
						if (isValid === false) {
							hasAnyValidationErrors = true;
						}
					});
				} else {
					const errorTypes = [...validationMap[mapKey].errorTypes, ...node.errorTypes];
					const isValid = editState[mapKey].isValid(null, fullNodePath, errorTypes);
					if (isValid === false) {
						hasAnyValidationErrors = true;
					}
				}
			});
		});
	}

	return hasAnyValidationErrors;
};

export const hasMultipleFieldValidationErrors = editStates => {
	if (editStates) {
		for (const id of Object.keys(editStates)) {
			const groupedStates = editStates[id];

			if (hasValidationErrors(groupedStates) !== false) {
				return true;
			}
		}
	}

	return false;
};
