import { CHANGE_LOCALE, changeLocale } from "./locale";

describe("changeLocale", () => {
	it("creates a Flux Standard Action with the given locale as payload", () =>
		expect(changeLocale, "when called with", ["en-GB"], "to equal", {
			type: CHANGE_LOCALE,
			payload: "en-GB",
		}));
});
