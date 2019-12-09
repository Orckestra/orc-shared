import { createSelector } from "reselect";
import { currentLocale } from "./locale";
import { setTranslation } from "../utils";

const appData = state => state.get("applications");

const appList = createSelector(appData, data => data.get("list"));

const visibleApps = createSelector(appList, apps =>
	apps.filter(app => app.get("isVisible")),
);

export const localizedAppSelector = createSelector(
	visibleApps,
	currentLocale,
	(apps, locale) =>
		apps.map(app => setTranslation(locale, app, ["displayName"])),
);

export const localizedAppOptionSelector = createSelector(
	localizedAppSelector,
	apps =>
		apps
			.map(app => ({ value: app.get("id"), label: app.get("displayName") }))
			.toArray(),
);
