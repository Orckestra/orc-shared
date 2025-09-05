import React from "react";
import Immutable from "immutable";
import { getDefaultLocale } from "react-datepicker";
import Culture, { customFnsLocale } from "./Culture";
import { extractMessages, TestWrapper } from "../utils/testUtils";
import sharedMessages from "../sharedMessages";
import { mount } from "enzyme";

const messages = extractMessages(sharedMessages);

describe("Culture", () => {
	let state, store;

	beforeEach(() => {
		state = Immutable.fromJS({
			requests: {},
			settings: {
				defaultScope: "aDefaultScope",
			},
			locale: {
				locale: "en-US",
				supportedLocales: [
					{ language: "English", cultureIso: "en" },
					{ language: "Français", cultureIso: "fr" },
				],
			},
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: () => {},
		};
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("shows the wrapped component if authenticated and default scope is known", () => {
		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages, locale: "zz-ZZ" }}>
				<Culture />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", null);

		expect(getDefaultLocale(), "to be", undefined); // Default behavior for react-datepicker
	});

	it("shows the wrapped component if authenticated and default scope is known 222", () => {
		state = state.setIn(["locale", "supportedLocales"], [{ language: "English", cultureIso: "en" }]);

		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages, locale: "en-GB" }}>
				<Culture />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", null);

		expect(getDefaultLocale(), "to equal", "en-GB");
	});

	it("shows the wrapped component if authenticated and default scope is known 333", () => {
		state = state.setIn(
			["locale", "supportedLocales"],
			[
				{ language: "French", cultureIso: "fr" },
				{ language: "EnglishMy", cultureIso: "enMy" },
			],
		);

		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages, locale: "fr-FR" }}>
				<Culture />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", null);

		expect(getDefaultLocale(), "to equal", "fr-FR");
	});

	it("computes right localized day and month with Italian culture ", () => {
		const component = (
			<TestWrapper provider={{ store }} intlProvider={{ messages, locale: "it-IT" }}>
				<Culture />
			</TestWrapper>
		);

		mount(component);

		expect(customFnsLocale.localize.day(1), "to equal", "Mo");
		expect(customFnsLocale.localize.month(6), "to equal", "July");
	});
});
