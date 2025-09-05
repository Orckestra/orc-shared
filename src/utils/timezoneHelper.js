import moment from "moment-timezone";

const timeZonesList = require("../timezones.json");

export const getIanaTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getIanaTimeZoneFromWindowsName = windowsName => {
	// If not found, the mapping might need to be updated, rerun the generateWindowsZone script
	return (timeZonesList.windowsToIana[windowsName] ?? [getIanaTimeZone()])[0];
};

export const getWindowsTimeZone = () => {
	const customerTimezone = getIanaTimeZone();
	const windowsTimezones = timeZonesList.ianaToWindows[customerTimezone];
	// If not found, the mapping might need to be updated, rerun the generateWindowsZone script
	return (windowsTimezones ?? [customerTimezone])[0];
};

//converting time from other timezone to local
export const convertTimeToLocalTimeZone = (date, timezone) => {
	const dateWithoutZone = moment.tz(date, timezone).format("YYYY-MM-DDTHH:mm:ss.SSS");
	const localZone = moment(dateWithoutZone).format("Z");
	const dateWithLocalZone = [dateWithoutZone, localZone].join("");
	return new Date(dateWithLocalZone);
};

//converting time from local timezone to other
export const convertTimeToOtherTimeZone = (date, timezone) => {
	const dateWithoutZone = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSS");
	const otherZone = moment.tz(date, timezone).format("Z");
	const dateWithOtherZone = [dateWithoutZone, otherZone].join("");
	return new Date(dateWithOtherZone);
};
