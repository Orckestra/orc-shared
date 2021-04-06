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
