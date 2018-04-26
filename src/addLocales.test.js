import addLocales from "./addLocales";

jest.mock("react-intl", () => {
	return {
		addLocaleData: require("sinon")
			.spy()
			.named("react-intl/addLocaleData"),
	};
});

jest.mock("react-intl/locale-data/en", () => ({ mockLocale: "en" }));
jest.mock("react-intl/locale-data/fr", () => ({ mockLocale: "fr" }));

describe("addLocales", () => {
	it("loads in locale info for the given languages", () =>
		expect(addLocales, "when called with", ["en", "fr"]).then(() =>
			expect(require("react-intl").addLocaleData, "to have calls satisfying", [
				{ args: [{ mockLocale: "en" }] },
				{ args: [{ mockLocale: "fr" }] },
			]),
		));
});
