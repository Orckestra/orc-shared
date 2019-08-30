import React from "react";
import sinon from "sinon";
import {
	CategoryList,
	CategoryRow,
	CategoryHeader,
	CategoryIndicator,
} from "./CategoryList";
import { Table, Placeholder } from "./List/List";
import Row from "./List/Row";
import HeadRow from "./List/HeadRow";

describe("CategoryList", () => {
	it("renders nothing if no columnDefs", () =>
		expect(<CategoryList rows={[{}]} />, "when rendered").then(render =>
			expect(render.getRenderOutput(), "to equal", null),
		));

	it("renders a table", () =>
		expect(<CategoryList columnDefs={[{}]} />, "to render as", <Table />));

	it("renders just a header", () =>
		expect(
			<CategoryList columnDefs={[{}, {}, {}]} />,
			"when rendered",
			"to contain with all children",
			<tbody />,
		));

	it("renders a placeholder if one given and no rows", () =>
		expect(
			<CategoryList
				height={121}
				columnDefs={[{}, {}, {}]}
				placeholder={<div />}
			/>,
			"when rendered",
			"to contain with all children",
			<tbody>
				<Placeholder width={3} height={80}>
					<div />
				</Placeholder>
			</tbody>,
		));

	it("renders a row for each row data object", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{}];
		const rowOnClick = () => {};
		return expect(
			<CategoryList
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				rowOnClick={rowOnClick}
			/>,
			"when rendered",
			"to contain",
			<tbody>
				<Row
					key="a"
					rowId="a"
					row={expect.it("to be", rows[0])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
					bgColor={undefined}
				/>
				<Row
					key="b"
					rowId="b"
					row={expect.it("to be", rows[1])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
				/>
				<Row
					key="c"
					rowId="c"
					row={expect.it("to be", rows[2])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
				/>
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
		const columnDefs = [{}, {}];
		const rowOnClick = () => {};
		return expect(
			<CategoryList
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				rowOnClick={rowOnClick}
			/>,
			"when rendered",
			"to contain",
			<tbody>
				<CategoryRow>
					<CategoryHeader colSpan={2}>
						<CategoryIndicator />
						Stuff
					</CategoryHeader>
				</CategoryRow>
				<Row
					key="a"
					rowId="a"
					row={expect.it("to be", rows[0])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
					bgColor={undefined}
				/>
				<Row
					key="c"
					rowId="c"
					row={expect.it("to be", rows[2])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
				/>
				<Row
					key="f"
					rowId="f"
					row={expect.it("to be", rows[5])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
				/>
				<CategoryRow>
					<CategoryHeader colSpan={2}>Things</CategoryHeader>
				</CategoryRow>
				<Row
					key="b"
					rowId="b"
					row={expect.it("to be", rows[1])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
					bgColor={undefined}
				/>
				<Row
					key="d"
					rowId="d"
					row={expect.it("to be", rows[3])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
				/>
				<Row
					key="e"
					rowId="e"
					row={expect.it("to be", rows[4])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
				/>
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
		const columnDefs = [{}, {}];
		const rowOnClick = () => {};
		return expect(
			<CategoryList
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				rowOnClick={rowOnClick}
				viewState={{ closedCategories: ["Stuff"] }}
			/>,
			"when rendered",
		).then(render =>
			expect(
				render,
				"not to contain",
				<tbody>
					<Row
						key="a"
						rowId="a"
						row={expect.it("to be", rows[0])}
						columnDefs={expect.it("to be", columnDefs)}
						onClick={rowOnClick}
						bgColor={undefined}
					/>
					<Row
						key="c"
						rowId="c"
						row={expect.it("to be", rows[2])}
						columnDefs={expect.it("to be", columnDefs)}
						onClick={rowOnClick}
					/>
					<Row
						key="f"
						rowId="f"
						row={expect.it("to be", rows[5])}
						columnDefs={expect.it("to be", columnDefs)}
						onClick={rowOnClick}
					/>
				</tbody>,
			).and(
				"to contain",
				<CategoryHeader colSpan={2}>
					<CategoryIndicator closed />
					Stuff
				</CategoryHeader>,
			),
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
		const columnDefs = [{}, {}];
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
			"when rendered",
			"with event click",
			"on",
			<CategoryHeader>Stuff</CategoryHeader>,
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
			"when rendered",
			"with event click",
			"on",
			<CategoryHeader>Stuff</CategoryHeader>,
		).then(() =>
			expect(updater, "to have calls satisfying", [
				{ args: ["closedCategories", []] },
			]),
		);
	});

	it("renders rows with data-based backgrounds", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{}];
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
			"when rendered",
			"to contain",
			<tbody>
				<Row
					key="a"
					rowId="a"
					row={expect.it("to be", rows[0])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
					bgColor="#ff0000"
				/>
				<Row
					key="b"
					rowId="b"
					row={expect.it("to be", rows[1])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
					bgColor="#00ff00"
				/>
				<Row
					key="c"
					rowId="c"
					row={expect.it("to be", rows[2])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
					bgColor="#0000ff"
				/>
			</tbody>,
		);
	});

	it("renders rows with index-based backgrounds", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{}];
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
			"when rendered",
			"to contain",
			<tbody>
				<Row
					key="a"
					rowId="a"
					row={expect.it("to be", rows[0])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
					bgColor="green"
				/>
				<Row
					key="b"
					rowId="b"
					row={expect.it("to be", rows[1])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
					bgColor="red"
				/>
				<Row
					key="c"
					rowId="c"
					row={expect.it("to be", rows[2])}
					columnDefs={expect.it("to be", columnDefs)}
					onClick={rowOnClick}
					bgColor="green"
				/>
			</tbody>,
		);
	});

	it("renders a header based on column definitions", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{}];
		const selection = ["a"];
		return expect(
			<CategoryList
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				selection={selection}
			/>,
			"when rendered",
			"to contain",
			<thead>
				<HeadRow
					columnDefs={columnDefs}
					rowIds={["a", "b", "c"]}
					allSelected={false}
				/>
			</thead>,
		);
	});

	it("renders a header when all rows are selected", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{}];
		const selection = ["a", "b", "c"];
		return expect(
			<CategoryList
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				selection={selection}
			/>,
			"when rendered",
			"to contain",
			<thead>
				<HeadRow allSelected={true} />
			</thead>,
		);
	});
});
