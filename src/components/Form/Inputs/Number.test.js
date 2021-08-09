import React from "react";
import { IntlProvider } from "react-intl";
import { Ignore } from "unexpected-reaction";
import sinon from "sinon";
import { FormInput } from "./Text";
import { ButtonWrapper, Spinners, InputButton } from "./FieldButtons";
import { NumberInput, roundToStep } from "./Number";

describe("NumberInput", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	it("renders an input field with up/down spinner buttons", () =>
		expect(
			<IntlProvider locale="en-US">
				<NumberInput value={103.271} />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<ButtonWrapper>
				<IntlProvider locale="en-US">
					<FormInput type="number" value={103.271} onChange={() => {}} />
				</IntlProvider>
				<Spinners>
					<InputButton>⮝</InputButton>
					<InputButton>⮟</InputButton>
				</Spinners>
			</ButtonWrapper>,
		));

	it("renders a required input field with invalid value", () =>
		expect(
			<IntlProvider locale="en-US">
				<NumberInput required value="" />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<ButtonWrapper invalid>
				<IntlProvider locale="en-US">
					<FormInput type="number" value="" onChange={() => {}} />
				</IntlProvider>
				<Ignore />
			</ButtonWrapper>,
		));

	it("rounds input value top the step size", () =>
		expect(
			<IntlProvider locale="en-US">
				<NumberInput value={103.271} step={0.25} />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<ButtonWrapper>
				<IntlProvider locale="en-US">
					<FormInput type="number" value={103.25} onChange={() => {}} />
				</IntlProvider>
				<Ignore />
			</ButtonWrapper>,
		));

	it("renders a required input field with invalid value", () =>
		expect(
			<IntlProvider locale="en-US">
				<NumberInput required step={0.1} value="" />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<ButtonWrapper invalid>
				<IntlProvider locale="en-US">
					<FormInput type="number" value="" onChange={() => {}} />
				</IntlProvider>
				<Ignore />
			</ButtonWrapper>,
		));

	it("sets a default value to ensure input is controlled", () =>
		expect(
			<IntlProvider locale="en-US">
				<NumberInput onChange={() => {}} />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<ButtonWrapper>
				<IntlProvider locale="en-US">
					<FormInput type="number" value="" onChange={() => {}} />
				</IntlProvider>
				<Ignore />
			</ButtonWrapper>,
		));

	describe("with no control prop", () => {
		it("onChange handler enforces numbers", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput update={update} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "change", target: "input", value: "foo" },
				"with event",
				{ type: "change", target: "input", value: "0" },
				"with event",
				{ type: "change", target: "input", value: "12.29" },
				"with event",
				{ type: "change", target: "input", value: "0.13" },
			).then(() =>
				expect(update, "to have calls satisfying", [
					{ args: [""] },
					{ args: [0] },
					{ args: [12.29] },
					{ args: [0.13] },
				]),
			));

		it("increment handler raises value by 1", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput update={update} value={3.545444} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="up"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [4.545444] }])));

		it("increments from zero", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput update={update} value={0} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="up"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [1] }])));

		it("decrement handler lowers value by 1", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput update={update} value={3.545444} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="down"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [2.545444] }])));

		it("decrements from zero", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput update={update} value={0} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="down"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [-1] }])));
	});

	describe("with step prop", () => {
		it("onChange handler enforces numbers rounded to nearest step", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput update={update} step={0.1} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "change", target: "input", value: "foo" },
				"with event",
				{ type: "change", target: "input", value: "0" },
				"with event",
				{ type: "change", target: "input", value: "12.29" },
				"with event",
				{ type: "change", target: "input", value: "0.13" },
			).then(() =>
				expect(update, "to have calls satisfying", [{ args: [""] }, { args: [0] }, { args: [12.3] }, { args: [0.1] }]),
			));

		it("increment handler raises value by step size", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput update={update} step={0.1} value={3.5} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="up"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [3.6] }])));

		it("increments from zero", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput update={update} step={0.1} value={0} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="up"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [0.1] }])));

		it("decrement handler lowers value by step size", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput update={update} step={0.1} value={3.5} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="down"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [3.4] }])));

		it("decrements from zero", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput update={update} step={0.1} value={0} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="down"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [-0.1] }])));
	});

	describe("with min prop", () => {
		it("onChange handler enforces numbers", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput min={3} update={update} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "change", target: "input", value: "foo" },
				"with event",
				{ type: "change", target: "input", value: "0" },
				"with event",
				{ type: "change", target: "input", value: "12.29" },
				"with event",
				{ type: "change", target: "input", value: "0.13" },
			).then(() =>
				expect(update, "to have calls satisfying", [{ args: [""] }, { args: [3] }, { args: [12.29] }, { args: [3] }]),
			));

		it("increment handler raises value by 1", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput min={3} update={update} value={3.545444} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="up"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [4.545444] }])));

		it("decrement handler lowers value by 1", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput min={3} update={update} value={4.545444} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="down"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [3.545444] }])));

		it("respects minimum", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput min={3} update={update} value={3.545444} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="down"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [3] }])));
	});

	describe("with min and step prop", () => {
		it("onChange handler enforces numbers rounded to nearest step", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput step={0.1} min={3} update={update} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "change", target: "input", value: "foo" },
				"with event",
				{ type: "change", target: "input", value: "0" },
				"with event",
				{ type: "change", target: "input", value: "12.29" },
				"with event",
				{ type: "change", target: "input", value: "0.13" },
			).then(() =>
				expect(update, "to have calls satisfying", [{ args: [""] }, { args: [3] }, { args: [12.3] }, { args: [3] }]),
			));

		it("increment handler raises value by 1", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput step={0.1} min={3} update={update} value={3.545444} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="up"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [3.6] }])));

		it("decrement handler lowers value by 1", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput step={0.1} min={3} update={update} value={3.555444} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="down"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [3.5] }])));

		it("respects minimum", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput step={0.1} min={3} update={update} value={3.045444} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="down"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [3] }])));
	});

	describe("with max prop", () => {
		it("onChange handler enforces numbers", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput max={3} update={update} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "change", target: "input", value: "foo" },
				"with event",
				{ type: "change", target: "input", value: "0" },
				"with event",
				{ type: "change", target: "input", value: "12.29" },
				"with event",
				{ type: "change", target: "input", value: "0.13" },
			).then(() =>
				expect(update, "to have calls satisfying", [{ args: [""] }, { args: [0] }, { args: [3] }, { args: [0.13] }]),
			));

		it("increment handler raises value by 1", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput max={3} update={update} value={1.545344} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="up"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [2.545344] }])));

		it("respects maximum", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput max={3} update={update} value={2.5458} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="up"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [3] }])));

		it("decrement handler lowers value by 1", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput max={3} update={update} value={2.545} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="down"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [1.545] }])));
	});

	describe("with max and step prop", () => {
		it("onChange handler enforces numbers rounded to nearest step", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput step={0.1} max={3} update={update} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "change", target: "input", value: "foo" },
				"with event",
				{ type: "change", target: "input", value: "0" },
				"with event",
				{ type: "change", target: "input", value: "12.29" },
				"with event",
				{ type: "change", target: "input", value: "0.13" },
			).then(() =>
				expect(update, "to have calls satisfying", [{ args: [""] }, { args: [0] }, { args: [3] }, { args: [0.1] }]),
			));

		it("increment handler raises value by 1", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput step={0.1} max={3} update={update} value={1.545} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="up"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [1.6] }])));

		it("respects maximum", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput step={0.1} max={3} update={update} value={2.9999} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="up"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [3] }])));

		it("decrement handler lowers value by 1", () =>
			expect(
				<IntlProvider locale="en-US">
					<NumberInput step={0.1} max={3} update={update} value={3.555444} />
				</IntlProvider>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="down"]' },
			).then(() => expect(update, "to have calls satisfying", [{ args: [3.5] }])));
	});
});

describe("roundToStep", () => {
	it("rounds a number up to the nearest step", () =>
		expect(roundToStep, "when called with", [103.271, 0.1], "to equal", 103.3));

	it("rounds a number down to the nearest step", () =>
		expect(roundToStep, "when called with", [103.231, 0.1], "to equal", 103.2));

	it("works for steps > 1", () => expect(roundToStep, "when called with", [12343, 10], "to equal", 12340));

	it("can round off 0", () => expect(roundToStep, "when called with", [0, 0.1], "to equal", 0));

	it("returns empty string if given not a number to round off", () =>
		expect(roundToStep, "when called with", ["foo", 0.1], "to equal", ""));

	it("returns empty string if given not a number as step", () =>
		expect(roundToStep, "when called with", [10, "foo"], "to equal", ""));
});
