import React from "react";
import sinon from "sinon";
import { Row, TableRow, withRowClick } from "./Row";
import DataCell from "./DataCell";

const TestComp = () => <div />;

describe("Row", () => {
	it("it renders a data cell for each column definition", () => {
		const columnDefs = [{ fieldName: "a" }, { fieldName: "b" }];
		const row = { a: 1, b: true };
		const onClick = () => {};
		return expect(
			<Row
				row={row}
				rowId="rowIdentifier"
				columnDefs={columnDefs}
				onClick={onClick}
				bgColor="#ff0000"
			/>,
			"to render as",
			<TableRow onClick={onClick} bgColor="#ff0000">
				<DataCell
					key="a"
					rowId="rowIdentifier"
					row={expect.it("to be", row)}
					columnDef={expect.it("to be", columnDefs[0])}
				/>
				<DataCell
					key="b"
					rowId="rowIdentifier"
					row={expect.it("to be", row)}
					columnDef={expect.it("to be", columnDefs[1])}
				/>
			</TableRow>,
		);
	});
});

describe("withRowClick", () => {
	let rowOnClick, domElm;
	beforeEach(() => {
		rowOnClick = sinon.spy().named("rowOnClick");
		domElm = document.createElement("div");
	});

	it("only exists if an onClick handler is given from above", () =>
		expect(withRowClick, "when called with", [TestComp]).then(EnhComp =>
			expect(
				<EnhComp rowId="ident" />,
				"to render with all attributes as",
				<TestComp rowId="ident" />,
			),
		));

	it(
		"wraps onClick to add rowId to event target, " +
			"but not if target is form element",
		() =>
			expect(withRowClick, "when called with", [TestComp]).then(EnhComp =>
				expect(
					<EnhComp onClick={rowOnClick} rowId="ident" />,
					"to render as",
					<TestComp
						onClick={expect
							.it("called with", [
								{
									target: domElm,
								},
							])
							.and("called with", [
								{
									target: document.createElement("input"),
								},
							])
							.and("called with", [
								{
									target: document.createElement("select"),
								},
							])
							.and("called with", [
								{
									target: document.createElement("label"),
								},
							])
							.and("called with", [
								{
									target: domElm,
								},
							])}
					/>,
				).then(() =>
					expect(rowOnClick, "to have calls satisfying", [
						{ args: [{ target: { dataset: { rowId: "ident" } } }] },
						{ args: [{ target: { dataset: { rowId: "ident" } } }] },
					]),
				),
			),
	);
});

describe("TableRow", () => {
	it("renders with a hover transition", () =>
		expect(<TableRow />, "to render style rules").then(styles =>
			expect(
				styles,
				"to contain",
				"transition: background-color 0.2s ease-in;",
			).and("to contain", ":hover {background-color: #f3f3f3;}"),
		));

	it("renders a specific background color when given", () =>
		expect(
			<TableRow bgColor="#ff0000" />,
			"to render style rules",
			"to contain",
			"background-color: #ff0000;",
		));

	it("renders no transition if given a bgColor prop", () =>
		expect(<TableRow bgColor="#ff0000" />, "to render style rules").then(
			styles =>
				expect(styles, "not to match", /transition: background-color/).and(
					"not to match",
					/:hover \{[^}]*background-color:[^}]*\}/,
				),
		));
});
