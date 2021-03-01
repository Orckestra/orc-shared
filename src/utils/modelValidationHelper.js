import { isStringNullOrWhitespace } from "./propertyValidator";
import { validationErrorTypes } from "../constants";
import { isEmpty } from "lodash";

export const validationRules = {
	[validationErrorTypes.fieldIsRequired]: value => (isStringNullOrWhitespace(value) ? false : true),
};

export const showError = field => {
	if (field == null) return false;

	return field.value != null && field.error != null;
};

export const hasValidationErrors = model => {
	// if model is empty we will return true
	// because of the context of usage of this helper function
	// since it's expected to be used as a condition to decide
	// if we should or shouldn't send request to API
	if (isEmpty(model)) return true;

	const fields = Object.keys(model);

	for (const field of fields) {
		if (model[field].error != null) {
			return true;
		}
	}

	return false;
};
