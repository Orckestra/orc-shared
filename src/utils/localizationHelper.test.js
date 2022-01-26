import localizationHelper from "./localizationHelper";

const defaultLocalizations = { en: "en text", "fr-Ca": "fr text", "fr-fr": "fr-fr text" };
const fallbackValue = localizationHelper.getNotLocalizedString("fallback");

describe("<localizationHelper.getLocalization>", () => {
	it("get localization in en", () => {
		expect(localizationHelper.getLocalization(defaultLocalizations, "en", "fallback"), "to equal", "en text");
	});

	it("get localization in en-us should return fallback text", () => {
		expect(localizationHelper.getLocalization(defaultLocalizations, "en-us", "fallback"), "to equal", "en text");
	});

	it("get localization in fr-fr should return fr text", () => {
		expect(localizationHelper.getLocalization(defaultLocalizations, "fr-fr", "fallback"), "to equal", "fr-fr text");
	});

	it("get localization in fr-ca should return fr text", () => {
		expect(localizationHelper.getLocalization(defaultLocalizations, "fr-ca", "fallback"), "to equal", "fr text");
	});

	it("get localization in unknown language should return fallbackValue", () => {
		expect(localizationHelper.getLocalization(defaultLocalizations, "nb-no", "fallback"), "to equal", fallbackValue);
	});

	it("default value should be returned if localizations is null", () => {
		expect(localizationHelper.getLocalization(null, "nb-no", "fallback"), "to equal", fallbackValue);
	});

	it("default value should be returned if en localization is empty", () => {
		const localizations = { en: "", fr: "fr text", "fr-fr": "fr-fr text" };
		expect(localizationHelper.getLocalization(localizations, "en-US", "fallback"), "to equal", fallbackValue);
	});

	it("get empty value if en localization is empty and treatEmptyValueAsNull is false", () => {
		const localizations = { en: "", fr: "fr text", "fr-fr": "fr-fr text" };
		expect(localizationHelper.getLocalization(localizations, "en-US", "fallback", false), "to equal", "");
	});

	it("default value should be returned if en localization is only whitespace or breakline", () => {
		const localizations = { en: " \t\r\n ", fr: "fr text", "fr-fr": "fr-fr text" };
		expect(localizationHelper.getLocalization(localizations, "en-US", "fallback"), "to equal", fallbackValue);
	});

	it("default value should be returned if en-US localization is empty", () => {
		const localizations = { "en-US": "", fr: "fr text", "fr-fr": "fr-fr text" };
		expect(localizationHelper.getLocalization(localizations, "en-US", "fallback"), "to equal", fallbackValue);
	});

	it("default value should be returned if localizations is undefined", () => {
		expect(localizationHelper.getLocalization(undefined, "nb-no", "fallback"), "to equal", fallbackValue);
	});

	it("default value should be returned if localizations is empty", () => {
		expect(localizationHelper.getLocalization([], "nb-no", "fallback"), "to equal", fallbackValue);
	});

	it("default value should be returned if locale is null", () => {
		expect(localizationHelper.getLocalization(defaultLocalizations, null, "fallback"), "to equal", fallbackValue);
	});

	it("default value should be returned if locale is undefined", () => {
		expect(localizationHelper.getLocalization(defaultLocalizations, undefined, "fallback"), "to equal", fallbackValue);
	});

	it("default value should be returned if locale is empty", () => {
		expect(localizationHelper.getLocalization(defaultLocalizations, "", "fallback"), "to equal", fallbackValue);
	});

	it("get localisation from from first matching culture if locale does not contain the country", () => {
		expect(localizationHelper.getLocalization(defaultLocalizations, "fr", "fallback"), "to equal", "fr text");
	});

	it("default value should be returned if locale does not contain the country", () => {
		expect(localizationHelper.getLocalization(defaultLocalizations, "it", "fallback"), "to equal", fallbackValue);
	});
});

describe("findCorrespondingLocale", () => {
	const locales = {
		fr: "FR",
		enGB: "GB",
		enNZ: "NZ",
		"en-in": "IN",
		enau: "AU",
		"en-IE": "IE",
		frCa: "CA",
	};

	it("findCorrespondingLocale should return null for en-US", () => {
		expect(localizationHelper.findCorrespondingLocale(locales, "en-US"), "to equal", null);
	});

	it("findCorrespondingLocale should return FR for fr-FR", () => {
		expect(localizationHelper.findCorrespondingLocale(locales, "fr-FR"), "to equal", "FR");
	});

	it("findCorrespondingLocale should return FR for fr-fr", () => {
		expect(localizationHelper.findCorrespondingLocale(locales, "fr-fr"), "to equal", "FR");
	});

	it("findCorrespondingLocale should return FR for frFR", () => {
		expect(localizationHelper.findCorrespondingLocale(locales, "frFR"), "to equal", "FR");
	});

	it("findCorrespondingLocale should return FR for frfr", () => {
		expect(localizationHelper.findCorrespondingLocale(locales, "frfr"), "to equal", "FR");
	});

	it("findCorrespondingLocale should return IE for en-IE", () => {
		expect(localizationHelper.findCorrespondingLocale(locales, "en-IE"), "to equal", "IE");
	});

	it("findCorrespondingLocale should return GB for en-GB", () => {
		expect(localizationHelper.findCorrespondingLocale(locales, "en-GB"), "to equal", "GB");
	});

	it("findCorrespondingLocale should return GB for en-NZ", () => {
		expect(localizationHelper.findCorrespondingLocale(locales, "en-NZ"), "to equal", "NZ");
	});

	it("findCorrespondingLocale should return AU for en-AU", () => {
		expect(localizationHelper.findCorrespondingLocale(locales, "en-AU"), "to equal", "AU");
	});

	it("findCorrespondingLocale should return AU for en-au", () => {
		expect(localizationHelper.findCorrespondingLocale(locales, "en-au"), "to equal", "AU");
	});

	it("findCorrespondingLocale should return AU for enAU", () => {
		expect(localizationHelper.findCorrespondingLocale(locales, "enAU"), "to equal", "AU");
	});

	it("findCorrespondingLocale should return IN for en-IN", () => {
		expect(localizationHelper.findCorrespondingLocale(locales, "en-IN"), "to equal", "IN");
	});

	it("findCorrespondingLocale should return CA for frCa", () => {
		expect(localizationHelper.findCorrespondingLocale(locales, "frCa"), "to equal", "CA");
	});
});
