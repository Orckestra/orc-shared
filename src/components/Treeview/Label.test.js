import React from "react";
import { Label, Indicator, BeforeIndicator, NonIndicator } from "./Label";
import Icon from "../Icon";

describe("Indicator", () => {
	it("renders a closed arrow icon", () =>
		expect(<Indicator />, "to render as", <Icon id="chevron-right" />));

	it("renders an open arrow icon", () =>
		expect(<Indicator open />, "to render as", <Icon id="chevron-down" />));

	it("renders closed arrows in highlight color", () =>
		expect(
			<Indicator />,
			"to render style rules",
			"to contain",
			"color: #ffffff;",
		));

	it("renders open arrows in dark grey", () =>
		expect(
			<Indicator open />,
			"to render style rules",
			"to contain",
			"color: #333;",
		));

	it("renders open arrows in light grey when dark", () =>
		expect(
			<Indicator open dark />,
			"to render style rules",
			"to contain",
			"color: #ccc;",
		));

	describe("with theme", () => {
		let theme;
		beforeEach(() => {
			theme = {
				appHighlightColor: "red",
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
				"to render as",
				<Icon id="arrow-right" />,
			));

		it("renders an open arrow icon", () =>
			expect(
				<Indicator theme={theme} open />,
				"to render as",
				<Icon id="arrow-down" />,
			));

		it("renders closed arrows in highlight color", () =>
			expect(
				<Indicator theme={theme} />,
				"to render style rules",
				"to contain",
				"color: red;",
			));

		it("renders open arrows in dark grey", () =>
			expect(
				<Indicator theme={theme} open />,
				"to render style rules",
				"to contain",
				"color: #333;",
			));

		it("renders open arrows in light grey when dark", () =>
			expect(
				<Indicator theme={theme} open dark />,
				"to render style rules",
				"to contain",
				"color: #ccc;",
			));
	});
});

describe("BeforeIndicator", () => {
	it("renders a branch continuation before indicator", () =>
		expect(
			<BeforeIndicator />,
			"to render style rules",
			"to contain",
			"margin-left: -16px;",
		));
});

describe("NonIndicator", () => {
	it("renders a branch continuation", () =>
		expect(
			<NonIndicator />,
			"to render style rules",
			"to contain",
			"margin: auto 0 auto -16px;",
		));
});

describe("Label", () => {
	it("renders a space for node content", () =>
		expect(<Label />, "to render as", <div />));
});
