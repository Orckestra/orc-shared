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
			"to render as",
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
			"to render with all children as",
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
			"to render as",
			<TableHeader>
				<HeadBox>
					<Checkbox value={false} onChange={expect.it("when called")} />
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
			"to render as",
			<TableHeader>
				<HeadBox>
					<Checkbox value={true} onChange={expect.it("when called")} />
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
			"to render as",
			<TableHeader onClick={columnDef.sort}>
				<Text message={{ id: "test.label", defaultMessage: "Test column" }} />
				<SortMark />
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
			"to render as",
			<TableHeader>
				<Text message={{ id: "test.label", defaultMessage: "Test column" }} />
				<SortMark direction="asc" />
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
			"to render as",
			<TableHeader>
				<Text message={{ id: "test.label", defaultMessage: "Test column" }} />
				<SortMark direction="desc" />
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
			"to render style rules",
			"to contain",
			"width: 56px;",
		));

	it("sets a width if told to", () =>
		expect(
			<SwitchedTableHeader width={"550px"} />,
			"to render style rules",
			"to contain",
			"width: 550px;",
		));
});

describe("SortMark", () => {
	it("renders a downwards arrow when ascending", () =>
		expect(<SortMark direction="asc" />, "to render as", <UpMark />));

	it("renders an upwards arrow when descending", () =>
		expect(<SortMark direction="desc" />, "to render as", <DownMark />));

	it("renders bidirectional arrows when no direction set", () =>
		expect(
			<SortMark />,
			"to render as",
			<MarkBox>
				<UpMark />
				<DownMark />
			</MarkBox>,
		));
});
