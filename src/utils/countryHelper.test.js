import { getLocalizedCountryByCode } from "./countryHelper";

describe("Country Helper", () => {
	const locale = "en-US";
	const countryCode = "CA";
	const countries = [
		{
			name: {
				"en-US": "Canada",
			},
			isoCode: "CA",
			id: "1829012a-a336-4db5-8dea-b1ae441a4bf8",
		},
		{
			name: {
				"en-US": "United States",
			},
			isoCode: "US",
			id: "25a4a8f7-7162-4b51-abbf-8320c8ff1b59",
		},
		{
			isoCode: "NL",
			id: "25a4a8f7-3456-4b51-abbf-8320c8ff1b59",
		},
	];

	it("Retrieves country display name by country code", () => {
		expect(getLocalizedCountryByCode, "called with", [countries, countryCode, locale], "to satisfy", "Canada");
	});

	it("Retrieves not translated country code if no display name found", () => {
		const countryCode = "NL";
		expect(getLocalizedCountryByCode, "called with", [countries, countryCode, locale], "to satisfy", "[NL]");
	});

	it("Retrieves not translated country code if no country found", () => {
		const countryCode = "UA";
		expect(getLocalizedCountryByCode, "called with", [countries, countryCode, locale], "to satisfy", "[UA]");
	});
});
