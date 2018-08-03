import Immutable from "immutable";
import { createSelector } from "reselect";

const localeData = state => state.get("locale");

export const defaultLocale = createSelector(
	localeData,
	data => data.getIn(["supportedLocales", 0]) || "en",
);

export const currentLocale = createSelector(
	localeData,
	defaultLocale,
	(data, defaultLocale) => data.get("locale") || defaultLocale,
);

export const cultures = createSelector(localeData, locale =>
	locale.get("cultures"),
);

export const cultureList = createSelector(
	cultures,
	(cultures = Immutable.Map()) => cultures.keySeq(),
);

export const defaultCulture = createSelector(localeData, locale =>
	locale.get("defaultCulture"),
);

export const orderedCultureList = createSelector(
	cultureList,
	defaultCulture,
	(cultures = Immutable.Seq(), defaultCulture = "en") =>
		cultures.sort((a, b) => {
			if (a === defaultCulture) return -1;
			if (b === defaultCulture) return 1;
			return 0;
		}),
);
