import {
	getTimeZone,
	getTimeZoneByName,
	getTimeZoneName,
	convertTimeToLocalTimeZone,
	convertTimeToOtherTimeZone,
} from "./timezoneHelper";

describe("Timezone Helper", () => {
	beforeEach(() => {
		jest.spyOn(Intl, "DateTimeFormat").mockImplementation(() => ({
			resolvedOptions: () => ({
				timeZone: "Europe/Amsterdam",
			}),
		}));
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("Retrieves customer timezone", () => {
		expect(getTimeZone, "called with", [], "to satisfy", "Europe/Amsterdam");
	});

	it("Retrieves timezone short name by passed name", () => {
		const timezoneName = "Central America Standard Time";
		expect(getTimeZoneByName, "called with", [timezoneName], "to satisfy", "America/Guatemala");
	});

	it("Returns user timezone if passed name is not found", () => {
		const timezoneName = "Test Timezone";
		expect(getTimeZoneByName, "called with", [timezoneName], "to satisfy", "Europe/Amsterdam");
	});

	it("Retrieves user timezone name", () => {
		expect(getTimeZoneName, "called with", [], "to satisfy", "W. Europe Standard Time");
	});

	it("Retrieves user local timezone date", () => {
		const timezoneName = "America/New_York";
		const date = "Mon Apr 04 2022 13:00:00 GMT+0300 (Eastern European Summer Time)";
		const expectedDate = new Date("2022-04-04T09:00:00Z");
		expect(convertTimeToLocalTimeZone, "called with", [date, timezoneName], "to satisfy", expectedDate);
	});

	it("Retrieves user other timezone date", () => {
		const timezoneName = "America/New_York";
		const date = "Mon Apr 04 2022 03:00:00 GMT+0300 (Eastern European Summer Time)";
		const expectedDate = new Date("2022-04-04T04:00:00Z");
		expect(convertTimeToOtherTimeZone, "called with", [date, timezoneName], "to satisfy", expectedDate);
	});
});
