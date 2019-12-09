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

export const cultureList = createSelector(cultures, cultures =>
	cultures.keySeq(),
);

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

export const orderedCultureOptionList = createSelector(
	orderedCultureList,
	cultures,
	(list, cultures) =>
		list.map(iso => ({
			value: iso,
			label: cultures.getIn([iso, "cultureName"]),
		})),
);
