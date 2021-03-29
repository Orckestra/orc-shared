import { flatten } from "./flatten";

export const setTranslationWithFallbackField = (locale, obj, fallbackField, ...field) => {
	if (!obj || !obj.getIn(flatten([field]))) return obj;
	const value = obj.getIn(flatten([field, locale])) || obj.get(fallbackField) || "";
	return obj.setIn(flatten([field]), value);
};

export const setTranslationWithFallbackValue = (locale, obj, fallbackValue, ...field) => {
	if (!obj || !obj.getIn(flatten([field]))) return obj;
	const value = obj.getIn(flatten([field, locale])) || fallbackValue || "";
	return obj.setIn(flatten([field]), value);
};
