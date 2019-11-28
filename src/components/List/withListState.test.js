import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import sinon from "sinon";
import { PropStruct } from "../../utils/testUtils";
import withListState from "./withListState";

const SelectionTestComp = ({
	selection = [],
	columnDefs = [{ onChange: () => {} }],
}) => (
	<div onClick={() => columnDefs[0].onChange(["list", "of", "row", "ids"])}>
		<input
			id="yes"
			onChange={columnDefs[0].onChange}
			data-row-id="selectedRow"
		/>
		<input id="no" onChange={columnDefs[0].onChange} data-row-id="myRow" />[
		{selection.join(", ")}]
	</div>
);

class SortTestComp extends React.Component {
	render() {
		return (
			<div>
				{this.props.columnDefs.map(def => (
					<button
						id={def.fieldName}
						key={def.fieldName}
						onClick={def.sort}
					></button>
				))}
			</div>
		);
	}
}

describe("withListState", () => {
	let store, state, columnDefs;
	beforeEach(() => {
		state = Immutable.fromJS({
			view: {},
		});
		store = {
			subscribe: () => {},
			getState: () => state,
			dispatch: sinon.spy().named("dispatch"),
		};
		columnDefs = [{ fieldName: "a" }];
	});

	it("does not change column definitions without cause", () =>
		expect(withListState, "called with", [PropStruct]).then(EnhComp =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<EnhComp name="test" columnDefs={columnDefs} />
					</MemoryRouter>
				</Provider>,
				"when mounted",
				"to satisfy",
				<PropStruct
					columnDefs={[
						{
							fieldName: "a",
						},
					]}
					history="__ignore"
					location="__ignore"
					match="__ignore"
					name="__ignore"
					selection="__ignore"
					updateViewState="__ignore"
					viewState="__ignore"
				/>,
			),
		));

	describe("column selection", () => {
		beforeEach(() => {
			state = Immutable.fromJS({
				view: {
					test: { selection: ["selectedRow"] },
				},
			});
			columnDefs = [{ type: "select" }, { fieldName: "a" }];
		});

		it("adds field name and onChange to select columns", () =>
			expect(withListState, "called with", [SelectionTestComp])
				.then(EnhComp =>
					expect(
						<Provider store={store}>
							<MemoryRouter>
								<EnhComp name="test" columnDefs={columnDefs} />
							</MemoryRouter>
						</Provider>,
						"when mounted",
						// Add name to selection
						"with event",
						{
							type: "change",
							target: "input#no",
						},
						// remove name from selection
						"with event",
						{
							type: "change",
							target: "input#yes",
						},
						// Replace selection
						"with event",
						"click",
					),
				)
				.then(() =>
					expect(store.dispatch, "to have calls satisfying", [
						{
							args: [
								// Add name to selection
								{
									type: "VIEW_STATE_SET_FIELD",
									payload: {
										name: "test",
										field: "selection",
										value: ["selectedRow", "myRow"],
									},
								},
							],
						},
						{
							args: [
								// remove name from selection
								{
									type: "VIEW_STATE_SET_FIELD",
									payload: { name: "test", field: "selection", value: [] },
								},
							],
						},
						{
							args: [
								// Replace selection
								{
									type: "VIEW_STATE_SET_FIELD",
									payload: {
										name: "test",
										field: "selection",
										value: ["list", "of", "row", "ids"],
									},
								},
							],
						},
					]),
				));

		it("handles missing selection", () => {
			state = state.deleteIn(["view", "test", "selection"]);
			return expect(withListState, "called with", [SelectionTestComp]).then(
				EnhComp =>
					expect(
						<Provider store={store}>
							<MemoryRouter>
								<EnhComp name="test" columnDefs={columnDefs} />
							</MemoryRouter>
						</Provider>,
						"when mounted",
						"to satisfy",
						<SelectionTestComp selection={[]} />,
					),
			);
		});
	});

	describe("column sorting", () => {
		let sorterSpies;
		beforeEach(() => {
			state = Immutable.fromJS({
				view: {
					test: {
						sorting: { column: "b", direction: "asc" },
					},
				},
			});
			sorterSpies = [
				sinon.spy().named("sorter-a"),
				sinon.spy().named("sorter-b"),
				sinon.spy().named("sorter-c"),
			];
			columnDefs = [
				{
					fieldName: "a",
					sort: sorterSpies[0],
					type: "currency",
					onChange: () => {},
				},
				{ fieldName: "b", sort: sorterSpies[1], type: "date" },
				{ fieldName: "c", sort: sorterSpies[2], type: "switch" },
			];
		});

		it("wraps sort functions to set view state", () =>
			expect(withListState, "called with", [SortTestComp])
				.then(EnhComp =>
					expect(
						<Provider store={store}>
							<MemoryRouter>
								<EnhComp name="test" columnDefs={columnDefs} />
							</MemoryRouter>
						</Provider>,
						"when mounted",
						"with event",
						{
							type: "click",
							target: "button#a",
						},
					),
				)
				.then(() =>
					expect(store.dispatch, "to have calls satisfying", [
						{
							args: [
								// sort column
								{
									type: "VIEW_STATE_SET_FIELD",
									payload: {
										name: "test",
										field: "sorting",
										value: { column: "a", direction: "asc" },
									},
								},
							],
						},
					]),
				)
				.then(() =>
					expect(sorterSpies, "to have calls satisfying", [
						{ spy: sorterSpies[0], args: [false, "a", "currency"] },
					]),
				));

		it("wraps sort functions to handle flipping sort direction", () =>
			expect(withListState, "called with", [SortTestComp])
				.then(EnhComp =>
					expect(
						<Provider store={store}>
							<MemoryRouter>
								<EnhComp name="test" columnDefs={columnDefs} />
							</MemoryRouter>
						</Provider>,
						"when mounted",
						"with event",
						{
							type: "click",
							target: "button#b",
						},
					),
				)
				.then(() =>
					expect(store.dispatch, "to have calls satisfying", [
						{
							args: [
								// sort column
								{
									type: "VIEW_STATE_SET_FIELD",
									payload: {
										name: "test",
										field: "sorting",
										value: { column: "b", direction: "desc" },
									},
								},
							],
						},
					]),
				)
				.then(() =>
					expect(sorterSpies, "to have calls satisfying", [
						{ spy: sorterSpies[1], args: [true, "b", "date"] },
					]),
				));
	});
});
