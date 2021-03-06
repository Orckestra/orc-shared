import React from "react";
import { Provider } from "react-redux";
import sinon from "sinon";
import { getStyledClassSelector } from "../utils/testUtils";
import { InnerSelect, Wrapper, SelectBox, Dropdown, Option, Placeholder } from "./Selector";
import MultiSelector, { SelectedValue } from "./MultiSelector";

describe("MultiSelector", () => {
	let updater;
	beforeEach(() => {
		updater = sinon.spy().named("updater");
	});

	it("renders a wrapped, hidden multiple select element, and visual cover elements", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MultiSelector
					id="test"
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value={["1", "3"]}
				/>
			</Provider>,
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
					<Option key="multiselect_clear">[Clear]</Option>
					<Option key="multiselect_selectAll">[Select all]</Option>
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
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MultiSelector
					id="test"
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value={[]}
				/>
			</Provider>,
			"when mounted",
			"not to contain",
			<Option key="multiselect_clear">[Clear]</Option>,
		));

	it("only renders 'Select all' if value not full", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MultiSelector
					id="test"
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value={["1", "2", "3", "4"]}
				/>
			</Provider>,
			"when mounted",
			"not to contain",
			<Option key="multiselect_selectAll">[Select all]</Option>,
		));

	it("renders a placeholder if no value set", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MultiSelector
					id="test"
					placeholder="This space for rent"
					update={updater}
					required
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
				/>
			</Provider>,
			"when mounted",
			"queried for first",
			getStyledClassSelector(Placeholder),
			"to satisfy",
			<Placeholder>This space for rent</Placeholder>,
		));

	it("can add value when inner selector changes", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MultiSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value={["3"]}
				/>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "change", value: "2", target: "select" },
		).then(() => expect(updater, "to have calls satisfying", [{ args: [["3", "2"]] }])));

	it("can remove value when inner selector changes", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MultiSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value={["2", "3"]}
				/>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "change", value: "3", target: "select" },
		).then(() => expect(updater, "to have calls satisfying", [{ args: [["2"]] }])));

	it("can add value when clicking a visual option", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MultiSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value={["3"]}
				/>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: '[data-test-id="4"]' },
		).then(() => expect(updater, "to have calls satisfying", [{ args: [["3", "4"]] }])));

	it("can remove value when clicking a visual option", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MultiSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value={["4", "3"]}
				/>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: '[data-test-id="4"]' },
		).then(() => expect(updater, "to have calls satisfying", [{ args: [["3"]] }])));

	it("sets empty value when cleared", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MultiSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value={["4", "3"]}
				/>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: '[data-test-id="multiselect_clear"]' },
		).then(() => expect(updater, "to have calls satisfying", [{ args: [[]] }])));

	it("sets full value when select all chosen", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MultiSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value={[4, 3]}
				/>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: '[data-test-id="multiselect_selectAll"]' },
		).then(() => expect(updater, "to have calls satisfying", [{ args: [["1", "2", "3", "4"]] }])));

	it("deals with an empty value prop change", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MultiSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
				/>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "change", value: "2", target: "select" },
		).then(() => expect(updater, "to have calls satisfying", [{ args: [["2"]] }])));

	it("deals with an empty value prop click", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<MultiSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
				/>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: '[data-test-id="2"]' },
		).then(() => expect(updater, "to have calls satisfying", [{ args: [["2"]] }])));
});
