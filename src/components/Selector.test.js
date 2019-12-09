import React from "react";
import sinon from "sinon";
import { Ignore } from "unexpected-reaction";
import FullSelector, {
	Selector,
	InnerSelect,
	Wrapper,
	SelectBox,
	SelectedValue,
	Dropdown,
	Option,
	Placeholder,
} from "./Selector";

describe("Selector", () => {
	it("renders a wrapped, hidden select element, and visual cover elements", () =>
		expect(
			<Selector
				id="test"
				clickOption={() => () => {}}
				options={[
					{ value: "1", label: "Opt 1" },
					{ value: "2", label: "Opt 2" },
					{ value: "3", label: "Opt 3" },
					{ value: "4", label: "Opt 4" },
				]}
				value="3"
			/>,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<InnerSelect id="test" value="3">
					<option key="1" value="1">
						Opt 1
					</option>
					<option key="2" value="2">
						Opt 2
					</option>
					<option key="3" value="3">
						Opt 3
					</option>
					<option key="4" value="4">
						Opt 4
					</option>
				</InnerSelect>
				<SelectBox htmlFor="test">
					<SelectedValue>Opt 3</SelectedValue>
				</SelectBox>
				<Dropdown>
					<Option key="1">Opt 1</Option>
					<Option key="2">Opt 2</Option>
					<Option key="3" active>
						Opt 3
					</Option>
					<Option key="4">Opt 4</Option>
				</Dropdown>
			</Wrapper>,
		));

	it("renders a wrapped, hidden select element, and visual cover elements", () =>
		expect(
			<Selector
				id="test"
				clickOption={() => () => {}}
				options={[
					{ value: "1", label: "Opt 1" },
					{ value: "2", label: "Opt 2" },
					{ value: "3", label: "Opt 3" },
					{ value: "4", label: "Opt 4" },
				]}
				value=""
				required
			/>,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<InnerSelect id="test" required>
					<option></option>
					<option key="1" value="1">
						Opt 1
					</option>
					<option key="2" value="2">
						Opt 2
					</option>
					<option key="3" value="3">
						Opt 3
					</option>
					<option key="4" value="4">
						Opt 4
					</option>
				</InnerSelect>
				<SelectBox htmlFor="test">
					<Placeholder />
				</SelectBox>
				<Dropdown>
					<Option key="1">Opt 1</Option>
					<Option key="2">Opt 2</Option>
					<Option key="3">Opt 3</Option>
					<Option key="4">Opt 4</Option>
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
					{ value: "1", label: "Opt 1" },
					{ value: "2", label: "Opt 2" },
					{ value: "3", label: "Opt 3" },
					{ value: "4", label: "Opt 4" },
				]}
			/>,
			"when mounted",
			"to satisfy",
			<Wrapper>
				<Ignore />
				<SelectBox htmlFor="test">
					<Placeholder>This space for rent</Placeholder>
				</SelectBox>
				<Ignore />
			</Wrapper>,
		));

	describe("set up to handle values and state", () => {
		let updater;
		beforeEach(() => {
			updater = sinon.spy().named("updater");
		});

		it("can update value when inner selector changes", () =>
			expect(
				<FullSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value="3"
				/>,
				"when mounted",
				"with event",
				{ type: "change", target: "select", value: "2" },
			).then(() =>
				expect(updater, "to have calls satisfying", [{ args: ["2"] }]),
			));

		it("can update value when clicking a visual option", () =>
			expect(
				<FullSelector
					update={updater}
					options={[
						{ value: "1", label: "Opt 1" },
						{ value: "2", label: "Opt 2" },
						{ value: "3", label: "Opt 3" },
						{ value: "4", label: "Opt 4" },
					]}
					value="3"
				/>,
				"when mounted",
				"with event",
				{ type: "click", target: '[data-test-id="1"]' },
			).then(() =>
				expect(updater, "to have calls satisfying", [{ args: ["1"] }]),
			));
	});
});
