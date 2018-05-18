import React from "react";
import { Label, Indicator, NonIndicator } from "./Label";
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

	it("renders open arrows in grey", () =>
		expect(
			<Indicator open />,
			"to render style rules",
			"to contain",
			"color: #ccc;",
		));

	describe("with theme", () => {
		let theme;
		beforeEach(() => {
			theme = {
				appHighlightColor: "red",
				indicatorIcons: {
					up: "arrow-up",
					down: "arrow-down",
					right: "arrow-right",
					left: "arrow-left",
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

		it("renders open arrows in grey", () =>
			expect(
				<Indicator theme={theme} open />,
				"to render style rules",
				"to contain",
				"color: #ccc;",
			));
	});
});

describe("NonIndicator", () => {
	it("renders a branch continuation", () =>
		expect(
			<NonIndicator />,
			"to render style rules",
			"to contain",
			"margin-bottom: 18px;",
		));

	describe("with theme", () => {
		let theme;
		beforeEach(() => {
			theme = {
				treeSettings: { branchHeight: 12 },
			};
		});

		it("renders a branch continuation", () =>
			expect(<NonIndicator theme={theme} />, "to render as", <div />).and(
				"to render style rules",
				"to contain",
				"margin-bottom: 12px;",
			));
	});
});

describe("Label", () => {
	it("renders a space for node content", () =>
		expect(<Label />, "to render as", <div />));
});
