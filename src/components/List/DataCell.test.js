import React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import DataCell, { TableData } from "./DataCell";
import Switch from "../Switch";
import Checkbox from "../Checkbox";

const TestComp = () => <div />;

describe("DataCell", () => {
	it("renders a cell as defined by column and row", () => {
		const columnDef = { fieldName: "test" };
		const row = { test: "A text", extraneous: "Don't show" };
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
						<tr>
							<DataCell columnDef={columnDef} row={row} />
						</tr>
					</tbody>
				</table>
			</Provider>,
			"when mounted",
			"to satisfy",
			<table>
				<tbody>
					<tr>
						<TableData>A text</TableData>
					</tr>
				</tbody>
			</table>,
		);
	});

	it("renders an empty cell", () => {
		const columnDef = { fieldName: "test" };
		const row = { extraneous: "Don't show" };
		return expect(
			<table>
				<tbody>
					<tr>
						<DataCell columnDef={columnDef} row={row} />
					</tr>
				</tbody>
			</table>,
			"when mounted",
			"to satisfy",
			<table>
				<tbody>
					<tr>
						<TableData />
					</tr>
				</tbody>
			</table>,
		);
	});

	it("renders a cell with a default value", () => {
		const columnDef = { fieldName: ["test", "deep"], defaultValue: "empty" };
		const row = { extraneous: "Don't show" };
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
						<tr>
							<DataCell columnDef={columnDef} row={row} />
						</tr>
					</tbody>
				</table>
			</Provider>,
			"when mounted",
			"to satisfy",
			<table>
				<tbody>
					<tr>
						<TableData>empty</TableData>
					</tr>
				</tbody>
			</table>,
		);
	});

	it("renders a cell with type currency", () => {
		const columnDef = { fieldName: "test", type: "currency", currency: "USD" };
		const row = { test: 1200, extraneous: "Don't show" };
		return expect(
			<IntlProvider locale="en">
				<table>
					<tbody>
						<tr>
							<DataCell columnDef={columnDef} row={row} />
						</tr>
					</tbody>
				</table>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<table>
				<tbody>
					<tr>
						<TableData>$1,200.00</TableData>
					</tr>
				</tbody>
			</table>,
		);
	});

	it("renders a cell with type currency for 0", () => {
		const columnDef = { fieldName: "test", type: "currency", currency: "USD" };
		const row = { test: 0, extraneous: "Don't show" };
		return expect(
			<IntlProvider locale="en">
				<table>
					<tbody>
						<tr>
							<DataCell columnDef={columnDef} row={row} />
						</tr>
					</tbody>
				</table>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<table>
				<tbody>
					<tr>
						<TableData>$0.00</TableData>
					</tr>
				</tbody>
			</table>,
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
			<IntlProvider locale="en">
				<table>
					<tbody>
						<tr>
							<DataCell columnDef={columnDef} row={row} />
						</tr>
					</tbody>
				</table>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<table>
				<tbody>
					<tr>
						<TableData>€1,200.00</TableData>
					</tr>
				</tbody>
			</table>,
		);
	});

	it("renders a cell with type date", () => {
		const columnDef = { fieldName: "test", type: "date" };
		const row = {
			test: "2018-01-23T08:28:46.0000000Z",
			extraneous: "Don't show",
		};
		return expect(
			<IntlProvider locale="en">
				<table>
					<tbody>
						<tr>
							<DataCell columnDef={columnDef} row={row} />
						</tr>
					</tbody>
				</table>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<table>
				<tbody>
					<tr>
						<TableData>1/23/2018</TableData>
					</tr>
				</tbody>
			</table>,
		);
	});

	it("renders a cell with type datetime", () => {
		const columnDef = { fieldName: "test", type: "datetime" };
		const row = {
			test: "2018-01-23 09:28:46",
			extraneous: "Don't show",
		};
		return expect(
			<IntlProvider locale="en">
				<table>
					<tbody>
						<tr>
							<DataCell columnDef={columnDef} row={row} />
						</tr>
					</tbody>
				</table>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<table>
				<tbody>
					<tr>
						<TableData>
							<>1/23/2018</> <>9:28 AM</>
						</TableData>
					</tr>
				</tbody>
			</table>,
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
			<table>
				<tbody>
					<tr>
						<DataCell columnDef={columnDef} row={row} rowId="rowIdent" selected />
					</tr>
				</tbody>
			</table>,
			"when mounted",
			"to satisfy",
			<table>
				<tbody>
					<tr>
						<TableData>
							<Checkbox
								id="select_rowIdent"
								value={true}
								data-row-id="rowIdent"
								onChange={onChange}
							/>
						</TableData>
					</tr>
				</tbody>
			</table>,
		);
	});

	it("renders a cell with type switch", () => {
		const onChange = () => {};
		const columnDef = {
			fieldName: "test",
			type: "switch",
			switch: { onColor: "#ff00ff" },
			onChange,
		};
		const row = {
			test: false,
			extraneous: "Don't show",
		};
		return expect(
			<table>
				<tbody>
					<tr>
						<DataCell columnDef={columnDef} row={row} rowId="rowIdent" />
					</tr>
				</tbody>
			</table>,
			"when mounted",
			"to satisfy",
			<table>
				<tbody>
					<tr>
						<TableData>
							<Switch
								id="switch0"
								value={false}
								data-row-id="rowIdent"
								onColor="#ff00ff"
								onChange={onChange}
							/>
						</TableData>
					</tr>
				</tbody>
			</table>,
		);
	});

	it("renders a cell with a value transformer", () => {
		const columnDef = {
			fieldName: "test",
			transform: val => val.toUpperCase(),
		};
		const row = { test: "text", extraneous: "Don't show" };
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
						<tr>
							<DataCell columnDef={columnDef} row={row} />
						</tr>
					</tbody>
				</table>
			</Provider>,
			"when mounted",
			"to satisfy",
			<table>
				<tbody>
					<tr>
						<TableData>TEXT</TableData>
					</tr>
				</tbody>
			</table>,
		);
	});

	it("renders a cell with type custom", () => {
		const columnDef = {
			type: "custom",
			component: TestComp,
		};
		const row = { test: "A text", extraneous: "Don't show" };
		return expect(
			<table>
				<tbody>
					<tr>
						<DataCell columnDef={columnDef} row={row} />
					</tr>
				</tbody>
			</table>,
			"when mounted",
			"to satisfy",
			<table>
				<tbody>
					<tr>
						<TableData>
							<TestComp test="A text" extraneous="Don't show" />
						</TableData>
					</tr>
				</tbody>
			</table>,
		);
	});
});
