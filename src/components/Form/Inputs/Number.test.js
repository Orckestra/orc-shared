import React from "react";
import { IntlProvider } from "react-intl";
import { Ignore } from "unexpected-reaction";
import sinon from "sinon";
import { FormInput } from "./Text";
import { ButtonWrapper, Spinners, InputButton } from "./FieldButtons";
import { NumberInput, roundToStep, withNumberHandlers } from "./Number";

describe("NumberInput", () => {
	it("renders an input field with up/down spinner buttons", () =>
		expect(
			<IntlProvider locale="en-US">
				<NumberInput value={103.271} />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<ButtonWrapper>
				<IntlProvider locale="en-US">
					<FormInput type="number" value={103.271} />
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
					<FormInput type="number" value="" />
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
					<FormInput type="number" value={103.25} />
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
					<FormInput type="number" value="" />
				</IntlProvider>
				<Ignore />
			</ButtonWrapper>,
		));

	it("sets a default value to ensure input is controlled", () =>
		expect(
			<IntlProvider locale="en-US">
				<NumberInput />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<ButtonWrapper>
				<IntlProvider locale="en-US">
					<FormInput type="number" value="" />
				</IntlProvider>
				<Ignore />
			</ButtonWrapper>,
		));
});

describe("roundToStep", () => {
	it("rounds a number up to the nearest step", () =>
		expect(roundToStep, "when called with", [103.271, 0.1], "to equal", 103.3));

	it("rounds a number down to the nearest step", () =>
		expect(roundToStep, "when called with", [103.231, 0.1], "to equal", 103.2));

	it("works for steps > 1", () =>
		expect(roundToStep, "when called with", [12343, 10], "to equal", 12340));

	it("can round off 0", () =>
		expect(roundToStep, "when called with", [0, 0.1], "to equal", 0));

	it("returns empty string if given not a number to round off", () =>
		expect(roundToStep, "when called with", ["foo", 0.1], "to equal", ""));

	it("returns empty string if given not a number as step", () =>
		expect(roundToStep, "when called with", [10, "foo"], "to equal", ""));
});

const TestComp = ({ value, onChange, increment, decrement }) => (
	<div>
		<input id="field" value={value} onChange={onChange} />
		<button id="up" onClick={increment}>
			Up
		</button>
		<button id="down" onClick={decrement}>
			Down
		</button>
	</div>
);

