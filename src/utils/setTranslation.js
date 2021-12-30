import { flatten } from "./flatten";

/* Replaces a locale string structure with the string for the given locale. */
const setTranslation = (locale, obj, ...field) => {
	if (!obj || !obj.getIn(flatten([field]))) return obj;
	let localeValue = obj.getIn(flatten([field, locale]));
	if (!localeValue && locale.includes("-")) {
		let fieldValue = obj.getIn(flatten([field]));
		let fieldKeys = fieldValue.keys();
		let language = locale.substring(0, locale.indexOf("-"));

		for (let key of fieldKeys) {
			if (key !== locale && key.startsWith(language)) {
				localeValue = obj.getIn(flatten([field, key]));
				if (localeValue) {
					break;
				}
			}
		}
	}
	const value =
		localeValue ||
		obj
			.getIn(flatten([field]))
			.filter(i => i)
			.first() ||
		"";
	return obj.setIn(flatten([field]), value);
};

export default setTranslation;
