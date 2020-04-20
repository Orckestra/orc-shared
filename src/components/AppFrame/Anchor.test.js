import React from "react";
import Anchor, { Header, Indicator } from "./Anchor";

describe("Anchor", () => {
	it("renders a closed menu anchor", () => {
		expect(
			<Anchor menuLabel="A Label" />,
			"when mounted",
			"to satisfy",
			<Header open={false}>
				A Label
				<Indicator open={false} />
			</Header>,
		);
	});

	it("renders an open menu anchor", () =>
		expect(
			<Anchor open menuLabel="A Label" />,
			"when mounted",
			"to satisfy",
			<Header open>
				A Label
				<Indicator open />
			</Header>,
		));

	describe("Indicator", () => {
		let theme;
		beforeEach(() => {
			theme = {
				colors: { application: { primary: "#ff00ff" } },
			};
		});

		it("shows the highlight color when closed", () =>
			expect(
				<Indicator theme={theme} />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"color: #ff00ff;",
			));

		it("shows the text color when open", () =>
			expect(
				<Indicator theme={theme} open />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"color: #ccc;",
			));
	});

	describe("Header", () => {
		let theme;
		beforeEach(() => {
			theme = {
				colors: { application: { primary: "#ff00ff" } },
			};
		});

		it("shows the text color when closed", () =>
			expect(
				<Header theme={theme} />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"color: #ccc;",
			));

		it("shows the highlight color when open", () =>
			expect(
				<Header theme={theme} open />,
				"when mounted",
				"to have style rules satisfying",
				"to contain",
				"color: #ff00ff;",
			));

		it("shows the highlight color when hovering", () =>
			expect(
				<Header theme={theme} />,
				"when mounted",
				"to have style rules satisfying",
				"to match",
				/:hover\s*\{[^}]*\bcolor: #ff00ff;[^}]*\}/,
			));
	});
});
