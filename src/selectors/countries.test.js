import Immutable from "immutable";
import { localizedCountry, mappedCountries } from "./countries";

export const countriesPayload = {
	countries: {
		CA: {
			name: {
				"en-US": "Canada",
			},
			isoCode: "CA",
			id: "1829012a-a336-4db5-8dea-b1ae441a4bf8",
		},
		US: {
			name: {
				"en-US": "United States",
			},
			isoCode: "US",
			id: "25a4a8f7-7162-4b51-abbf-8320c8ff1b59",
		},
		NL: {
			isoCode: "NL",
			id: "25a4a8f7-3456-4b51-abbf-8320c8ff1b59",
		},
	},
};

describe("Countries Selectors", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			...countriesPayload,
			locale: {
				supportedLocales: [
					{ language: "English", cultureIso: "en" },
					{ language: "Français", cultureIso: "fr" },
				],
			},
		});
	});

	it("Retrieves list of countries", () => {
		const expected = [
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

		expect(mappedCountries, "called with", [state], "to satisfy", expected);
	});

	it("Retrieves country display name by country code", () => {
		const countryCode = "CA";
		expect(localizedCountry, "when called with", [countryCode], "called with", [state], "to satisfy", "Canada");
	});

	it("Retrieves not translated country code if no display name found", () => {
		const countryCode = "NL";
		expect(localizedCountry, "when called with", [countryCode], "called with", [state], "to satisfy", "[NL]");
	});

	it("Retrieves not translated country code if no country found", () => {
		const countryCode = "UA";
		expect(localizedCountry, "when called with", [countryCode], "called with", [state], "to satisfy", "[UA]");
	});
});
