import React from "react";
import { IntlProvider } from "react-intl";
import DataCell, { TableData } from "./DataCell";
import Switch from "../Switch";
import Checkbox from "../Checkbox";
import Text from "../Text";

const TestComp = () => <div />;

describe("DataCell", () => {
	it("renders a cell as defined by column and row", () => {
		const columnDef = { fieldName: "test" };
		const row = { test: "A text", extraneous: "Don't show" };
		return expect(
			<DataCell columnDef={columnDef} row={row} />,
			"when mounted",
			"to satisfy",
			<TableData>
				<Text message="A text" />
			</TableData>,
		);
	});

	it("renders an empty cell", () => {
		const columnDef = { fieldName: "test" };
		const row = { extraneous: "Don't show" };
		return expect(
			<DataCell columnDef={columnDef} row={row} />,
			"when mounted",
			"to satisfy",
			<TableData />,
		);
	});

	it("renders a cell with a default value", () => {
		const columnDef = { fieldName: ["test", "deep"], defaultValue: "empty" };
		const row = { extraneous: "Don't show" };
		return expect(
			<DataCell columnDef={columnDef} row={row} />,
			"when mounted",
			"to satisfy",
			<TableData>
				<Text message="empty" />
			</TableData>,
		);
	});

	it("renders a cell with type currency", () => {
		const columnDef = { fieldName: "test", type: "currency", currency: "USD" };
		const row = { test: 1200, extraneous: "Don't show" };
		return expect(
			<IntlProvider>
				<DataCell columnDef={columnDef} row={row} />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<TableData>
				<span>$1,200.00</span>
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
			<IntlProvider>
				<DataCell columnDef={columnDef} row={row} />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<TableData>
				<span>€1,200.00</span>
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
			<IntlProvider>
				<DataCell columnDef={columnDef} row={row} />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<TableData>
				<span>1/23/2018</span>
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
			<IntlProvider>
				<DataCell columnDef={columnDef} row={row} />
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<TableData>
				<span>1/23/2018</span> <span>9:28 AM</span>
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
			"when mounted",
			"to satisfy",
			<TableData>
				<Checkbox
					id="select_rowIdent"
					value={true}
					data-row-id="rowIdent"
					onChange={onChange}
				/>
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
			"when mounted",
			"to satisfy",
			<TableData>
				<Switch
					id="switch0"
					value={false}
					data-row-id="rowIdent"
					onColor="#ff00ff"
				/>
			</TableData>,
		);
	});

	it("renders a cell with a value transformer", () => {
		const columnDef = {
			fieldName: "test",
			transform: val => val.toUpperCase(),
		};
		const row = { test: "text", extraneous: "Don't show" };
		return expect(
			<DataCell columnDef={columnDef} row={row} />,
			"when mounted",
			"to satisfy",
			<TableData>
				<Text message="TEXT" />
			</TableData>,
		);
	});

	it("renders a cell with type custom", () => {
		const columnDef = {
			type: "custom",
			component: TestComp,
		};
		const row = { test: "A text", extraneous: "Don't show" };
		return expect(
			<DataCell columnDef={columnDef} row={row} />,
			"when mounted",
			"to satisfy",
			<TableData>
				<TestComp test="A text" extraneous="Don't show" />
			</TableData>,
		);
	});
});
