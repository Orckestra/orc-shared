import { isStringNullOrWhitespace } from "./propertyValidator";
import { validationErrorTypes } from "../constants";
import { isEmpty } from "lodash";

export const validationRules = {
	[validationErrorTypes.fieldIsRequired]: value => (isStringNullOrWhitespace(value) ? false : true),
};

export const showError = field => {
	if (field == null) return false;

	return field.error != null;
};

export const hasValidationErrors = editState => {
	if (isEmpty(editState)) return true;

	const fields = Object.keys(editState);

	let hasAnyValidationErrors = false;

	fields.forEach(field => {
		const isValid = editState[field].isValid();
		if (isValid === false) {
			hasAnyValidationErrors = true;
		}
	});

	return hasAnyValidationErrors;
};
