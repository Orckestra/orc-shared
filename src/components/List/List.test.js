import React from "react";
import { Ignore } from "unexpected-reaction";
import {
	List,
	Table,
	Placeholder,
	PlaceholderCell,
	PlaceholderBox,
} from "./List";
import { TableRow } from "./Row";
import { HeadTableRow } from "./HeadRow";
import { TableHeader, HeadBox } from "./HeadCell";

const generateRows = count => {
	const rows = [];
	for (let i = 0; i < count; i += 1) {
		rows.push({ key: (i + 1).toString() });
	}
	return rows;
};

describe("List", () => {
	it("renders nothing if no columnDefs", () =>
		expect(<List rows={[{}]} />, "to satisfy", null));

	it("renders a table", () =>
		expect(
			<List columnDefs={[{}]} />,
			"when mounted",
			"to satisfy",
			<Table>
				<thead>
					<HeadTableRow>
						<TableHeader>
							<HeadBox></HeadBox>
						</TableHeader>
					</HeadTableRow>
				</thead>
				<tbody></tbody>
			</Table>,
		));

	it("renders just a header", () =>
		expect(
			<List columnDefs={[{}, {}, {}]} />,
			"when mounted",
			"to contain",
			<tbody />,
		));

	it("renders a placeholder if one given and no rows", () =>
		expect(
			<List height={121} columnDefs={[{}, {}, {}]} placeholder={<div />} />,
			"when mounted",
			"to contain",
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
			<List
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				rowOnClick={rowOnClick}
			/>,
			"when mounted",
			"to contain",
			<tbody>
				<TableRow>
					<Ignore />
				</TableRow>
				<TableRow>
					<Ignore />
				</TableRow>
				<TableRow>
					<Ignore />
				</TableRow>
			</tbody>,
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
			<List
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				rowOnClick={rowOnClick}
				rowBackgroundGetter={colorGetter}
			/>,
			"when mounted",
			"to contain",
			<tbody>
				<TableRow bgColor="#ff0000">
					<Ignore />
				</TableRow>
				<TableRow bgColor="#00ff00">
					<Ignore />
				</TableRow>
				<TableRow bgColor="#0000ff">
					<Ignore />
				</TableRow>
			</tbody>,
		);
	});

	it("renders rows with index-based backgrounds", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{}];
		const rowOnClick = () => {};
		const colorGetter = (row, index) => (index % 2 ? "red" : "green");
		return expect(
			<List
				columnDefs={columnDefs}
				rows={rows}
				keyField={["key"]}
				rowOnClick={rowOnClick}
				rowBackgroundGetter={colorGetter}
			/>,
			"when mounted",
			"to contain",
			<tbody>
				<TableRow bgColor="green">
					<Ignore />
				</TableRow>
				<TableRow bgColor="red">
					<Ignore />
				</TableRow>
				<TableRow bgColor="green">
					<Ignore />
				</TableRow>
			</tbody>,
		);
	});

	it("renders a header based on column definitions", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{ type: "select" }, { fieldName: "key", label: "Key" }];
		const selection = ["a"];
		return expect(
			<List
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
							<label>
								<input type="checkbox" value={false} />
								<label></label>
							</label>
						</HeadBox>
					</TableHeader>
					<TableHeader>
						<HeadBox>
							<span>Key</span>
						</HeadBox>
					</TableHeader>
				</HeadTableRow>
			</thead>,
		);
	});

	it("renders a header when all rows are selected", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{ type: "select" }];
		const selection = ["a", "b", "c"];
		return expect(
			<List
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
							<label>
								<input type="checkbox" value={true} />
								<label></label>
							</label>
						</HeadBox>
					</TableHeader>
				</HeadTableRow>
			</thead>,
		);
	});

	describe("virtual scrolling", () => {
		let rows, columnDefs, colorGetter;
		beforeEach(() => {
			rows = generateRows(15);
			columnDefs = [{}];
			colorGetter = (row, index) => `rgb(${row.key},${row.key},${row.key})`;
		});

		it("renders a header with all rows identified when virtual", () => {
			const rows = generateRows(15);
			const columnDefs = [{ type: "select" }];
			const selection = [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12",
				"13",
				"14",
				"15",
			];
			return expect(
				<List
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
					selection={selection}
					virtual
					scrollTop={350}
					height={150}
					scrollBuffer={1}
				/>,
				"when mounted",
				"to contain",
				<thead>
					<HeadTableRow>
						<TableHeader select>
							<HeadBox>
								<label>
									<input type="checkbox" value={true} />
									<label></label>
								</label>
							</HeadBox>
						</TableHeader>
					</HeadTableRow>
				</thead>,
			);
		});

		it("renders at top", () =>
			expect(
				<List
					virtual
					scrollTop={0}
					height={150}
					scrollBuffer={1}
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
					rowBackgroundGetter={colorGetter}
				/>,
				"when mounted",
				"to contain",
				<tbody>
					<TableRow bgColor="rgb(1,1,1)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(2,2,2)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(3,3,3)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(4,4,4)">
						<Ignore />
					</TableRow>
					<tr style={{ height: 561 }} />
				</tbody>,
			));

		it("renders near top", () =>
			expect(
				<List
					virtual
					scrollTop={150}
					height={150}
					scrollBuffer={1}
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
					rowBackgroundGetter={colorGetter}
				/>,
				"when mounted",
				"to contain",
				<tbody>
					<tr style={{ height: 51 }} />
					<TableRow bgColor="rgb(2,2,2)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(3,3,3)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(4,4,4)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(5,5,5)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(6,6,6)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(7,7,7)">
						<Ignore />
					</TableRow>
					<tr style={{ height: 408 }} />
				</tbody>,
			));

		it("renders in the middle", () =>
			expect(
				<List
					virtual
					scrollTop={350}
					height={150}
					scrollBuffer={1}
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
					rowBackgroundGetter={colorGetter}
				/>,
				"when mounted",
				"to contain",
				<tbody>
					<tr style={{ height: 255 }} />
					<TableRow bgColor="rgb(6,6,6)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(7,7,7)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(8,8,8)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(9,9,9)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(10,10,10)">
						<Ignore />
					</TableRow>
					<tr style={{ height: 255 }} />
				</tbody>,
			));

		it("renders near end", () =>
			expect(
				<List
					virtual
					scrollTop={550}
					height={150}
					scrollBuffer={1}
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
					rowBackgroundGetter={colorGetter}
				/>,
				"when mounted",
				"to contain",
				<tbody>
					<tr style={{ height: 408 }} />
					<TableRow bgColor="rgb(9,9,9)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(10,10,10)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(11,11,11)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(12,12,12)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(13,13,13)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(14,14,14)">
						<Ignore />
					</TableRow>
					<tr style={{ height: 51 }} />
				</tbody>,
			));

		it("renders at end", () =>
			expect(
				<List
					virtual
					scrollTop={656}
					height={150}
					scrollBuffer={1}
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
					rowBackgroundGetter={colorGetter}
				/>,
				"when mounted",
				"to contain",
				<tbody>
					<tr style={{ height: 561 }} />
					<TableRow bgColor="rgb(12,12,12)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(13,13,13)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(14,14,14)">
						<Ignore />
					</TableRow>
					<TableRow bgColor="rgb(15,15,15)">
						<Ignore />
					</TableRow>
				</tbody>,
			));
	});
});

describe("Placeholder", () => {
	it("renders wrappers to center the placeholder in the table", () =>
		expect(
			<Placeholder width={4} height={450}>
				<div id="child" />
			</Placeholder>,
			"when mounted",
			"to satisfy",
			<tr>
				<td colSpan={4} style={{ padding: 0 }}>
					<PlaceholderCell cssHeight={450}>
						<PlaceholderBox>
							<div id="child" />
						</PlaceholderBox>
					</PlaceholderCell>
				</td>
			</tr>,
		));
});
