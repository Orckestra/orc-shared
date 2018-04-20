import React from "react";
import Anchor, { Header, Indicator } from "./Anchor";

describe("Anchor", () => {
	it("renders a closed menu anchor", () =>
		expect(
			<Anchor menuLabel="A Label" className="propagateThis" />,
			"to render as",
			<Header className="propagateThis">
				A Label
				<Indicator id="chevron-down" />
			</Header>,
		));

	it("renders an open menu anchor", () =>
		expect(
			<Anchor open menuLabel="A Label" className="propagateThis" />,
			"to render as",
			<Header open className="propagateThis">
				A Label
				<Indicator open id="chevron-up" />
			</Header>,
		));

	describe("Indicator", () => {
		let theme;
		beforeEach(() => {
			theme = {
				appHighlightColor: "#ff00ff",
			};
		});

		it("shows the highlight color when closed", () =>
			expect(
				<Indicator theme={theme} />,
				"to render style rules",
				"to contain",
				"color: #ff00ff;",
			));

		it("shows the text color when open", () =>
			expect(
				<Indicator theme={theme} open />,
				"to render style rules",
				"to contain",
				"color: #ccc;",
			));
	});

	describe("Header", () => {
		let theme;
		beforeEach(() => {
			theme = {
				appHighlightColor: "#ff00ff",
			};
		});

		it("shows the text color when closed", () =>
			expect(
				<Header theme={theme} />,
				"to render style rules",
				"to contain",
				"color: #ccc;",
			));

		it("shows the highlight color when open", () =>
			expect(
				<Header theme={theme} open />,
				"to render style rules",
				"to contain",
				"color: #ff00ff;",
			));

		it("shows the highlight color when hovering", () =>
			expect(
				<Header theme={theme} />,
				"to render style rules",
				"to match",
				/:hover\s*\{[^}]*\bcolor: #ff00ff;[^}]*\}/,
			));
	});
});
