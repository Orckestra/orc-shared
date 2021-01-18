import Immutable from "immutable";
import { localizedTimezone } from "./timezones";

export const timezonesPayload = [
	{
		displayName: "(UTC-05:00) Eastern Time (US & Canada)",
		baseUtcOffset: -5,
		supportsDaylightSavingTime: true,
		id: "Eastern Standard Time",
		propertyBag: {},
	},
];

export const timezonesListPayload = {
	timezones: {
		"Eastern Standard Time": timezonesPayload[0],
	},
};

describe("Timezones Selectors", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			...timezonesListPayload,
		});
	});

	it("Retrieves timezone display name by id", () => {
		const timezoneId = "Eastern Standard Time";
		expect(
			localizedTimezone,
			"when called with",
			[timezoneId],
			"called with",
			[state],
			"to satisfy",
			timezonesPayload[0].displayName,
		);
	});

	it("Retrieves null if timezone id is not found", () => {
		const timezoneId = "Wrong Id";
		expect(localizedTimezone, "when called with", [timezoneId], "called with", [state], "to satisfy", null);
	});
});
