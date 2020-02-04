import React from "react";
import { Provider } from "react-redux";
import sinon from "sinon";
import { Row, TableRow, withRowClick } from "./Row";
import DataCell from "./DataCell";

const TestComp = ({ onClick }) => (
	<div onClick={onClick}>
		<input />
		<select />
		<label />
	</div>
);

describe("Row", () => {
	it("it renders a data cell for each column definition", () => {
		const columnDefs = [{ fieldName: "a" }, { fieldName: "b" }];
		const row = { a: "foo", b: "bar" };
		const onClick = () => {};
		return expect(
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
							onClick={onClick}
							bgColor="#ff0000"
						/>
					</tbody>
				</table>
			</Provider>,
			"when mounted",
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
						<TableRow onClick={onClick} bgColor="#ff0000">
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
						</TableRow>
					</tbody>
				</table>
			</Provider>,
		);
	});
});

describe("withRowClick", () => {
	let rowOnClick;
	beforeEach(() => {
		rowOnClick = sinon.spy().named("rowOnClick");
	});

	it("only exists if an onClick handler is given from above", () =>
		expect(withRowClick, "when called with", [TestComp]).then(EnhComp =>
			expect(
				<EnhComp rowId="ident" />,
				"when mounted",
				"to satisfy",
				<TestComp rowId="ident" />,
			),
		));

	it("wraps onClick to add rowId to event target, but not if target is form element", () =>
		expect(withRowClick, "when called with", [TestComp]).then(EnhComp =>
			expect(
				<EnhComp onClick={rowOnClick} rowId="ident" />,
				"when mounted",
				"with event",
				"click",
				"with event",
				{
					type: "click",
					target: "input",
				},
				"with event",
				{
					type: "click",
					target: "select",
				},
				"with event",
				{
					type: "click",
					target: "label",
				},
				"with event",
				"click",
				"to satisfy",
				<TestComp />,
			).then(() =>
				expect(rowOnClick, "to have calls satisfying", [
					{
						args: [
							{
								target: expect.it("to have attributes", {
									"data-row-id": "ident",
								}),
							},
						],
					},
					{
						args: [
							{
								target: expect.it("to have attributes", {
									"data-row-id": "ident",
								}),
							},
						],
					},
				]),
			),
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
});
