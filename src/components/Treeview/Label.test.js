import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { Label, Indicator, BeforeIndicator, NonIndicator } from "./Label";
import Icon from "../MaterialUI/DataDisplay/Icon";
import { createMuiTheme } from "../../utils/testUtils";

const theme = createMuiTheme();

describe("Indicator", () => {
	it("renders a closed arrow icon", () =>
		expect(<Indicator />, "when mounted", "to satisfy", <Icon id="dropdown-chevron-right" />));

	it("renders an open arrow icon", () =>
		expect(<Indicator open />, "when mounted", "to satisfy", <Icon id="dropdown-chevron-down" />));

	it("renders closed arrows in highlight color", () =>
		expect(
			<MuiThemeProvider theme={theme}>
				<Indicator />
			</MuiThemeProvider>,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"color: #333;",
		));

	it("renders open arrows in dark grey", () =>
		expect(
			<MuiThemeProvider theme={theme}>
				<Indicator open />
			</MuiThemeProvider>,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"color: #333;",
		));

	it("renders open arrows in light grey when dark", () =>
		expect(
			<MuiThemeProvider theme={theme}>
				<Indicator open dark />
			</MuiThemeProvider>,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"color: #CCC;",
		));
});

describe("BeforeIndicator", () => {
	it("renders a branch continuation before indicator", () =>
		expect(<BeforeIndicator />, "when mounted", "to have style rules satisfying", "to contain", "margin-left: -16px;"));
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
	it("renders a space for node content", () => expect(<Label />, "when mounted", "to satisfy", <div />));

	it("renders a label without border", () =>
		expect(
			<MuiThemeProvider theme={theme}>
				<Label />
			</MuiThemeProvider>,
			"when mounted",
			"to have style rules satisfying",
			expect.it("not to contain", "background-color: #222;").and("not to contain", "border: 1px solid #CCC"),
		));

	it("renders a label with border", () =>
		expect(
			<MuiThemeProvider theme={theme}>
				<Label isSelectedNode={true} />
			</MuiThemeProvider>,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "background-color: #222;").and("to contain", "border: 1px solid #CCC"),
		));
});
