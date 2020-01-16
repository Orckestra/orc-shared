import React from "react";
import sinon from "sinon";
import { getClassName } from "../utils/testUtils";
import Text from "./Text";
import {
	InnerSelect,
	Wrapper,
	SelectBox,
	Dropdown,
	Option,
	Placeholder,
} from "./Selector";
import FullSelector, { MultiSelector, SelectedValue } from "./MultiSelector";

describe("MultiSelector", () => {
	it("renders a wrapped, hidden multiple select element, and visual cover elements", () =>
		expect(
			<MultiSelector
				id="test"
				clickOption={() => () => {}}
				onChange={() => {}}
				options={[
					{ value: "1", label: "Opt 1" },
					{ value: "2", label: "Opt 2" },
					{ value: "3", label: "Opt 3" },
					{ value: "4", label: "Opt 4" },
				]}
				value={["1", "3"]}
			/>,
			"when mounted",
			"to satisfy",
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
				<SelectBox htmlFor="test">
					<SelectedValue>Opt 1, Opt 3</SelectedValue>
				</SelectBox>
				<Dropdown>
					<Option key="multiselect_clear">
						<Text message="[Clear]" />
					</Option>
					<Option key="multiselect_selectAll">
						<Text message="[Select all]" />
					</Option>
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

	it("only renders 'Clear' if value not empty", () =>
		expect(
			<MultiSelector
				id="test"
				clickOption={() => () => {}}
				onChange={() => {}}
				options={[
					{ value: "1", label: "Opt 1" },
					{ value: "2", label: "Opt 2" },
					{ value: "3", label: "Opt 3" },
					{ value: "4", label: "Opt 4" },
				]}
				value={[]}
			/>,
			"when mounted",
			"not to contain",
			<Option key="multiselect_clear">
				<Text message="[Clear]" />
			</Option>,
		));

	it("only renders 'Select all' if value not full", () =>
		expect(
			<MultiSelector
				id="test"
				clickOption={() => () => {}}
				onChange={() => {}}
				options={[
					{ value: "1", label: "Opt 1" },
					{ value: "2", label: "Opt 2" },
					{ value: "3", label: "Opt 3" },
					{ value: "4", label: "Opt 4" },
				]}
				value={["1", "2", "3", "4"]}
			/>,
			"when mounted",
			"not to contain",
			<Option key="multiselect_selectAll">
				<Text message="[Select all]" />
			</Option>,
		));

	it("renders a placeholder if no value set", () =>
		expect(
			<MultiSelector
				id="test"
				placeholder="This space for rent"
				clickOption={() => () => {}}
				onChange={() => {}}
				required
				options={[
					{ value: "1", label: "Opt 1" },
					{ value: "2", label: "Opt 2" },
					{ value: "3", label: "Opt 3" },
					{ value: "4", label: "Opt 4" },
				]}
			/>,
			"when mounted",
			"queried for first",
			"." + getClassName(<Placeholder />),
			"to satisfy",
			<Placeholder>This space for rent</Placeholder>,
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
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value={["3"]}
				/>,
				"when mounted",
				"with event",
				{ type: "change", value: "2", target: "select" },
			).then(() =>
				expect(updater, "to have calls satisfying", [{ args: [["3", "2"]] }]),
			));

		it("can remove value when inner selector changes", () =>
			expect(
				<FullSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value={["2", "3"]}
				/>,
				"when mounted",
				"with event",
				{ type: "change", value: "3", target: "select" },
			).then(() =>
				expect(updater, "to have calls satisfying", [{ args: [["2"]] }]),
			));

		it("can add value when clicking a visual option", () =>
			expect(
				<FullSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value={["3"]}
				/>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="4"]' },
			).then(() =>
				expect(updater, "to have calls satisfying", [{ args: [["3", "4"]] }]),
			));

		it("can remove value when clicking a visual option", () =>
			expect(
				<FullSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value={["4", "3"]}
				/>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="4"]' },
			).then(() =>
				expect(updater, "to have calls satisfying", [{ args: [["3"]] }]),
			));

		it("sets empty value when cleared", () =>
			expect(
				<FullSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value={["4", "3"]}
				/>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="multiselect_clear"]' },
			).then(() =>
				expect(updater, "to have calls satisfying", [{ args: [[]] }]),
			));

		it("sets full value when select all chosen", () =>
			expect(
				<FullSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value={[4, 3]}
				/>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="multiselect_selectAll"]' },
			).then(() =>
				expect(updater, "to have calls satisfying", [
					{ args: [["1", "2", "3", "4"]] },
				]),
			));

		it("deals with an empty value prop change", () =>
			expect(
				<FullSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
				/>,
				"when mounted",
				"with event",
				{ type: "change", value: "2", target: "select" },
			).then(() =>
				expect(updater, "to have calls satisfying", [{ args: [["2"]] }]),
			));

		it("deals with an empty value prop click", () =>
			expect(
				<FullSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
				/>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="2"]' },
			).then(() =>
				expect(updater, "to have calls satisfying", [{ args: [["2"]] }]),
			));
	});
});
