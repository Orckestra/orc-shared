import React from "react";
import Anchor, { Header, Indicator } from "./Anchor";

describe("Anchor", () => {
	it("renders a closed menu anchor", () => {
		const onClick = () => {};
		expect(
			<Anchor
				id="testAnchor"
				onClick={onClick}
				menuLabel="A Label"
				className="propagateThis"
			/>,
			"when mounted",
			"to satisfy",
			<Header id="testAnchor" onClick={onClick} className="propagateThis">
				A Label
				<Indicator />
			</Header>,
		);
	});

	it("renders an open menu anchor", () =>
		expect(
			<Anchor open menuLabel="A Label" className="propagateThis" />,
			"when mounted",
			"to satisfy",
			<Header open className="propagateThis">
				A Label
				<Indicator open />
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
				appHighlightColor: "#ff00ff",
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
