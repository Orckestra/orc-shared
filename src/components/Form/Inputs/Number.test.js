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

const TestComp = () => <div />;

describe("withNumberHandlers", () => {
	let update;
	beforeEach(() => {
		update = sinon.spy().named("update");
	});

	describe("with no control prop", () => {
		it("onChange handler enforces numbers", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(<EnhComp update={update} />, "when rendered", "has elements")
					.then(elements =>
						expect(elements.props.onChange, "called with", [
							{ target: { value: "foo" } },
						])
							.and("called with", [{ target: { value: 0 } }])
							.and("called with", [{ target: { value: 12.29 } }])
							.and("called with", [{ target: { value: 0.13 } }]),
					)
					.then(() =>
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
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.increment, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [4.545444] }]),
					),
			));

		it("increments from zero", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} value={0} />,
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.increment, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [1] }]),
					),
			));

		it("decrement handler lowers value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} value={3.545444} />,
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.decrement, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [2.545444] }]),
					),
			));

		it("decrements from zero", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} value={0} />,
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.decrement, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [-1] }]),
					),
			));
	});

	describe("with step prop", () => {
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
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.increment, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [3.6] }]),
					),
			));

		it("increments from zero", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} step={0.1} value={0} />,
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.increment, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [0.1] }]),
					),
			));

		it("decrement handler lowers value by step size", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} step={0.1} value={3.5} />,
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.decrement, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [3.4] }]),
					),
			));

		it("decrements from zero", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp update={update} step={0.1} value={0} />,
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.decrement, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [-0.1] }]),
					),
			));
	});

	describe("with min prop", () => {
		it("onChange handler enforces numbers", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp min={3} update={update} />,
					"when rendered",
					"has elements",
				)
					.then(elements =>
						expect(elements.props.onChange, "called with", [
							{ target: { value: "foo" } },
						])
							.and("called with", [{ target: { value: 0 } }])
							.and("called with", [{ target: { value: 12.29 } }])
							.and("called with", [{ target: { value: 0.13 } }]),
					)
					.then(() =>
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
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.increment, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [4.545444] }]),
					),
			));

		it("decrement handler lowers value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp min={3} update={update} value={4.545444} />,
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.decrement, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [3.545444] }]),
					),
			));

		it("respects minimum", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp min={3} update={update} value={3.545444} />,
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.decrement, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [3] }]),
					),
			));
	});

	describe("with min and step prop", () => {
		it("onChange handler enforces numbers rounded to nearest step", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp step={0.1} min={3} update={update} />,
					"when rendered",
					"has elements",
				)
					.then(elements =>
						expect(elements.props.onChange, "called with", [
							{ target: { value: "foo" } },
						])
							.and("called with", [{ target: { value: 0 } }])
							.and("called with", [{ target: { value: 12.29 } }])
							.and("called with", [{ target: { value: 0.13 } }]),
					)
					.then(() =>
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
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.increment, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [3.6] }]),
					),
			));

		it("decrement handler lowers value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp step={0.1} min={3} update={update} value={3.555444} />,
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.decrement, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [3.5] }]),
					),
			));

		it("respects minimum", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp step={0.1} min={3} update={update} value={3.045444} />,
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.decrement, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [3] }]),
					),
			));
	});

	describe("with max prop", () => {
		it("onChange handler enforces numbers", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp max={3} update={update} />,
					"when rendered",
					"has elements",
				)
					.then(elements =>
						expect(elements.props.onChange, "called with", [
							{ target: { value: "foo" } },
						])
							.and("called with", [{ target: { value: 0 } }])
							.and("called with", [{ target: { value: 12.29 } }])
							.and("called with", [{ target: { value: 0.13 } }]),
					)
					.then(() =>
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
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.increment, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [2.545344] }]),
					),
			));

		it("respects maximum", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp max={3} update={update} value={2.5458} />,
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.increment, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [3] }]),
					),
			));

		it("decrement handler lowers value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp max={3} update={update} value={2.545} />,
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.decrement, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [1.545] }]),
					),
			));
	});

	describe("with max and step prop", () => {
		it("onChange handler enforces numbers rounded to nearest step", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp step={0.1} max={3} update={update} />,
					"when rendered",
					"has elements",
				)
					.then(elements =>
						expect(elements.props.onChange, "called with", [
							{ target: { value: "foo" } },
						])
							.and("called with", [{ target: { value: 0 } }])
							.and("called with", [{ target: { value: 12.29 } }])
							.and("called with", [{ target: { value: 0.13 } }]),
					)
					.then(() =>
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
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.increment, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [1.6] }]),
					),
			));

		it("respects maximum", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp step={0.1} max={3} update={update} value={2.9999} />,
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.increment, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [3] }]),
					),
			));

		it("decrement handler lowers value by 1", () =>
			expect(withNumberHandlers, "called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp step={0.1} max={3} update={update} value={3.555444} />,
					"when rendered",
					"has elements",
				)
					.then(elements => expect(elements.props.decrement, "called"))
					.then(() =>
						expect(update, "to have calls satisfying", [{ args: [3.5] }]),
					),
			));
	});
});
