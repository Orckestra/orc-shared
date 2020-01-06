import React from "react";
import { IntlProvider } from "react-intl";
import sinon from "sinon";
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
			<table>
				<thead>
					<tr>
						<HeadCell columnDef={columnDef} />
					</tr>
				</thead>
			</table>,
			"when mounted",
			"to satisfy",
			<table>
				<thead>
					<tr>
						<TableHeader width={42}>
							<HeadBox>Test column</HeadBox>
						</TableHeader>
					</tr>
				</thead>
			</table>,
		);
	});

	it("renders a header cell with no label", () => {
		const columnDef = {
			fieldName: "a",
		};
		return expect(
			<table>
				<thead>
					<tr>
						<HeadCell columnDef={columnDef} />
					</tr>
				</thead>
			</table>,
			"when mounted",
			"to satisfy",
			<table>
				<thead>
					<tr>
						<TableHeader>
							<HeadBox />
						</TableHeader>
					</tr>
				</thead>
			</table>,
		);
	});

	it("renders a header cell for a select column", () => {
		const columnDef = {
			type: "select",
			onChange: sinon.spy().named("onChange"),
		};
		const rowIds = ["a", "b", "c"];
		return expect(
			<table>
				<thead>
					<tr>
						<HeadCell columnDef={columnDef} rowIds={rowIds} />
					</tr>
				</thead>
			</table>,
			"when mounted",
			"with event",
			{ type: "change", target: "input" },
			"to satisfy",
			<table>
				<thead>
					<tr>
						<TableHeader select>
							<HeadBox>
								<Checkbox id="select_headRow" value={false} />
							</HeadBox>
						</TableHeader>
					</tr>
				</thead>
			</table>,
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
			<table>
				<thead>
					<tr>
						<HeadCell columnDef={columnDef} rowIds={rowIds} allSelected />
					</tr>
				</thead>
			</table>,
			"when mounted",
			"with event",
			{ type: "change", target: "input" },
			"to satisfy",
			<table>
				<thead>
					<tr>
						<TableHeader select>
							<HeadBox>
								<Checkbox id="select_headRow" value={true} />
							</HeadBox>
						</TableHeader>
					</tr>
				</thead>
			</table>,
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
			<IntlProvider locale="en">
				<table>
					<thead>
						<tr>
							<HeadCell columnDef={columnDef} />
						</tr>
					</thead>
				</table>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<table>
				<thead>
					<tr>
						<TableHeader onClick={columnDef.sort}>
							<HeadBox>
								Test column
								<SortMark />
							</HeadBox>
						</TableHeader>
					</tr>
				</thead>
			</table>,
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
			<IntlProvider locale="en">
				<table>
					<thead>
						<tr>
							<HeadCell columnDef={columnDef} />
						</tr>
					</thead>
				</table>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<table>
				<thead>
					<tr>
						<TableHeader>
							<HeadBox>
								Test column
								<SortMark direction="asc" />
							</HeadBox>
						</TableHeader>
					</tr>
				</thead>
			</table>,
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
			<IntlProvider locale="en">
				<table>
					<thead>
						<tr>
							<HeadCell columnDef={columnDef} />
						</tr>
					</thead>
				</table>
			</IntlProvider>,
			"when mounted",
			"to satisfy",
			<table>
				<thead>
					<tr>
						<TableHeader>
							<HeadBox>
								Test column
								<SortMark direction="desc" />
							</HeadBox>
						</TableHeader>
					</tr>
				</thead>
			</table>,
		);
	});
});

describe("TableHeader", () => {
	// Switch components as <tr> warns when outside a table.
	it("sets a width if selection column", () =>
		expect(
			<TableHeader as="div" select />,
			"when mounted",
			"to have style rules satisfying",
			"to contain",
			"width: 56px;",
		));

	it("sets a width if told to", () =>
		expect(
			<TableHeader as="div" width={55} />,
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
