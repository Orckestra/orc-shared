import React from "react";
import DataCell, { TableData } from "./DataCell";
import { FormattedNumber, FormattedDate, FormattedTime } from "react-intl";
import Switch from "../Switch";
import Checkbox from "../Checkbox";

describe("DataCell", () => {
	it("renders a cell as defined by column and row", () => {
		const columnDef = { fieldName: "test" };
		const row = { test: "A text", extraneous: "Don't show" };
		return expect(
			<DataCell columnDef={columnDef} row={row} />,
			"to render as",
			<TableData>A text</TableData>,
		);
	});

	it("renders an empty cell", () => {
		const columnDef = { fieldName: "test" };
		const row = { extraneous: "Don't show" };
		return expect(
			<DataCell columnDef={columnDef} row={row} />,
			"to render with all children as",
			<TableData />,
		);
	});

	it("renders a cell with a default value", () => {
		const columnDef = { fieldName: ["test", "deep"], defaultValue: "empty" };
		const row = { extraneous: "Don't show" };
		return expect(
			<DataCell columnDef={columnDef} row={row} />,
			"to render as",
			<TableData>empty</TableData>,
		);
	});

	it("renders a cell with type currency", () => {
		const columnDef = { fieldName: "test", type: "currency", currency: "USD" };
		const row = { test: 1200, extraneous: "Don't show" };
		return expect(
			<DataCell columnDef={columnDef} row={row} />,
			"to render as",
			<TableData>
				{/* eslint-disable-next-line react/style-prop-object */}
				<FormattedNumber style="currency" currency="USD" value={1200} />
			</TableData>,
		);
	});

	it("renders a cell with type currency and row-based currency code", () => {
		const columnDef = {
			fieldName: "test",
			type: "currency",
			currency: ["currency"],
		};
		const row = { test: 1200, extraneous: "Don't show", currency: "EUR" };
		return expect(
			<DataCell columnDef={columnDef} row={row} />,
			"to render as",
			<TableData>
				{/* eslint-disable-next-line react/style-prop-object */}
				<FormattedNumber style="currency" currency="EUR" value={1200} />
			</TableData>,
		);
	});

	it("renders a cell with type date", () => {
		const columnDef = { fieldName: "test", type: "date" };
		const row = {
			test: "2018-01-23T08:28:46.0000000Z",
			extraneous: "Don't show",
		};
		return expect(
			<DataCell columnDef={columnDef} row={row} />,
			"to render as",
			<TableData>
				<FormattedDate value="2018-01-23T08:28:46.0000000Z" />
			</TableData>,
		);
	});

	it("renders a cell with type datetime", () => {
		const columnDef = { fieldName: "test", type: "datetime" };
		const row = {
			test: "2018-01-23T08:28:46.0000000Z",
			extraneous: "Don't show",
		};
		return expect(
			<DataCell columnDef={columnDef} row={row} />,
			"to render as",
			<TableData>
				<FormattedDate value="2018-01-23T08:28:46.0000000Z" />{" "}
				<FormattedTime value="2018-01-23T08:28:46.0000000Z" />
			</TableData>,
		);
	});

	it("renders a cell with type select", () => {
		const onChange = () => {};
		const columnDef = { type: "select", onChange };
		const row = {
			test: false,
			extraneous: "Don't show",
		};
		return expect(
			<DataCell columnDef={columnDef} row={row} rowId="rowIdent" selected />,
			"to render as",
			<TableData>
				<Checkbox value={true} data-row-id="rowIdent" onChange={onChange} />
			</TableData>,
		);
	});

	it("renders a cell with type switch", () => {
		const columnDef = {
			fieldName: "test",
			type: "switch",
			switch: { onColor: "#ff00ff" },
		};
		const row = {
			test: false,
			extraneous: "Don't show",
		};
		return expect(
			<DataCell columnDef={columnDef} row={row} rowId="rowIdent" />,
			"to render as",
			<TableData>
				<Switch value={false} data-row-id="rowIdent" onColor="#ff00ff" />
			</TableData>,
		);
	});
});
