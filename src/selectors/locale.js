import { createSelector } from "reselect";

const localeData = state => state.get("locale");

export const currentLocale = createSelector(
	localeData,
	data => data.get("locale") || data.getIn(["supportedLocales", 0]),
);
