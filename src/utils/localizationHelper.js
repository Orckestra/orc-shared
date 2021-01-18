import { getPropertyOrDefault } from "./propertyHelper";

export function getLocalization(localizations, locale, defaultValue) {
	const fallbackValue = getNotLocalizedString(defaultValue);

	if (!localizations || !locale) return fallbackValue;

	const localisation = getPropertyOrDefault(localizations, locale, fallbackValue, true);

	if (localisation === fallbackValue) {
		return getPropertyOrDefault(localizations, locale.split("-")[0], fallbackValue, true, true);
	}

	return localisation;
}

export function getNotLocalizedString(value) {
	return value && `[${value}]`;
}

export default {
	getLocalization,
	getNotLocalizedString,
};
