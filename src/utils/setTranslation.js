import { flatten } from "./flatten";

/* Replaces a locale string structure with the string for the given locale. */
const setTranslation = (locale, obj, ...field) => {
	if (!obj || !obj.getIn(flatten([field]))) return obj;
	const value =
		obj.getIn(flatten([field, locale])) ||
		obj
			.getIn(flatten([field]))
			.filter(i => i)
			.first() ||
		"";
	return obj.setIn(flatten([field]), value);
};

export default setTranslation;
