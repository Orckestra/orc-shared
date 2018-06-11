import React from "react";
import { List, Table } from "./index";
import Row from "./Row";
import HeadRow from "./HeadRow";

describe("List", () => {
	it("renders nothing if no columnDefs", () =>
		expect(<List rows={[{}]} />, "when rendered").then(render =>
			expect(render.getRenderOutput(), "to equal", null),
		));

	it("renders a table", () =>
		expect(<List columnDefs={[{}]} />, "to render as", <Table />));

	it("renders a row for each row data object", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{}];
		const rowOnClick = () => {};
		return expect(
			<List
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

	it("renders a header based on column definitions", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{}];
		const selection = ["a"];
		return expect(
			<List
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
			<List
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
