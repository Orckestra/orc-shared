import React from "react";
import sinon from "sinon";
import {
	InnerSelect,
	Wrapper,
	SelectBox,
	Dropdown,
	Option,
	Placeholder,
} from "./Selector";
import FullSelector, { Selector } from "./MultiSelector";

describe("MultiSelector", () => {
	it("renders a wrapped, hidden multiple select element, and visual cover elements", () =>
		expect(
			<Selector
				id="test"
				clickOption={() => () => {}}
				options={[
					{ value: 1, label: "Opt 1" },
					{ value: 2, label: "Opt 2" },
					{ value: 3, label: "Opt 3" },
					{ value: 4, label: "Opt 4" },
				]}
				value={[1, 3]}
			/>,
			"to render as",
			<Wrapper>
				<InnerSelect id="test" multiple>
					<option key={1} value={1}>
						Opt 1
					</option>
					<option key={2} value={2}>
						Opt 2
					</option>
					<option key={3} value={3}>
						Opt 3
					</option>
					<option key={4} value={4}>
						Opt 4
					</option>
				</InnerSelect>
				<SelectBox htmlFor="test">Opt 1, Opt 3</SelectBox>
				<Dropdown>
					<Option key={1} active>
						Opt 1
					</Option>
					<Option key={2}>Opt 2</Option>
					<Option key={3} active>
						Opt 3
					</Option>
					<Option key={4}>Opt 4</Option>
				</Dropdown>
			</Wrapper>,
		));

	it("renders a placeholder if no value set", () =>
		expect(
			<Selector
				id="test"
				placeholder="This space for rent"
				clickOption={() => () => {}}
				options={[
					{ value: 1, label: "Opt 1" },
					{ value: 2, label: "Opt 2" },
					{ value: 3, label: "Opt 3" },
					{ value: 4, label: "Opt 4" },
				]}
				value=""
			/>,
			"to render as",
			<Wrapper>
				<SelectBox htmlFor="test">
					<Placeholder>This space for rent</Placeholder>
				</SelectBox>
			</Wrapper>,
		));

	describe("set up to handle values and state", () => {
		let updater;
		beforeEach(() => {
			updater = sinon.spy().named("updater");
		});

		it("can add value when inner selector changes", () =>
			expect(
				<FullSelector
					update={updater}
					options={[
						{ value: 1, label: "Opt 1" },
						{ value: 2, label: "Opt 2" },
						{ value: 3, label: "Opt 3" },
						{ value: 4, label: "Opt 4" },
					]}
					value={[3]}
				/>,
				"when deeply rendered",
				"with event",
				"change",
				{ target: { value: 2 } },
				"on",
				<select />,
			).then(() =>
				expect(updater, "to have calls satisfying", [{ args: [[3, 2]] }]),
			));

		it("can remove value when inner selector changes", () =>
			expect(
				<FullSelector
					update={updater}
					options={[
						{ value: 1, label: "Opt 1" },
						{ value: 2, label: "Opt 2" },
						{ value: 3, label: "Opt 3" },
						{ value: 4, label: "Opt 4" },
					]}
					value={[2, 3]}
				/>,
				"when deeply rendered",
				"with event",
				"change",
				{ target: { value: 2 } },
				"on",
				<select />,
			).then(() =>
				expect(updater, "to have calls satisfying", [{ args: [[3]] }]),
			));

		it("can add value when clicking a visual option", () =>
			expect(
				<FullSelector
					update={updater}
					options={[
						{ value: 1, label: "Opt 1" },
						{ value: 2, label: "Opt 2" },
						{ value: 3, label: "Opt 3" },
						{ value: 4, label: "Opt 4" },
					]}
					value={[3]}
				/>,
				"when deeply rendered",
				"with event",
				"click",
				"on",
				<Option>Opt 4</Option>,
			).then(() =>
				expect(updater, "to have calls satisfying", [{ args: [[3, 4]] }]),
			));

		it("can remove value when clicking a visual option", () =>
			expect(
				<FullSelector
					update={updater}
					options={[
						{ value: 1, label: "Opt 1" },
						{ value: 2, label: "Opt 2" },
						{ value: 3, label: "Opt 3" },
						{ value: 4, label: "Opt 4" },
					]}
					value={[4, 3]}
				/>,
				"when deeply rendered",
				"with event",
				"click",
				"on",
				<Option>Opt 4</Option>,
			).then(() =>
				expect(updater, "to have calls satisfying", [{ args: [[3]] }]),
			));

		it("deals with an empty value prop change", () =>
			expect(
				<FullSelector
					update={updater}
					options={[
						{ value: 1, label: "Opt 1" },
						{ value: 2, label: "Opt 2" },
						{ value: 3, label: "Opt 3" },
						{ value: 4, label: "Opt 4" },
					]}
				/>,
				"when deeply rendered",
				"with event",
				"change",
				{ target: { value: 2 } },
				"on",
				<select />,
			).then(() =>
				expect(updater, "to have calls satisfying", [{ args: [[2]] }]),
			));

		it("deals with an empty value prop click", () =>
			expect(
				<FullSelector
					update={updater}
					options={[
						{ value: 1, label: "Opt 1" },
						{ value: 2, label: "Opt 2" },
						{ value: 3, label: "Opt 3" },
						{ value: 4, label: "Opt 4" },
					]}
				/>,
				"when deeply rendered",
				"with event",
				"click",
				"on",
				<Option>Opt 2</Option>,
			).then(() =>
				expect(updater, "to have calls satisfying", [{ args: [[2]] }]),
			));
	});
});
