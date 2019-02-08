import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Immutable from "immutable";
import ReactTestUtils from "react-dom/test-utils";
import sinon from "sinon";
import withListState from "./withListState";

class TestComp extends React.Component {
	// It's a class so React's kinda bad test tools can use it...
	render() {
		return <div />;
	}
}

const getFakeEvent = name => ({
	stopPropagation: () => {},
	target: { dataset: { rowId: name } },
});

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
		expect(withListState, "called with", [TestComp]).then(EnhComp =>
			expect(
				<Provider store={store}>
					<MemoryRouter>
						<EnhComp name="test" columnDefs={columnDefs} />
					</MemoryRouter>
				</Provider>,
				"to deeply render as",
				<TestComp
					columnDefs={expect.it("to exhaustively satisfy", [
						{
							fieldName: "a",
						},
					])}
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
			expect(withListState, "called with", [TestComp])
				.then(EnhComp =>
					expect(
						<Provider store={store}>
							<MemoryRouter>
								<EnhComp name="test" columnDefs={columnDefs} />
							</MemoryRouter>
						</Provider>,
						"to deeply render as",
						<TestComp
							selection={["selectedRow"]}
							columnDefs={[
								expect.it("to exhaustively satisfy", {
									type: "select",
									fieldName: "selection",
									onChange: expect
										// Replace selection
										.it("called with", [["list", "of", "row", "ids"]])
										// Add name to selection
										.and("called with", [getFakeEvent("myRow")])
										// remove name from selection
										.and("called with", [getFakeEvent("selectedRow")]),
								}),
								{
									fieldName: "a",
								},
							]}
						/>,
					),
				)
				.then(() =>
					expect(store.dispatch, "to have calls satisfying", [
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
					]),
				));

		it("handles missing selection", () => {
			state = state.deleteIn(["view", "test", "selection"]);
			return expect(withListState, "called with", [TestComp]).then(EnhComp =>
				expect(
					<Provider store={store}>
						<MemoryRouter>
							<EnhComp name="test" columnDefs={columnDefs} />
						</MemoryRouter>
					</Provider>,
					"to deeply render as",
					<TestComp selection={[]} />,
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
				{ fieldName: "a", sort: sorterSpies[0], type: "currency" },
				{ fieldName: "b", sort: sorterSpies[1], type: "date" },
				{ fieldName: "c", sort: sorterSpies[2], type: "switch" },
			];
		});

		it("wraps sort functions to set view state", () =>
			expect(withListState, "called with", [TestComp])
				.then(EnhComp =>
					expect(
						<Provider store={store}>
							<MemoryRouter>
								<EnhComp name="test" columnDefs={columnDefs} />
							</MemoryRouter>
						</Provider>,
						"when deeply rendered",
						"queried for",
						<TestComp />,
					)
						.then(render => {
							ReactTestUtils.findRenderedComponentWithType(
								render,
								TestComp,
							).props.columnDefs[0].sort();
							return render;
						})
						.then(render =>
							expect(
								render,
								"to contain",
								<TestComp
									columnDefs={[
										expect.it("to exhaustively satisfy", {
											fieldName: "a",
											type: "currency",
											sort: expect.it("to be a function"),
										}),
										{ fieldName: "b" },
										{ fieldName: "c" },
									]}
								/>,
							),
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
			expect(withListState, "called with", [TestComp])
				.then(EnhComp =>
					expect(
						<Provider store={store}>
							<MemoryRouter>
								<EnhComp name="test" columnDefs={columnDefs} />
							</MemoryRouter>
						</Provider>,
						"when deeply rendered",
						"queried for",
						<TestComp selection={[]} />,
					)
						.then(render => {
							ReactTestUtils.findRenderedComponentWithType(
								render,
								TestComp,
							).props.columnDefs[1].sort();
							return render;
						})
						.then(render =>
							expect(
								render,
								"to contain",
								<TestComp
									selection={[]}
									columnDefs={[
										{ fieldName: "a" },
										expect.it("to satisfy", {
											fieldName: "b",
											type: "date",
											sort: expect.it("to be a function"),
											sortDirection: "asc",
										}),
										{ fieldName: "c" },
									]}
								/>,
							),
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
