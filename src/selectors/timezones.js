import { createSelector } from "reselect";

const timezonesData = state => state.get("timezones");

export const localizedTimezone = timezoneId => {
	return createSelector(timezonesData, timezones => {
		const timezoneDisplayName = timezones.getIn([timezoneId, "displayName"]);
		return timezoneDisplayName || null;
	});
};

export const timezonesSelector = createSelector(timezonesData, timezones => timezones.valueSeq().toArray());
