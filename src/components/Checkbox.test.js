import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { Checkbox, Wrapper, ContainedInput, Cover } from "./Checkbox";

const getClassName = elm => {
	const renderer = new ShallowRenderer();
	return renderer.render(elm).props.className.split(" ")[1];
};

describe("Checkbox", () => {
	it("renders an input and a label", () =>
		expect(
			<Checkbox id="foo" value={true} random="stuff" />,
			"to render as",
			<Wrapper htmlFor="foo">
				<ContainedInput id="foo" value={true} random="stuff" />
				<Cover htmlFor="foo" value={true} />
			</Wrapper>,
		));
});

describe("ContainedInput", () => {
	it("renders an input of type checkbox", () =>
		expect(<ContainedInput />, "to render as", <input type="checkbox" />));
});

describe("Cover", () => {
	it("sets a highlight when input is focused or active", () => {
		const coverClass = getClassName(<Cover />);
		return expect(<Cover />, "to render style rules").then(styles =>
			expect(
				styles,
				"to contain",
				"." +
					ContainedInput.styledComponentId +
					":active + ." +
					coverClass +
					"," +
					"." +
					ContainedInput.styledComponentId +
					":focus + ." +
					coverClass +
					" {box-shadow: 0px 0px 1px 0px #7d7d7d; border-color: #777;}",
			),
		);
	});

	it("sets a clear background when not checked", () =>
		expect(<Cover />, "to render style rules").then(styles =>
			expect(styles, "to contain", "background-color: white;"),
		));

	it("sets a colored background and a checkmark when checked", () =>
		expect(<Cover value />, "to render style rules").then(styles =>
			expect(styles, "to contain", "background-color: #7d7d7d;").and(
				"to contain",
				'::after {content: "✔";',
			),
		));

	describe("with highlight color from theme", () => {
		let theme;
		beforeEach(() => {
			theme = { appHighlightColor: "#cc0000" };
		});

		it("sets a highlight when input is focused or active", () => {
			const coverClass = getClassName(<Cover theme={theme} />);
			return expect(<Cover theme={theme} />, "to render style rules").then(
				styles =>
					expect(
						styles,
						"to contain",
						`.${ContainedInput.styledComponentId}:active + .${coverClass},` +
							`.${ContainedInput.styledComponentId}:focus + .${coverClass} ` +
							"{box-shadow: 0px 0px 1px 0px #ce0c0c; border-color: #cc0000;}",
					),
			);
		});

		it("sets a clear background when not checked", () =>
			expect(<Cover theme={theme} />, "to render style rules").then(styles =>
				expect(styles, "to contain", "background-color: white;").and(
					"not to contain",
					"::after",
				),
			));

		it("sets a colored background and a checkmark when checked", () =>
			expect(<Cover theme={theme} value />, "to render style rules").then(
				styles =>
					expect(styles, "to contain", "background-color: #ce0c0c;").and(
						"to contain",
						'::after {content: "✔";',
					),
			));
	});
});
