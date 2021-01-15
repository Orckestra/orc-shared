import Immutable from "immutable";
import { createSelector } from "reselect";
import { cultureByDefault } from "../reducers/localeFactory";

const localeData = state => state.get("locale");

export const defaultLocale = createSelector(
	localeData,
	data => data.getIn(["supportedLocales", 0, "cultureIso"]) || cultureByDefault,
);

const supportedLocales = createSelector(
	localeData,
	data => data.getIn(["supportedLocales"]) || Immutable.fromJS([]),
);

export const currentLocaleOrDefault = createSelector(
	localeData,
	defaultLocale,
	(data, defaultLocale) => data.get("locale") || defaultLocale,
);

export const currentLocale = createSelector(localeData, data => data.get("locale"));

export const cultures = createSelector(localeData, locale => locale.get("cultures"));

export const cultureList = createSelector(cultures, cultures => cultures.keySeq());

export const defaultCulture = createSelector(localeData, locale =>
	locale.get("defaultCulture"),
);

export const orderedCultureList = createSelector(
	cultureList,
	defaultCulture,
	(cultures, defaultCulture) =>
		cultures.sort((a, b) => {
			/*istanbul ignore if */ if (a === defaultCulture) return -1;
			if (b === defaultCulture) return 1;
			return 0;
		}),
);

export const cultureOptionList = createSelector(supportedLocales, locales =>
	locales.map(iso => ({
		value: iso.get("cultureIso"),
		label: iso.get("language"),
	})),
);

export const cultureNameByIsoCode = cultureIsoCode => createSelector(cultures, cultures => {
	const culturesList = cultures?.toJS();
	if (cultureIsoCode != null) {
		const culture = culturesList[cultureIsoCode];
		if (culture != null) {
			return culture.cultureName;
		}
		return `[${cultureIsoCode}]`;
	}
	return null;
});