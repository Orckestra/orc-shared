import createThemes from "./muiThemes";
import { createMuiTheme } from "@material-ui/core/styles";

describe("MUI Themes", () => {
	it("createThemes returns expected themes", () => {
		const applicationTheme = {
			primary: {
				main: "#1F5B7F",
			},
		};

		const themeDefinition = {
			direction: "ltr",
			secondary: {
				main: "#ED2E0B",
			},
			divider: "#CCCCCC",
		};

		const { applicationMuiTheme, muiTheme } = createThemes(
			applicationTheme,
			themeDefinition,
		);

		expect(applicationMuiTheme, "not to equal", null);
		expect(muiTheme, "not to equal", null);

		expect(applicationMuiTheme.primary.main, "to equal", "#1F5B7F");

		expect(muiTheme.direction, "to equal", "ltr");
		expect(muiTheme.secondary.main, "to equal", "#ED2E0B");
		expect(muiTheme.divider, "to equal", "#CCCCCC");

		expect(
			muiTheme.overrides.MuiButton.outlined.border,
			"to equal",
			"1px solid rgba(0, 0, 0, 0.23)",
		);
	});

	it("createThemes returns expected themes with dark palette type", () => {
		const baseMuiTheme = createMuiTheme();

		const themeDefinition = {
			direction: "ltr",
			secondary: {
				main: "#ED2E0B",
			},
			palette: {
				...baseMuiTheme.palette,
				type: "dark",
			},
		};

		const { applicationMuiTheme, muiTheme } = createThemes({}, themeDefinition);

		expect(applicationMuiTheme, "not to equal", null);
		expect(muiTheme, "not to equal", null);

		expect(muiTheme.direction, "to equal", "ltr");
		expect(muiTheme.secondary.main, "to equal", "#ED2E0B");

		expect(
			muiTheme.overrides.MuiButton.outlined.border,
			"to equal",
			"1px solid rgba(255, 255, 255, 0.23)",
		);
	});
});
