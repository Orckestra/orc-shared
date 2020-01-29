import React from "react";
import { Provider } from "react-redux";
import sinon from "sinon";
import { Ignore } from "unexpected-reaction";
import {
	CategoryList,
	CategoryRow,
	CategoryHeader,
	CategoryIndicator,
} from "./CategoryList";
import { Wrapper as Checkbox, Cover } from "./Checkbox";
import { Table, Placeholder } from "./List/List";
import { TableRow } from "./List/Row";
import { TableData } from "./List/DataCell";
import { HeadTableRow } from "./List/HeadRow";
import { HeadBox, TableHeader } from "./List/HeadCell";

describe("CategoryList", () => {
	let store, viewState;
	beforeEach(() => {
		store = {
			subscribe: () => {},
			dispatch: sinon.spy().named("dispatch"),
			getState: () => ({ getIn: () => viewState }),
		};
	});

	it("renders nothing if no columnDefs", () =>
		expect(
			<div>
				<Provider store={store}>
					<CategoryList rows={[{ id: "foo" }]} />
				</Provider>
			</div>,
			"when mounted",
			"to satisfy",
			<div />,
		));

	it("renders a table", () =>
		expect(
			<Provider store={store}>
				<CategoryList columnDefs={[{ fieldName: "a" }]} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<Table>
				<thead>
					<tr>
						<th>
							<Ignore />
						</th>
					</tr>
				</thead>
				<tbody></tbody>
			</Table>,
		));

	it("renders just a header", () =>
		expect(
			<Provider store={store}>
				<CategoryList
					columnDefs={[
						{ fieldName: "a" },
						{ fieldName: "b" },
						{ fieldName: "c" },
					]}
				/>
			</Provider>,
			"when mounted",
			"to satisfy",
			<table>
				<thead>
					<tr>
						<th>
							<Ignore />
						</th>
						<th>
							<Ignore />
						</th>
						<th>
							<Ignore />
						</th>
					</tr>
				</thead>
				<tbody />
			</table>,
		));

	it("renders a placeholder if one given and no rows", () =>
		expect(
			<Provider store={store}>
				<CategoryList
					height={121}
					columnDefs={[
						{ fieldName: "a" },
						{ fieldName: "b" },
						{ fieldName: "c" },
					]}
					placeholder={<div />}
				/>
			</Provider>,
			"when mounted",
			"to satisfy",
			<table>
				<thead>
					<tr>
						<th>
							<Ignore />
						</th>
						<th>
							<Ignore />
						</th>
						<th>
							<Ignore />
						</th>
					</tr>
				</thead>
				<tbody>
					<Placeholder width={3} height={80}>
						<div />
					</Placeholder>
				</tbody>
			</table>,
		));

	it("renders a category row and a row for each row data object", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{ fieldName: "key" }];
		const rowOnClick = () => {};
		return expect(
			<Provider store={store}>
				<CategoryList
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
					rowOnClick={rowOnClick}
				/>
			</Provider>,
			"when mounted",
			"to satisfy",
			<table>
				<thead>
					<tr>
						<th>
							<Ignore />
						</th>
					</tr>
				</thead>
				<tbody>
					<CategoryRow>
						<td>
							<Ignore />
							<Ignore />
						</td>
					</CategoryRow>
					<TableRow>
						<TableData>a</TableData>
					</TableRow>
					<TableRow>
						<TableData>b</TableData>
					</TableRow>
					<TableRow>
						<TableData>c</TableData>
					</TableRow>
				</tbody>
			</table>,
		);
	});

	it("renders a category header for each found category", () => {
		const rows = [
			{ key: "a", category: "Stuff" },
			{ key: "b", category: "Things" },
			{ key: "c", category: "Stuff" },
			{ key: "d", category: "Things" },
			{ key: "e", category: "Things" },
			{ key: "f", category: "Stuff" },
		];
		const columnDefs = [{ fieldName: "key" }, { fieldName: "category" }];
		const rowOnClick = () => {};
		return expect(
			<Provider store={store}>
				<CategoryList
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
					rowOnClick={rowOnClick}
				/>
			</Provider>,
			"when mounted",
			"to satisfy",
			<table>
				<thead>
					<tr>
						<th>
							<Ignore />
						</th>
						<th>
							<Ignore />
						</th>
					</tr>
				</thead>
				<tbody>
					<CategoryRow>
						<CategoryHeader colSpan={2}>
							<CategoryIndicator />
							Stuff
						</CategoryHeader>
					</CategoryRow>
					<TableRow>
						<TableData>a</TableData>
						<TableData>Stuff</TableData>
					</TableRow>
					<TableRow>
						<TableData>c</TableData>
						<TableData>Stuff</TableData>
					</TableRow>
					<TableRow>
						<TableData>f</TableData>
						<TableData>Stuff</TableData>
					</TableRow>
					<CategoryRow>
						<CategoryHeader colSpan={2}>
							<CategoryIndicator />
							Things
						</CategoryHeader>
					</CategoryRow>
					<TableRow>
						<TableData>b</TableData>
						<TableData>Things</TableData>
					</TableRow>
					<TableRow>
						<TableData>d</TableData>
						<TableData>Things</TableData>
					</TableRow>
					<TableRow>
						<TableData>e</TableData>
						<TableData>Things</TableData>
					</TableRow>
				</tbody>
			</table>,
		);
	});

	it("renders a closed category", () => {
		const rows = [
			{ key: "a", category: "Stuff" },
			{ key: "b", category: "Things" },
			{ key: "c", category: "Stuff" },
			{ key: "d", category: "Things" },
			{ key: "e", category: "Things" },
			{ key: "f", category: "Stuff" },
		];
		const columnDefs = [{ fieldName: "key" }, { fieldName: "category" }];
		const rowOnClick = () => {};
		viewState = { closedCategories: ["Stuff"] };
		return expect(
			<Provider store={store}>
				<CategoryList
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
					rowOnClick={rowOnClick}
				/>
			</Provider>,
			"when mounted",
			"to satisfy",
			<table>
				<thead>
					<tr>
						<th>
							<Ignore />
						</th>
						<th>
							<Ignore />
						</th>
					</tr>
				</thead>
				<tbody>
					<CategoryRow>
						<CategoryHeader colSpan={2} closed>
							<CategoryIndicator closed />
							Stuff
						</CategoryHeader>
					</CategoryRow>
					<CategoryRow>
						<CategoryHeader colSpan={2}>
							<CategoryIndicator />
							Things
						</CategoryHeader>
					</CategoryRow>
					<TableRow>
						<TableData>b</TableData>
						<TableData>Things</TableData>
					</TableRow>
					<TableRow>
						<TableData>d</TableData>
						<TableData>Things</TableData>
					</TableRow>
					<TableRow>
						<TableData>e</TableData>
						<TableData>Things</TableData>
					</TableRow>
				</tbody>
			</table>,
		);
	});

	it("toggles a category closed", () => {
		const rows = [
			{ key: "a", category: "Stuff" },
			{ key: "b", category: "Things" },
			{ key: "c", category: "Stuff" },
			{ key: "d", category: "Things" },
			{ key: "e", category: "Things" },
			{ key: "f", category: "Stuff" },
		];
		const columnDefs = [{ fieldName: "key" }, { fieldName: "category" }];
		const rowOnClick = () => {};
		viewState = { closedCategories: [] };
		return expect(
			<Provider store={store}>
				<CategoryList
					name="test"
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
					rowOnClick={rowOnClick}
				/>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: '[data-test-id="category_Stuff"]' },
		).then(() =>
			expect(store.dispatch, "to have calls satisfying", [
				{
					args: [
						{
							type: "VIEW_STATE_SET_FIELD",
							payload: {
								name: "test",
								field: "closedCategories",
								value: ["Stuff"],
							},
						},
					],
				},
			]),
		);
	});

	it("toggles a category open", () => {
		const rows = [
			{ key: "a", category: "Stuff" },
			{ key: "b", category: "Things" },
			{ key: "c", category: "Stuff" },
			{ key: "d", category: "Things" },
			{ key: "e", category: "Things" },
			{ key: "f", category: "Stuff" },
		];
		const columnDefs = [{ fieldName: "a" }, { fieldName: "b" }];
		const rowOnClick = () => {};
		viewState = { closedCategories: ["Stuff"] };
		return expect(
			<Provider store={store}>
				<CategoryList
					name="test"
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
					rowOnClick={rowOnClick}
				/>
			</Provider>,
			"when mounted",
			"with event",
			{ type: "click", target: '[data-test-id="category_Stuff"]' },
		).then(() =>
			expect(store.dispatch, "to have calls satisfying", [
				{
					args: [
						{
							type: "VIEW_STATE_SET_FIELD",
							payload: { name: "test", field: "closedCategories", value: [] },
						},
					],
				},
			]),
		);
	});

	it("renders rows with data-based backgrounds", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{ fieldName: "key" }];
		const rowOnClick = () => {};
		const colorMap = {
			a: "#ff0000",
			b: "#00ff00",
			c: "#0000ff",
		};
		const colorGetter = row => colorMap[row.key];
		return expect(
			<Provider store={store}>
				<CategoryList
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
					rowOnClick={rowOnClick}
					rowBackgroundGetter={colorGetter}
				/>
			</Provider>,
			"when mounted",
			"to satisfy",
			<table>
				<thead>
					<tr>
						<th>
							<Ignore />
						</th>
					</tr>
				</thead>
				<tbody>
					<CategoryRow>
						<td>
							<Ignore />
							<Ignore />
						</td>
					</CategoryRow>
					<TableRow bgColor="#ff0000">
						<TableData>a</TableData>
					</TableRow>
					<TableRow bgColor="#00ff00">
						<TableData>b</TableData>
					</TableRow>
					<TableRow bgColor="#0000ff">
						<TableData>c</TableData>
					</TableRow>
				</tbody>
			</table>,
		);
	});

	it("renders rows with index-based backgrounds", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{ fieldName: "key" }];
		const rowOnClick = () => {};
		const colorGetter = (row, index) => (index % 2 ? "red" : "green");
		return expect(
			<Provider store={store}>
				<CategoryList
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
					rowOnClick={rowOnClick}
					rowBackgroundGetter={colorGetter}
				/>
			</Provider>,
			"when mounted",
			"to satisfy",
			<table>
				<thead>
					<tr>
						<th>
							<Ignore />
						</th>
					</tr>
				</thead>
				<tbody>
					<CategoryRow>
						<td>
							<Ignore />
							<Ignore />
						</td>
					</CategoryRow>
					<TableRow bgColor="green">
						<TableData>a</TableData>
					</TableRow>
					<TableRow bgColor="red">
						<TableData>b</TableData>
					</TableRow>
					<TableRow bgColor="green">
						<TableData>c</TableData>
					</TableRow>
				</tbody>
			</table>,
		);
	});

	it("renders a header based on column definitions", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [
			{ type: "select", fieldName: "select" },
			{ fieldName: "key", label: "Key" },
		];
		const selection = ["a"];
		return expect(
			<Provider store={store}>
				<CategoryList
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
					selection={selection}
				/>
			</Provider>,
			"when mounted",
			"to satisfy",
			<table>
				<thead>
					<HeadTableRow>
						<TableHeader select>
							<HeadBox>
								<Checkbox>
									<Ignore />
									<Ignore />
								</Checkbox>
							</HeadBox>
						</TableHeader>
						<TableHeader>
							<HeadBox>Key</HeadBox>
						</TableHeader>
					</HeadTableRow>
				</thead>
				<tbody>
					<tr>
						<td>
							<Ignore />
							<Ignore />
						</td>
					</tr>
					<tr>
						<td>
							<Ignore />
						</td>
						<td>
							<Ignore />
						</td>
					</tr>
					<tr>
						<td>
							<Ignore />
						</td>
						<td>
							<Ignore />
						</td>
					</tr>
					<tr>
						<td>
							<Ignore />
						</td>
						<td>
							<Ignore />
						</td>
					</tr>
				</tbody>
			</table>,
		);
	});

	it("renders a header when all rows are selected", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [
			{ type: "select", fieldName: "select" },
			{ fieldName: "key", label: "Key" },
		];
		viewState = {
			selection: ["a", "b", "c"],
		};
		return expect(
			<Provider store={store}>
				<CategoryList columnDefs={columnDefs} rows={rows} keyField={["key"]} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<table>
				<thead>
					<HeadTableRow>
						<TableHeader select>
							<HeadBox>
								<Checkbox>
									<Ignore />
									<Cover value={true} />
								</Checkbox>
							</HeadBox>
						</TableHeader>
						<TableHeader>
							<HeadBox>Key</HeadBox>
						</TableHeader>
					</HeadTableRow>
				</thead>
				<tbody>
					<tr>
						<td>
							<Ignore />
							<Ignore />
						</td>
					</tr>
					<tr>
						<td>
							<Ignore />
						</td>
						<td>
							<Ignore />
						</td>
					</tr>
					<tr>
						<td>
							<Ignore />
						</td>
						<td>
							<Ignore />
						</td>
					</tr>
					<tr>
						<td>
							<Ignore />
						</td>
						<td>
							<Ignore />
						</td>
					</tr>
				</tbody>
			</table>,
		);
	});
});
