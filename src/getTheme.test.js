import getTheme from "./getTheme";

jest.mock("typeface-open-sans", () => ({}));
jest.mock("typeface-roboto-condensed", () => ({}));

describe("getTheme", () => {
	it("gives a theme object containing icon names etc., and an app color", () =>
		expect(getTheme, "called with", ["#FF0000"], "to satisfy", {
			appHighlightColor: "#FF0000",
			errorColor: "#ce4844",
			treeSettings: {},
			icons: {},
			fonts: {
				base: "Open Sans, sans-serif",
				header: "Roboto Condensed, sans-serif",
			},
		}));

	it("has a default app color", () =>
		expect(getTheme, "called with", [], "to satisfy", {
			appHighlightColor: "#cccccc",
		}));

	it("handles overrides, including deep merges", () =>
		expect(
			getTheme,
			"called with",
			[
				"#FF0000",
				{ errorColor: "#FF00FF", fonts: { base: "serif", extra: "cursive" } },
			],
			"to satisfy",
			{
				appHighlightColor: "#FF0000",
				errorColor: "#FF00FF",
				treeSettings: {},
				icons: {},
				fonts: {
					base: "serif",
					header: "Roboto Condensed, sans-serif",
					extra: "cursive",
				},
			},
		));
});
