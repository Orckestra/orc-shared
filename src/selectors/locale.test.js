import Immutable from "immutable";
import { currentLocale, defaultLocale } from "./locale";

describe("default locale selector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				locale: "fr",
				supportedLocales: ["en", "fr"],
			},
		});
	});

	it("gets the first supported locale", () =>
		expect(defaultLocale, "when called with", [state], "to equal", "en"));

	it("returns 'en' if no supported locales", () => {
		state = state.deleteIn(["locale", "supportedLocales"]);
		return expect(defaultLocale, "when called with", [state], "to equal", "en");
	});
});

describe("locale selector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			locale: {
				locale: "fr",
				supportedLocales: ["en", "fr"],
			},
		});
	});

	it("gets the currently selected locale", () =>
		expect(currentLocale, "when called with", [state], "to equal", "fr"));

	it("gets first supported locale if none set", () => {
		state = state.deleteIn(["locale", "locale"]);
		return expect(currentLocale, "when called with", [state], "to equal", "en");
	});
});
