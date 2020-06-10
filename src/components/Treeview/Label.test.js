import React from "react";
import { Label, Indicator, BeforeIndicator, NonIndicator } from "./Label";
import Icon from "../Icon";

describe("Indicator", () => {
	it("renders a closed arrow icon", () =>
		expect(<Indicator />, "when mounted", "to satisfy", <Icon id="chevron-right" />));

	it("renders an open arrow icon", () =>
		expect(<Indicator open />, "when mounted", "to satisfy", <Icon id="chevron-down" />));

	it("renders closed arrows in highlight color", () =>
		expect(
			<Indicator />,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"color: #ffffff;",
		));

	it("renders open arrows in dark grey", () =>
		expect(
			<Indicator open />,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"color: #333333;",
		));

	it("renders open arrows in light grey when dark", () =>
		expect(
			<Indicator open dark />,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"color: #cccccc;",
		));

	describe("with theme", () => {
		let theme;
		beforeEach(() => {
			theme = {
				colors: { application: { base: "red" } },
				icons: {
					indicators: {
						up: "arrow-up",
						down: "arrow-down",
						right: "arrow-right",
						left: "arrow-left",
					},
				},
			};
		});

		it("renders a closed arrow icon", () =>
			expect(
				<Indicator theme={theme} />,
				"when mounted",
				"to satisfy",
				<Icon id="arrow-right" />,
			));

		it("renders an open arrow icon", () =>
			expect(
				<Indicator theme={theme} open />,
				"when mounted",
				"to satisfy",
				<Icon id="arrow-down" />,
			));

		it("renders closed arrows in highlight color", () =>
			expect(
				<Indicator theme={theme} />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"color: red;",
			));

		it("renders open arrows in dark grey", () =>
			expect(
				<Indicator theme={theme} open />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"color: #333333;",
			));

		it("renders open arrows in light grey when dark", () =>
			expect(
				<Indicator theme={theme} open dark />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"color: #cccccc;",
			));
	});
});

describe("BeforeIndicator", () => {
	it("renders a branch continuation before indicator", () =>
		expect(
			<BeforeIndicator />,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"margin-left: -16px;",
		));
});

describe("NonIndicator", () => {
	it("renders a branch continuation", () =>
		expect(
			<NonIndicator />,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"margin: auto 0 auto -16px;",
		));
});

describe("Label", () => {
	it("renders a space for node content", () =>
		expect(<Label />, "when mounted", "to satisfy", <div />));

	it("renders a label without border", () =>
		expect(
			<Label />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("not to contain", "background-color: #222;")
				.and("not to contain", "border: 1px solid #0F4E66"),
		));

	it("renders a label with border", () =>
		expect(
			<Label isSelectedNode={true} />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "background-color: #222;")
				.and("to contain", "border: 1px solid #0F4E66"),
		));
});
