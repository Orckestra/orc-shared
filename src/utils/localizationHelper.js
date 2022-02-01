import { getPropertyOrDefault } from "./propertyHelper";

export function getLocalization(localizations, locale, defaultValue, useDefaultForEmptyValue = true) {
	const fallbackValue = getNotLocalizedString(defaultValue);

	if (!localizations || !locale) return fallbackValue;

	let localisation = getPropertyOrDefault(localizations, locale, fallbackValue, true);

	if (localisation === fallbackValue) {
		localisation = getPropertyOrDefault(localizations, locale.split("-")[0], fallbackValue, true, true);
	}

	if (useDefaultForEmptyValue && localisation?.trim() === "") {
		return fallbackValue;
	}

	return localisation;
}

export function getNotLocalizedString(value) {
	return value && `[${value}]`;
}

export function findCorrespondingLocale(locales, language) {
	return (
		locales[language] ??
		locales[language.replace(/-/g, "")] ??
		locales[language.toLowerCase()] ??
		locales[language.toLowerCase().replace(/-/g, "")] ??
		locales[language.substring(0, 2).toLowerCase()] ??
		null
	);
}

export default {
	getLocalization,
	getNotLocalizedString,
	findCorrespondingLocale,
};
