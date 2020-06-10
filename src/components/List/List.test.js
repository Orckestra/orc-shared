import React from "react";
import { Provider } from "react-redux";
import { Ignore } from "unexpected-reaction";
import { List, Table, Placeholder, PlaceholderCell, PlaceholderBox } from "./List";
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
	let store, selection;
	beforeEach(() => {
		store = {
			subscribe: () => {},
			dispatch: () => {},
			getState: () => ({ getIn: () => ({ selection }) }),
		};
	});

	it("renders nothing if no columnDefs", () =>
		expect(
			<Provider store={store}>
				<List rows={[{}]} />
			</Provider>,
			"to satisfy",
			null,
		));

	it("renders a table with no rows", () =>
		expect(
			<Provider store={store}>
				<List columnDefs={[{ fieldName: "a" }]} />
			</Provider>,
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

	it("renders a placeholder if one given and no rows", () =>
		expect(
			<Provider store={store}>
				<List
					height={121}
					columnDefs={[{ fieldName: "a" }, { fieldName: "b" }, { fieldName: "c" }]}
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

	it("renders a row for each row data object", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{ fieldName: "a" }];
		return expect(
			<Provider store={store}>
				<List columnDefs={columnDefs} rows={rows} keyField={["key"]} />
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
					<TableRow>
						<td />
					</TableRow>
					<TableRow>
						<td />
					</TableRow>
					<TableRow>
						<td />
					</TableRow>
				</tbody>
			</table>,
		);
	});

	it("renders rows with click handlers", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{ fieldName: "a" }];
		return expect(
			<Provider store={store}>
				<List
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
					rowOnClick={() => {}}
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
					<TableRow onClick={() => {}}>
						<td />
					</TableRow>
					<TableRow onClick={() => {}}>
						<td />
					</TableRow>
					<TableRow onClick={() => {}}>
						<td />
					</TableRow>
				</tbody>
			</table>,
		);
	});

	it("renders rows with data-based backgrounds", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{ fieldName: "a" }];
		const colorMap = {
			a: "#ff0000",
			b: "#00ff00",
			c: "#0000ff",
		};
		const colorGetter = row => colorMap[row.key];
		return expect(
			<Provider store={store}>
				<List
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
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
					<TableRow bgColor="#ff0000">
						<td />
					</TableRow>
					<TableRow bgColor="#00ff00">
						<td />
					</TableRow>
					<TableRow bgColor="#0000ff">
						<td />
					</TableRow>
				</tbody>
			</table>,
		);
	});

	it("renders rows with index-based backgrounds", () => {
		const rows = [{ key: "a" }, { key: "b" }, { key: "c" }];
		const columnDefs = [{ fieldName: "a" }];
		const colorGetter = (row, index) => (index % 2 ? "red" : "green");
		return expect(
			<Provider store={store}>
				<List
					columnDefs={columnDefs}
					rows={rows}
					keyField={["key"]}
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
					<TableRow bgColor="green">
						<td />
					</TableRow>
					<TableRow bgColor="red">
						<td />
					</TableRow>
					<TableRow bgColor="green">
						<td />
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
				<List
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
								<label>
									<input type="checkbox" value={false} />
									<label></label>
								</label>
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
		const columnDefs = [{ type: "select", fieldName: "select" }];
		selection = ["a", "b", "c"];
		return expect(
			<Provider store={store}>
				<List columnDefs={columnDefs} rows={rows} keyField={["key"]} />
			</Provider>,
			"when mounted",
			"to satisfy",
			<table>
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
				</thead>
				<tbody>
					<tr>
						<td>
							<Ignore />
						</td>
					</tr>
					<tr>
						<td>
							<Ignore />
						</td>
					</tr>
					<tr>
						<td>
							<Ignore />
						</td>
					</tr>
				</tbody>
			</table>,
		);
	});

	describe("virtual scrolling", () => {
		let rows, columnDefs, colorGetter;
		beforeEach(() => {
			rows = generateRows(15);
			columnDefs = [{ fieldName: "key", label: "Key" }];
			colorGetter = (row, index) => `rgb(${row.key},${row.key},${row.key})`;
		});

		it("renders a header with all rows identified when virtual", () => {
			const rows = generateRows(15);
			const columnDefs = [{ type: "select", fieldName: "select" }];
			selection = [
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
				<Provider store={store}>
					<List
						columnDefs={columnDefs}
						rows={rows}
						keyField={["key"]}
						selection={selection}
						virtual
						scrollTop={350}
						height={150}
						scrollBuffer={1}
					/>
				</Provider>,
				"when mounted",
				"to satisfy",
				<table>
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
					</thead>
					<tbody>
						<tr />
						<tr>
							<td>
								<Ignore />
							</td>
						</tr>
						<tr>
							<td>
								<Ignore />
							</td>
						</tr>
						<tr>
							<td>
								<Ignore />
							</td>
						</tr>
						<tr>
							<td>
								<Ignore />
							</td>
						</tr>
						<tr>
							<td>
								<Ignore />
							</td>
						</tr>
						<tr />
					</tbody>
				</table>,
			);
		});

		it("renders at top", () =>
			expect(
				<Provider store={store}>
					<List
						virtual
						scrollTop={0}
						height={150}
						scrollBuffer={1}
						columnDefs={columnDefs}
						rows={rows}
						keyField={["key"]}
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
						<TableRow bgColor="rgb(1,1,1)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(2,2,2)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(3,3,3)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(4,4,4)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<tr style={{ height: 561 }} />
					</tbody>
				</table>,
			));

		it("renders near top", () =>
			expect(
				<Provider store={store}>
					<List
						virtual
						scrollTop={150}
						height={150}
						scrollBuffer={1}
						columnDefs={columnDefs}
						rows={rows}
						keyField={["key"]}
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
						<tr style={{ height: 51 }} />
						<TableRow bgColor="rgb(2,2,2)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(3,3,3)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(4,4,4)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(5,5,5)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(6,6,6)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(7,7,7)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<tr style={{ height: 408 }} />
					</tbody>
				</table>,
			));

		it("renders in the middle", () =>
			expect(
				<Provider store={store}>
					<List
						virtual
						scrollTop={350}
						height={150}
						scrollBuffer={1}
						columnDefs={columnDefs}
						rows={rows}
						keyField={["key"]}
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
						<tr style={{ height: 255 }} />
						<TableRow bgColor="rgb(6,6,6)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(7,7,7)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(8,8,8)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(9,9,9)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(10,10,10)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<tr style={{ height: 255 }} />
					</tbody>
				</table>,
			));

		it("renders near end", () =>
			expect(
				<Provider store={store}>
					<List
						virtual
						scrollTop={550}
						height={150}
						scrollBuffer={1}
						columnDefs={columnDefs}
						rows={rows}
						keyField={["key"]}
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
						<tr style={{ height: 408 }} />
						<TableRow bgColor="rgb(9,9,9)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(10,10,10)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(11,11,11)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(12,12,12)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(13,13,13)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(14,14,14)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<tr style={{ height: 51 }} />
					</tbody>
				</table>,
			));

		it("renders at end", () =>
			expect(
				<Provider store={store}>
					<List
						virtual
						scrollTop={656}
						height={150}
						scrollBuffer={1}
						columnDefs={columnDefs}
						rows={rows}
						keyField={["key"]}
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
						<tr style={{ height: 561 }} />
						<TableRow bgColor="rgb(12,12,12)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(13,13,13)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(14,14,14)">
							<td>
								<Ignore />
							</td>
						</TableRow>
						<TableRow bgColor="rgb(15,15,15)">
							<td>
								<Ignore />
							</td>
						</TableRow>
					</tbody>
				</table>,
			));
	});
});

describe("Placeholder", () => {
	it("renders wrappers to center the placeholder in the table", () =>
		expect(
			<table>
				<tbody>
					<Placeholder width={4} height={450}>
						<div id="child" />
					</Placeholder>
				</tbody>
			</table>,
			"when mounted",
			"to satisfy",
			<table>
				<tbody>
					<tr>
						<td colSpan={4} style={{ padding: 0 }}>
							<PlaceholderCell cssHeight={450}>
								<PlaceholderBox>
									<div id="child" />
								</PlaceholderBox>
							</PlaceholderCell>
						</td>
					</tr>
				</tbody>
			</table>,
		));
});
