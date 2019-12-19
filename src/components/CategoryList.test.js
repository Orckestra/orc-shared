import React from "react";
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
	it("renders nothing if no columnDefs", () =>
		expect(
			<div>
				<CategoryList rows={[{}]} />
			</div>,
			"when mounted",
			"to satisfy",
			<div />,
		));

	it("renders a table", () =>
		expect(
			<CategoryList columnDefs={[{}]} />,
			"when mounted",
			"to satisfy",
			<Table>
				<thead>
					<Ignore />
				</thead>
				<tbody></tbody>
			</Table>,
		));

	it("renders just a header", () =>
		expect(
			<CategoryList columnDefs={[{}, {}, {}]} />,
			"when mounted",
			"to contain",
			<tbody />,
		));

	it("renders a placeholder if one given and no rows", () =>
		expect(
			<CategoryList
				height={121}
				columnDefs={[{}, {}, {}]}
				placeholder={<div />}
			/>,
			"when mounted",
			"to contain",
			<tbody>
				<Placeholder width={3} height={80}>
					<div />
				</Placeholder>
			</tbody>,
		));

	it("renders a category row and a row for each row data object", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{ fieldName: "key" }];
		const rowOnClick = () => {};
		return expect(
			<CategoryList
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				rowOnClick={rowOnClick}
			/>,
			"when mounted",
			"to contain",
			<tbody>
				<CategoryRow>
					<Ignore />
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
			</tbody>,
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
			<CategoryList
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				rowOnClick={rowOnClick}
			/>,
			"when mounted",
			"to contain",
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
			</tbody>,
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
		return expect(
			<CategoryList
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				rowOnClick={rowOnClick}
				viewState={{ closedCategories: ["Stuff"] }}
			/>,
			"when mounted",
			"to contain",
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
			</tbody>,
		);
	});

	it("toggles a category closed", () => {
		const updater = sinon.spy().named("updateViewState");
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
			<CategoryList
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				rowOnClick={rowOnClick}
				viewState={{ closedCategories: [] }}
				updateViewState={updater}
			/>,
			"when mounted",
			"with event",
			{ type: "click", target: '[data-test-id="category_Stuff"]' },
		).then(() =>
			expect(updater, "to have calls satisfying", [
				{ args: ["closedCategories", ["Stuff"]] },
			]),
		);
	});

	it("toggles a category open", () => {
		const updater = sinon.spy().named("updateViewState");
		const rows = [
			{ key: "a", category: "Stuff" },
			{ key: "b", category: "Things" },
			{ key: "c", category: "Stuff" },
			{ key: "d", category: "Things" },
			{ key: "e", category: "Things" },
			{ key: "f", category: "Stuff" },
		];
		const columnDefs = [{}, {}];
		const rowOnClick = () => {};
		return expect(
			<CategoryList
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				rowOnClick={rowOnClick}
				viewState={{ closedCategories: ["Stuff"] }}
				updateViewState={updater}
			/>,
			"when mounted",
			"with event",
			{ type: "click", target: '[data-test-id="category_Stuff"]' },
		).then(() =>
			expect(updater, "to have calls satisfying", [
				{ args: ["closedCategories", []] },
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
			<CategoryList
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				rowOnClick={rowOnClick}
				rowBackgroundGetter={colorGetter}
			/>,
			"when mounted",
			"to contain",
			<tbody>
				<CategoryRow>
					<Ignore />
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
			</tbody>,
		);
	});

	it("renders rows with index-based backgrounds", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{ fieldName: "key" }];
		const rowOnClick = () => {};
		const colorGetter = (row, index) => (index % 2 ? "red" : "green");
		return expect(
			<CategoryList
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				rowOnClick={rowOnClick}
				rowBackgroundGetter={colorGetter}
			/>,
			"when mounted",
			"to contain",
			<tbody>
				<CategoryRow>
					<Ignore />
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
			</tbody>,
		);
	});

	it("renders a header based on column definitions", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{ type: "select" }, { fieldName: "key", label: "Key" }];
		const selection = ["a"];
		return expect(
			<CategoryList
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				selection={selection}
			/>,
			"when mounted",
			"to contain",
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
			</thead>,
		);
	});

	it("renders a header when all rows are selected", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{ type: "select" }, { fieldName: "key", label: "Key" }];
		const selection = ["a", "b", "c"];
		return expect(
			<CategoryList
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				selection={selection}
			/>,
			"when mounted",
			"to contain",
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
			</thead>,
		);
	});
});
