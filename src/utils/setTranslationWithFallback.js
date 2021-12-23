import { flatten } from "./flatten";

export const setTranslationWithFallbackValue = (locale, obj, fallbackValue, ...field) => {
	if (!obj) return obj;
	let localeValue = obj.getIn(flatten([field, locale]));
	if (!localeValue && locale.includes("-")) {
		let fieldValue = obj.getIn(flatten([field]));
		if (fieldValue) {
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
	}
	const value = localeValue || fallbackValue || "";
	return obj.setIn(flatten([field]), value);
};

export const setTranslationWithFallbackField = (locale, obj, fallbackField, ...field) => {
	return setTranslationWithFallbackValue(locale, obj, obj?.get(fallbackField), ...field);
};