describe("withNumberHandlers", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	describe("with no control prop", () => {
		it("onChange handler enforces numbers", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} />,
					"when mounted",
					"with event",
					{ type: "change", target: "#field", value: "foo" },
					"with event",
					{ type: "change", target: "#field", value: "0" },
					"with event",
					{ type: "change", target: "#field", value: "12.29" },
					"with event",
					{ type: "change", target: "#field", value: "0.13" },
				).then(() =>
					expect(update, "to have calls satisfying", [
						{ args: [""] },
						{ args: [0] },
						{ args: [12.29] },
						{ args: [0.13] },
					]),
				),
			));

		it("increment handler raises value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} value={3.545444} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#up" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [4.545444] }]),
				),
			));

		it("increments from zero", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} value={0} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#up" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [1] }]),
				),
			));

		it("decrement handler lowers value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} value={3.545444} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#down" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [2.545444] }]),
				),
			));

		it("decrements from zero", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} value={0} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#down" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [-1] }]),
				),
			));
	});

	describe("with step prop", () => {
		it("onChange handler enforces numbers rounded to nearest step", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} step={0.1} />,
					"when mounted",
					"with event",
					{ type: "change", target: "#field", value: "foo" },
					"with event",
					{ type: "change", target: "#field", value: "0" },
					"with event",
					{ type: "change", target: "#field", value: "12.29" },
					"with event",
					{ type: "change", target: "#field", value: "0.13" },
				).then(() =>
					expect(update, "to have calls satisfying", [
						{ args: [""] },
						{ args: [0] },
						{ args: [12.3] },
						{ args: [0.1] },
					]),
				),
			));

		it("increment handler raises value by step size", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} step={0.1} value={3.5} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#up" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [3.6] }]),
				),
			));

		it("increments from zero", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} step={0.1} value={0} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#up" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [0.1] }]),
				),
			));

		it("decrement handler lowers value by step size", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} step={0.1} value={3.5} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#down" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [3.4] }]),
				),
			));

		it("decrements from zero", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} step={0.1} value={0} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#down" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [-0.1] }]),
				),
			));
	});

	describe("with min prop", () => {
		it("onChange handler enforces numbers", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp min={3} update={update} />,
					"when mounted",
					"with event",
					{ type: "change", target: "#field", value: "foo" },
					"with event",
					{ type: "change", target: "#field", value: "0" },
					"with event",
					{ type: "change", target: "#field", value: "12.29" },
					"with event",
					{ type: "change", target: "#field", value: "0.13" },
				).then(() =>
					expect(update, "to have calls satisfying", [
						{ args: [""] },
						{ args: [3] },
						{ args: [12.29] },
						{ args: [3] },
					]),
				),
			));

		it("increment handler raises value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp min={3} update={update} value={3.545444} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#up" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [4.545444] }]),
				),
			));

		it("decrement handler lowers value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp min={3} update={update} value={4.545444} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#down" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [3.545444] }]),
				),
			));

		it("respects minimum", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp min={3} update={update} value={3.545444} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#down" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [3] }]),
				),
			));
	});

	describe("with min and step prop", () => {
		it("onChange handler enforces numbers rounded to nearest step", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp step={0.1} min={3} update={update} />,
					"when mounted",
					"with event",
					{ type: "change", target: "#field", value: "foo" },
					"with event",
					{ type: "change", target: "#field", value: "0" },
					"with event",
					{ type: "change", target: "#field", value: "12.29" },
					"with event",
					{ type: "change", target: "#field", value: "0.13" },
				).then(() =>
					expect(update, "to have calls satisfying", [
						{ args: [""] },
						{ args: [3] },
						{ args: [12.3] },
						{ args: [3] },
					]),
				),
			));

		it("increment handler raises value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp step={0.1} min={3} update={update} value={3.545444} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#up" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [3.6] }]),
				),
			));

		it("decrement handler lowers value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp step={0.1} min={3} update={update} value={3.555444} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#down" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [3.5] }]),
				),
			));

		it("respects minimum", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp step={0.1} min={3} update={update} value={3.045444} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#down" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [3] }]),
				),
			));
	});

	describe("with max prop", () => {
		it("onChange handler enforces numbers", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp max={3} update={update} />,
					"when mounted",
					"with event",
					{ type: "change", target: "#field", value: "foo" },
					"with event",
					{ type: "change", target: "#field", value: "0" },
					"with event",
					{ type: "change", target: "#field", value: "12.29" },
					"with event",
					{ type: "change", target: "#field", value: "0.13" },
				).then(() =>
					expect(update, "to have calls satisfying", [
						{ args: [""] },
						{ args: [0] },
						{ args: [3] },
						{ args: [0.13] },
					]),
				),
			));

		it("increment handler raises value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp max={3} update={update} value={1.545344} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#up" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [2.545344] }]),
				),
			));

		it("respects maximum", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp max={3} update={update} value={2.5458} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#up" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [3] }]),
				),
			));

		it("decrement handler lowers value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp max={3} update={update} value={2.545} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#down" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [1.545] }]),
				),
			));
	});

	describe("with max and step prop", () => {
		it("onChange handler enforces numbers rounded to nearest step", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp step={0.1} max={3} update={update} />,
					"when mounted",
					"with event",
					{ type: "change", target: "#field", value: "foo" },
					"with event",
					{ type: "change", target: "#field", value: "0" },
					"with event",
					{ type: "change", target: "#field", value: "12.29" },
					"with event",
					{ type: "change", target: "#field", value: "0.13" },
				).then(() =>
					expect(update, "to have calls satisfying", [
						{ args: [""] },
						{ args: [0] },
						{ args: [3] },
						{ args: [0.1] },
					]),
				),
			));

		it("increment handler raises value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp step={0.1} max={3} update={update} value={1.545} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#up" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [1.6] }]),
				),
			));

		it("respects maximum", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp step={0.1} max={3} update={update} value={2.9999} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#up" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [3] }]),
				),
			));

		it("decrement handler lowers value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp step={0.1} max={3} update={update} value={3.555444} />,
					"when mounted",
					"with event",
					{ type: "click", target: "#down" },
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [3.5] }]),
				),
			));
	});
});
