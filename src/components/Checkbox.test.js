import React from "react";
import { mount } from "unexpected-reaction";
import { getClassSelector, getStyledClassSelector } from "../utils/testUtils";
import { Checkbox, Wrapper, ContainedInput, Cover } from "./Checkbox";

describe("Checkbox", () => {
	it("renders an input and a label", () =>
		expect(
			<Checkbox id="foo" value={true} random="stuff" />,
			"when mounted",
			"to satisfy",
			<Wrapper htmlFor="foo">
				<ContainedInput id="foo" value={true} random="stuff" />
				<Cover htmlFor="foo" value={true} />
			</Wrapper>,
		));
});

describe("ContainedInput", () => {
	it("renders an input of type checkbox", () =>
		expect(<ContainedInput />, "when mounted", "to satisfy", <input type="checkbox" />));
});

describe("Cover", () => {
	it("sets a highlight when input is focused or active", () => {
		const inputSelector = getStyledClassSelector(ContainedInput);
		const coverSelector = getClassSelector(<Cover />, 1); // Get the generated class name
		mount(<Cover />);
		return expect(
			coverSelector,
			"as a selector to have style rules",
			expect.it(
				"to contain",
				`${inputSelector}:active + ${coverSelector},` +
					`${inputSelector}:focus + ${coverSelector}` +
					" {box-shadow: 0px 0px 1px 0px #7d7d7d; border-color: #777;}",
			),
		);
	});

	it("sets a highlight when input is focused or active, when checked", () => {
		const inputSelector = getStyledClassSelector(ContainedInput);
		const coverSelector = getClassSelector(<Cover value={true} />, 1); // Get the generated class name
		mount(<Cover value={true} />);
		return expect(
			coverSelector,
			"as a selector to have style rules",
			expect.it(
				"to contain",
				`${inputSelector}:active + ${coverSelector},` +
					`${inputSelector}:focus + ${coverSelector}` +
					" {box-shadow: 0px 0px 1px 0px #7d7d7d; border-color: #777;}",
			),
		);
	});

	it("sets a clear background when not checked", () =>
		expect(<Cover />, "when mounted", "to have style rules satisfying", "to contain", "background-color: white;"));

	it("sets a colored background and a checkmark when checked", () =>
		expect(
			<Cover value />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "background-color: #7d7d7d;").and("to contain", '::after {content: "✔";'),
		));

	describe("with highlight color from theme", () => {
		let theme;
		beforeEach(() => {
			theme = { colors: { application: { base: "#cc0000" } } };
		});

		it("sets a highlight when input is focused or active", () => {
			const inputSelector = getStyledClassSelector(ContainedInput);
			const coverSelector = getClassSelector(<Cover theme={theme} />, 1); // Get the generated class name
			mount(<Cover theme={theme} />);
			return expect(
				coverSelector,
				"as a selector to have style rules",
				expect.it(
					"to contain",
					`${inputSelector}:active + ${coverSelector},` +
						`${inputSelector}:focus + ${coverSelector}` +
						" {box-shadow: 0px 0px 1px 0px #ce0c0c; border-color: #cc0000;}",
				),
			);
		});

		it("sets a highlight when input is focused or active, when checked", () => {
			const inputSelector = getStyledClassSelector(ContainedInput);
			const coverSelector = getClassSelector(<Cover theme={theme} value={true} />, 1); // Get the generated class name
			mount(<Cover theme={theme} value={true} />);
			return expect(
				coverSelector,
				"as a selector to have style rules",
				expect.it(
					"to contain",
					`${inputSelector}:active + ${coverSelector},` +
						`${inputSelector}:focus + ${coverSelector}` +
						" {box-shadow: 0px 0px 1px 0px #ce0c0c; border-color: #cc0000;}",
				),
			);
		});

		it("sets a clear background when not checked", () =>
			expect(
				<Cover theme={theme} />,
				"when mounted",
				"to have style rules satisfying",
				expect.it("to contain", "background-color: white;").and("not to contain", "::after"),
			));

		it("sets a colored background and a checkmark when checked", () =>
			expect(
				<Cover theme={theme} value />,
				"when mounted",
				"to have style rules satisfying",
				expect.it("to contain", "background-color: #ce0c0c;").and("to contain", '::after {content: "✔";'),
			));
	});
});
