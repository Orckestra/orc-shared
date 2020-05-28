import getTheme from "./getTheme";

jest.mock("typeface-open-sans", () => ({}));
jest.mock("typeface-roboto-condensed", () => ({}));

describe("getTheme", () => {
	it("gives a theme object containing colors,  icon names", () =>
		expect(getTheme, "called with", [], "to satisfy", {
			colors: { error: "#ce4844" },
			treeSettings: {},
			icons: {},
			fonts: {
				base: "Open Sans, sans-serif",
				header: "Roboto Condensed, sans-serif",
			},
		}));

	it("has default app colors", () =>
		expect(getTheme, "called with", [], "to satisfy", {
			colors: {
				application: {
					base: "#cccccc",
					primary: "#cccccc",
					highlight: "#d8d8d8",
					select: "#efefef",
					dark: "#a3a3a3",
				},
			},
		}));

	it("creates app colors from base", () =>
		expect(
			getTheme,
			"called with",
			[{ colors: { application: { base: "#cc33cc" } } }],
			"to satisfy",
			{
				colors: {
					application: {
						base: "#cc33cc",
						primary: "#cc33cc",
						highlight: "#d866d8",
						select: "#efc1ef",
						dark: "#a328a3",
					},
				},
			},
		));

	it("accepts preset app colors", () =>
		expect(
			getTheme,
			"called with",
			[
				{
					colors: {
						application: {
							base: "#cc33cc",
							primary: "#ff00ff",
							highlight: "#6666d8",
							select: "#efc1c1",
							dark: "#a32828",
						},
					},
				},
			],
			"to satisfy",
			{
				colors: {
					application: {
						base: "#cc33cc",
						primary: "#ff00ff",
						highlight: "#6666d8",
						select: "#efc1c1",
						dark: "#a32828",
					},
				},
			},
		));

	it("handles overrides, including deep merges", () =>
		expect(
			getTheme,
			"called with",
			[{ colors: { error: "#FF00FF" }, fonts: { base: "serif", extra: "cursive" } }],
			"to satisfy",
			{
				colors: { error: "#FF00FF" },
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
