import { flatten } from "./flatten";

export const setTranslationWithFallbackValue = (locale, obj, fallbackValue, ...field) => {
	if (!obj) return obj;
	const value = obj.getIn(flatten([field, locale])) || fallbackValue || "";
	return obj.setIn(flatten([field]), value);
};

export const setTranslationWithFallbackField = (locale, obj, fallbackField, ...field) => {
	return setTranslationWithFallbackValue(locale, obj, obj?.get(fallbackField), ...field);
};
