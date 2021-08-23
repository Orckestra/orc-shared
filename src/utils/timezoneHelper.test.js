import { getTimeZone, getTimeZoneByName, getTimeZoneName } from "./timezoneHelper";

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
});
