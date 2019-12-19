import React from "react";
import sinon from "sinon";
import Text from "../Text";
import Checkbox from "../Checkbox";
import HeadCell, {
	SortMark,
	UpMark,
	DownMark,
	MarkBox,
	HeadBox,
	TableHeader,
} from "./HeadCell";

describe("HeadCell", () => {
	it("renders a header cell with the column label", () => {
		const columnDef = {
			fieldName: "a",
			label: "Test column",
			width: 42,
		};
		return expect(
			<HeadCell columnDef={columnDef} />,
			"when mounted",
			"to satisfy",
			<TableHeader width={42}>
				<HeadBox>
					<Text message={"Test column"} />
				</HeadBox>
			</TableHeader>,
		);
	});

	it("renders a header cell with no label", () => {
		const columnDef = {
			fieldName: "a",
		};
		return expect(
			<HeadCell columnDef={columnDef} />,
			"when mounted",
			"to satisfy",
			<TableHeader>
				<HeadBox />
			</TableHeader>,
		);
	});

	it("renders a header cell for a select column", () => {
		const columnDef = {
			type: "select",
			onChange: sinon.spy().named("onChange"),
		};
		const rowIds = ["a", "b", "c"];
		return expect(
			<HeadCell columnDef={columnDef} rowIds={rowIds} />,
			"when mounted",
			"with event",
			{ type: "change", target: "input" },
			"to satisfy",
			<TableHeader select>
				<HeadBox>
					<Checkbox id="select_headRow" value={false} />
				</HeadBox>
			</TableHeader>,
		).then(() =>
			expect(columnDef.onChange, "to have calls satisfying", [
				{ args: [rowIds] },
			]),
		);
	});

	it("renders a header cell for a select column with all rows selected", () => {
		const columnDef = {
			type: "select",
			onChange: sinon.spy().named("onChange"),
		};
		const rowIds = ["a", "b", "c"];
		return expect(
			<HeadCell columnDef={columnDef} rowIds={rowIds} allSelected />,
			"when mounted",
			"with event",
			{ type: "change", target: "input" },
			"to satisfy",
			<TableHeader select>
				<HeadBox>
					<Checkbox id="select_headRow" value={true} />
				</HeadBox>
			</TableHeader>,
		).then(() =>
			expect(columnDef.onChange, "to have calls satisfying", [{ args: [[]] }]),
		);
	});

	it("renders a sortable header cell", () => {
		const columnDef = {
			fieldName: "a",
			label: { id: "test.label", defaultMessage: "Test column" },
			sort: () => {},
		};
		return expect(
			<HeadCell columnDef={columnDef} />,
			"when mounted",
			"to satisfy",
			<TableHeader onClick={columnDef.sort}>
				<HeadBox>
					Test column
					<SortMark />
				</HeadBox>
			</TableHeader>,
		);
	});

	it("renders a sortable header cell sorted ascending", () => {
		const columnDef = {
			fieldName: "a",
			label: { id: "test.label", defaultMessage: "Test column" },
			sort: () => {},
			sortDirection: "asc",
		};
		return expect(
			<HeadCell columnDef={columnDef} />,
			"when mounted",
			"to satisfy",
			<TableHeader>
				<HeadBox>
					Test column
					<SortMark direction="asc" />
				</HeadBox>
			</TableHeader>,
		);
	});

	it("renders a sortable header cell sorted descending", () => {
		const columnDef = {
			fieldName: "a",
			label: { id: "test.label", defaultMessage: "Test column" },
			sort: () => {},
			sortDirection: "desc",
		};
		return expect(
			<HeadCell columnDef={columnDef} />,
			"when mounted",
			"to satisfy",
			<TableHeader>
				<HeadBox>
					Test column
					<SortMark direction="desc" />
				</HeadBox>
			</TableHeader>,
		);
	});
});

// Switch components as <tr> warns when outside a table.
const SwitchedTableHeader = TableHeader.withComponent("div");

describe("TableHeader", () => {
	it("sets a width if selection column", () =>
		expect(
			<SwitchedTableHeader select />,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"width: 56px;",
		));

	it("sets a width if told to", () =>
		expect(
			<SwitchedTableHeader width={55} />,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"width: 55%;",
		));
});

describe("SortMark", () => {
	it("renders a downwards arrow when ascending", () =>
		expect(
			<SortMark direction="asc" />,
			"when mounted",
			"to satisfy",
			<UpMark />,
		));

	it("renders an upwards arrow when descending", () =>
		expect(
			<SortMark direction="desc" />,
			"when mounted",
			"to satisfy",
			<DownMark />,
		));

	it("renders bidirectional arrows when no direction set", () =>
		expect(
			<SortMark />,
			"when mounted",
			"to satisfy",
			<MarkBox>
				<UpMark />
				<DownMark />
			</MarkBox>,
		));
});
