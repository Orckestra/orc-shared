import React from "react";
import sinon from "sinon";
import { FormInput } from "./Text";
import { ButtonWrapper, Spinners, InputButton } from "./FieldButtons";
import { NumberInput, roundToStep, withNumberHandlers } from "./Number";

describe("NumberInput", () => {
	it("renders an input field with up/down spinner buttons", () =>
		expect(
			<NumberInput value={103.271} />,
			"renders elements",
			"to render as",
			<ButtonWrapper>
				<FormInput type="number" value={103.271} />
				<Spinners>
					<InputButton>⮝</InputButton>
					<InputButton>⮟</InputButton>
				</Spinners>
			</ButtonWrapper>,
		));

	it("rounds input value top the step size", () =>
		expect(
			<NumberInput value={103.271} step={0.25} />,
			"renders elements",
			"to render as",
			<ButtonWrapper>
				<FormInput type="number" value={103.25} />
			</ButtonWrapper>,
		));

	it("sets a default value to ensure input is controlled", () =>
		expect(
			<NumberInput />,
			"renders elements",
			"to render as",
			<ButtonWrapper>
				<FormInput type="number" value="" />
			</ButtonWrapper>,
		));
});

describe("roundToStep", () => {
	it("rounds a number to the nearest step", () =>
		expect(
			roundToStep,
			"when called with",
			[103.271, 0.25],
			"to equal",
			103.25,
		));

	it("works for steps > 1", () =>
		expect(roundToStep, "when called with", [12343, 10], "to equal", 12340));

	it("can round off 0", () =>
		expect(roundToStep, "when called with", [0, 0.1], "to equal", 0));

	it("returns empty string if given not a number to round off", () =>
		expect(roundToStep, "when called with", ["foo", 0.1], "to equal", ""));

	it("returns empty string if given not a number as step", () =>
		expect(roundToStep, "when called with", [10, "foo"], "to equal", ""));
});

const TestComp = () => <div />;

describe("withNumberHandlers", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	describe("without step attribute", () => {
		it("onChange handler enforces numbers", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} />,
					"to render as",
					<TestComp
						onChange={expect
							.it("called with", [{ target: { value: "foo" } }])
							.and("called with", [{ target: { value: 0 } }])
							.and("called with", [{ target: { value: 12.29 } }])
							.and("called with", [{ target: { value: 0.13 } }])}
					/>,
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
					"to render as",
					<TestComp increment={expect.it("called")} />,
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [4.545444] }]),
				),
			));

		it("decrement handler lowers value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} value={3.545444} />,
					"to render as",
					<TestComp decrement={expect.it("called")} />,
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [2.545444] }]),
				),
			));
	});

	describe("with step attribute", () => {
		it("onChange handler enforces numbers rounded to nearest step", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} step={0.1} />,
					"to render as",
					<TestComp
						onChange={expect
							.it("called with", [{ target: { value: "foo" } }])
							.and("called with", [{ target: { value: 0 } }])
							.and("called with", [{ target: { value: 12.29 } }])
							.and("called with", [{ target: { value: 0.13 } }])}
					/>,
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
					"to render as",
					<TestComp increment={expect.it("called")} />,
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [3.6] }]),
				),
			));

		it("decrement handler lowers value by step size", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} step={0.1} value={3.5} />,
					"to render as",
					<TestComp decrement={expect.it("called")} />,
				).then(() =>
					expect(update, "to have calls satisfying", [{ args: [3.4] }]),
				),
			));
	});
});
