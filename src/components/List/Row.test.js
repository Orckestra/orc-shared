import React from "react";
import { Provider } from "react-redux";
import sinon from "sinon";
import { Row, TableRow, stringifyFieldName } from "./Row";
import DataCell from "./DataCell";

const TestComp = () => (
	<div>
		<input />
		<select />
		<label />
	</div>
);

describe("Row", () => {
	let rowOnClick, columnDefs, row;
	beforeEach(() => {
		rowOnClick = sinon.spy().named("rowOnClick");
		columnDefs = [
			{ fieldName: "a" },
			{ fieldName: "b" },
			{ fieldName: "test", type: "custom", component: TestComp },
		];
		row = { a: "foo", b: "bar" };
	});

	it("it renders a data cell for each column definition", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<table>
					<tbody>
						<Row
							row={row}
							rowId="rowIdentifier"
							columnDefs={columnDefs}
							rowOnClick={rowOnClick}
							bgColor="#ff0000"
						/>
					</tbody>
				</table>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: "tr" },
			"to satisfy",
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<table>
					<tbody>
						<TableRow bgColor="#ff0000" onClick={() => {}}>
							<DataCell
								key="a"
								rowId="rowIdentifier"
								row={row}
								columnDef={columnDefs[0]}
							/>
							<DataCell
								key="b"
								rowId="rowIdentifier"
								row={row}
								columnDef={columnDefs[1]}
							/>
							<DataCell
								key="test"
								rowId="rowIdentifier"
								row={row}
								columnDef={columnDefs[2]}
							/>
						</TableRow>
					</tbody>
				</table>
			</Provider>,
		).then(() => expect(rowOnClick, "was called")));

	it("wraps row onClick handler to add rowId to event target, and not to fire if target is form element", () =>
		expect(
			<Provider
				store={{
					subscribe: () => {},
					dispatch: () => {},
					getState: () => ({}),
				}}
			>
				<table>
					<tbody>
						<Row
							row={row}
							rowId="rowIdentifier"
							columnDefs={columnDefs}
							rowOnClick={rowOnClick}
						/>
					</tbody>
				</table>
			</Provider>,
			"when mounted",
			"with event",
			"click",
			"with event",
			{
				type: "click",
				target: "input",
				// don't fire
			},
			"with event",
			{
				type: "click",
				target: "select",
				// don't fire
			},
			"with event",
			{
				type: "click",
				target: "label",
				// don't fire
			},
			"with event",
			{
				type: "click",
				target: "tr",
			},
			"to contain",
			<TestComp />,
		).then(() =>
			expect(rowOnClick, "to have calls satisfying", [
				{
					args: [
						{
							target: expect.it("to have attributes", {
								"data-row-id": "rowIdentifier",
							}),
						},
					],
				},
			]),
		));
});

describe("TableRow", () => {
	it("renders with a hover transition", () =>
		expect(
			<table>
				<tbody>
					<TableRow />
				</tbody>
			</table>,
			"when mounted",
			"queried for first",
			"tr",
			"to have style rules satisfying",
			expect
				.it("to contain", "transition: background-color 0.2s ease-in;")
				.and("to contain", ":hover {background-color: #f3f3f3;}"),
		));

	it("renders a specific background color when given", () =>
		expect(
			<table>
				<tbody>
					<TableRow bgColor="#ff0000" />
				</tbody>
			</table>,
			"when mounted",
			"queried for first",
			"tr",
			"to have style rules satisfying",
			"to contain",
			"background-color: #ff0000;",
		));

	it("renders no transition if given a bgColor prop", () =>
		expect(
			<table>
				<tbody>
					<TableRow bgColor="#ff0000" />
				</tbody>
			</table>,
			"when mounted",
			"queried for first",
			"tr",
			"to have style rules satisfying",
			expect
				.it("not to match", /transition: background-color/)
				.and("not to match", /:hover \{[^}]*background-color:[^}]*\}/),
		));

	it("sets cursor type if given click handler", () =>
		expect(
			<table>
				<tbody>
					<TableRow onClick={() => {}} />
				</tbody>
			</table>,
			"when mounted",
			"queried for first",
			"tr",
			"to have style rules satisfying",
			expect.it("to contain", "td {cursor: pointer;}"),
		));
});

describe("stringifyFieldName", () => {
	it("does nothing to a string", () =>
		expect(
			stringifyFieldName,
			"when called with",
			["FieldName"],
			"to equal",
			"FieldName",
		));

	it("converts an array to a string", () =>
		expect(
			stringifyFieldName,
			"when called with",
			[["fieldA", "foo"]],
			"to equal",
			"fieldA_foo",
		));

	it("handles arrays with non-string types", () =>
		expect(
			stringifyFieldName,
			"when called with",
			[["fieldA", 0, "foo"]],
			"to equal",
			"fieldA_0_foo",
		));

	it("returns undefined if given undefined", () =>
		expect(stringifyFieldName, "when called with", [undefined], "to equal", undefined));
});
