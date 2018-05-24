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
