import Immutable from "immutable";
import reducerFactory from "./localeFactory";
import { changeLocale } from "../actions/locale";

describe("locale reducer factory", () => {
	it("creates a well-behaved reducer", () =>
		expect(
			reducerFactory,
			"when called with",
			[["en-US", "fr"]],
			"to be a reducer with initial state",
			{
				locale: "en-US",
				supportedLocales: ["en-US", "fr"],
			},
		));

	describe("created reducer", () => {
		let reducer;
		beforeEach(() => {
			reducer = reducerFactory(["en-US", "fr"]);
		});

		it("reacts to locale change by updating to the requested locale", () => {
			const oldState = Immutable.Map({
				locale: "en-US",
				supportedLocales: ["en-US", "fr"],
			});
			const action = changeLocale("fr");
			const newState = reducer(oldState, action);
			return expect(newState, "not to be", oldState).and("to satisfy", {
				locale: "fr",
			});
		});

		it("does not update the locale if the requested language is not supported", () => {
			const oldState = Immutable.Map({
				locale: "en-US",
				supportedLocales: ["en-US", "fr"],
			});
			const action = changeLocale("da");
			const newState = reducer(oldState, action);
			return expect(newState, "to be", oldState).and("to satisfy", {
				locale: "en-US",
			});
		});
	});
});
