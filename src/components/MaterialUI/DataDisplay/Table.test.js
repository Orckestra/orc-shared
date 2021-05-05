import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import sinon from "sinon";
import { mount } from "enzyme";
import Table, { MemoTableBody, MemoTableRow, useStyles } from "./Table";
import TableMui from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { buildHeaderAndRowFromConfig } from "./tableHelpers";
import Placeholder from "../../Placeholder";
import TableInfoBar from "./PredefinedElements/TableInfoBar";
import { ignoreConsoleError } from "../../../utils/testUtils";
import TableProps from "./TableProps";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "./../../../utils/testUtils";
import TableContainer from "@material-ui/core/TableContainer";
import ResizeDetector from "react-resize-detector";
import CheckboxMui from "../Inputs/Checkbox";
import { cloneDeep } from "lodash";
import TooltippedTypography from "./TooltippedElements/TooltippedTypography";

const TestComp = ({ classToTest, styleProps }) => {
	const classes = useStyles({ ...styleProps });

	return <div className={classes[classToTest]} />;
};

const MuiThemeContainer = ({ classToTest, styleProps }) => {
	return (
		<MuiThemeProvider theme={createMuiTheme()}>
			<TestComp classToTest={classToTest} styleProps={styleProps} />
		</MuiThemeProvider>
	);
};

describe("useStyles", () => {
	it("build tableHeader styles as expected", () => {
		expect(
			<MuiThemeContainer classToTest="tableHeader" />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "border-top: 1px solid #CCC;")
				.and("to contain", "border-bottom: 1px solid #CCC")
				.and("to contain", "display: table-header-group"),
		);

		expect(
			<MuiThemeContainer classToTest="tableHeader" styleProps={{ withoutTopBorder: true, stickyHeader: true }} />,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "border-top: none")
				.and("to contain", "border-bottom: none")
				.and("to contain", "display: none"),
		);
	});

	it("build stickyHeaderHead styles as expected", () => {
		expect(
			<MuiThemeContainer classToTest="stickyHeaderHead" />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "border-top: 1px solid #CCC"),
		);

		expect(
			<MuiThemeContainer classToTest="stickyHeaderHead" styleProps={{ withoutTopBorder: true }} />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "border-top: none"),
		);
	});

	it("build stickyHeaderTable styles as expected", () => {
		expect(
			<MuiThemeContainer classToTest="stickyHeaderTable" />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "width: calc(100% - 0px)"),
		);

		expect(
			<MuiThemeContainer classToTest="stickyHeaderTable" styleProps={{ scrolled: 21 }} />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "width: calc(100% - 21px)"),
		);
	});

	it("build stickyHeaderTableScroll styles as expected", () => {
		expect(
			<MuiThemeContainer classToTest="stickyHeaderTableScroll" />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "width: 0px").and("to contain", "display: none"),
		);

		expect(
			<MuiThemeContainer classToTest="stickyHeaderTableScroll" styleProps={{ scrolled: 13 }} />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "width: 13px").and("to contain", "display: block"),
		);
	});

	it("build stickyHeaderTableScroll styles as expected", () => {
		expect(
			<MuiThemeContainer classToTest="stickyHeaderTableScroll" />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "width: 0px").and("to contain", "display: none"),
		);

		expect(
			<MuiThemeContainer classToTest="stickyHeaderTableScroll" styleProps={{ scrolled: 13 }} />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "width: 13px").and("to contain", "display: block"),
		);
	});

	it("build tableRow styles as expected", () => {
		expect(
			<MuiThemeContainer classToTest="tableRow" />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "cursor: default").and("to contain", ":hover {background-color: #FFF;}"),
		);

		expect(
			<MuiThemeContainer classToTest="tableRow" styleProps={{ onRowClick: () => {} }} />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "cursor: pointer").and("to contain", ":hover {background-color: #F7F7F7;}"),
		);
	});
});

describe("Memoize components", () => {
	it("Updates table row props", () => {
		ignoreConsoleError(() => {
			const mountedComponent = mount(<MemoTableRow selected={true} />);

			expect(mountedComponent.prop("selected"), "to be truthy");

			mountedComponent.setProps({ selected: false });

			expect(mountedComponent.prop("selected"), "to be falsy");
		});
	});

	it("Updates table row props if context is different", () => {
		ignoreConsoleError(() => {
			const mountedComponent = mount(<MemoTableRow context="Something" />);

			expect(mountedComponent.prop("context"), "to equal", "Something");

			mountedComponent.setProps({ context: "Another" });

			expect(mountedComponent.prop("context"), "to equal", "Another");
		});
	});

	it("Updates table row props when row in editing mode", () => {
		ignoreConsoleError(() => {
			const mountedComponent = mount(<MemoTableRow isEditingMode={true} somethingElse={"test 1"} />);

			expect(mountedComponent.prop("isEditingMode"), "to equal", true);
			expect(mountedComponent.prop("somethingElse"), "to equal", "test 1");

			mountedComponent.setProps({ isEditingMode: true, somethingElse: "test changed" });

			expect(mountedComponent.prop("isEditingMode"), "to equal", true);
			expect(mountedComponent.prop("somethingElse"), "to equal", "test changed");
		});
	});

	it("Updates table row props if context is different and deepPropsComparation is set", () => {
		ignoreConsoleError(() => {
			const mountedComponent = mount(<MemoTableRow deepPropsComparation={true} dataRows={{}} context="Something" />);
			const mountedComponent1 = mount(<MemoTableRow deepPropsComparation={true} dataRows={{}} context="Something" />);

			expect(mountedComponent.prop("context"), "to equal", "Something");

			mountedComponent.setProps({ context: "Another" });

			mountedComponent1.setProps({ context: "Something" });

			expect(mountedComponent.prop("context"), "to equal", "Another");

			expect(mountedComponent1.prop("context"), "to equal", "Something");
		});
	});

	it("Updates table body props", () => {
		ignoreConsoleError(() => {
			const mountedComponent = mount(<MemoTableBody selectedNumber={4} rows={[]} />);

			expect(mountedComponent.prop("selectedNumber"), "to equal", 4);
			expect(mountedComponent.prop("rows").length, "to equal", 0);

			mountedComponent.setProps({ selectedNumber: 5, rows: [{ key: "1", columns: [] }] });

			expect(mountedComponent.prop("selectedNumber"), "to equal", 5);
			expect(mountedComponent.prop("rows").length, "to equal", 1);
		});
	});

	it("Updates table props when rows changes", () => {
		const mountedComponent = mount(<Table headers={[]} rows={[]} />);

		expect(mountedComponent.prop("rows").length, "to equal", 0);

		mountedComponent.setProps({ rows: [{ key: "1", columns: [] }] });

		expect(mountedComponent.prop("rows").length, "to equal", 1);
	});

	it("Updates table props when sortField in headers change", () => {
		const elements = [
			{ id: "1", column1: "test11", column2: "test12" },
			{ id: "2", column1: "test21", column2: "test22" },
		];

		const initialColumnDefs = [
			{
				fieldName: "column1",
				label: "column1",
				sortOptions: {
					sortField: true,
					direction: "Ascending",
					propertyName: "column1",
				},
				sortCallback: jest.fn(),
			},
			{
				fieldName: "column2",
				label: "column2",
				sortOptions: {
					sortField: false,
					direction: "Ascending",
					propertyName: "column2",
				},
				sortCallback: jest.fn(),
			},
		];

		let { headers, rows } = buildHeaderAndRowFromConfig(initialColumnDefs, elements);

		const updatedColumnHeaders = cloneDeep(headers);

		const mountedComponent = mount(<Table headers={headers} rows={rows} />);

		let mountedFirstHeaderSortOptions = mountedComponent.prop("headers")[0].cellElement.props.columnDefinition
			.sortOptions;
		let mountedSecondHeaderSortOptions = mountedComponent.prop("headers")[1].cellElement.props.columnDefinition
			.sortOptions;

		expect(mountedFirstHeaderSortOptions.sortField, "to be true");
		expect(mountedSecondHeaderSortOptions.sortField, "to be false");

		updatedColumnHeaders[0].cellElement.props.columnDefinition.sortOptions.sortField = false;
		updatedColumnHeaders[1].cellElement.props.columnDefinition.sortOptions.sortField = true;

		mountedComponent.setProps({ headers: updatedColumnHeaders });

		mountedFirstHeaderSortOptions = mountedComponent.prop("headers")[0].cellElement.props.columnDefinition.sortOptions;
		mountedSecondHeaderSortOptions = mountedComponent.prop("headers")[1].cellElement.props.columnDefinition.sortOptions;

		expect(mountedFirstHeaderSortOptions.sortField, "to be false");
		expect(mountedSecondHeaderSortOptions.sortField, "to be true");
	});

	it("Updates table props when sorting direction in headers changes", () => {
		const elements = [
			{ id: "1", column1: "test11", column2: "test12" },
			{ id: "2", column1: "test21", column2: "test22" },
		];

		const initialColumnDefs = [
			{
				fieldName: "column1",
				label: "column1",
				sortOptions: {
					sortField: true,
					direction: "Ascending",
					propertyName: "column1",
				},
				sortCallback: jest.fn(),
			},
		];

		let { headers, rows } = buildHeaderAndRowFromConfig(initialColumnDefs, elements);

		const updatedColumnHeaders = cloneDeep(headers);

		const mountedComponent = mount(<Table headers={headers} rows={rows} />);

		let mountedHeaderSortOptions = mountedComponent.prop("headers")[0].cellElement.props.columnDefinition.sortOptions;

		expect(mountedHeaderSortOptions.direction, "to equal", "Ascending");

		updatedColumnHeaders[0].cellElement.props.columnDefinition.sortOptions.direction = "Descending";

		mountedComponent.setProps({ headers: updatedColumnHeaders });

		mountedHeaderSortOptions = mountedComponent.prop("headers")[0].cellElement.props.columnDefinition.sortOptions;

		expect(mountedHeaderSortOptions.direction, "to equal", "Descending");
	});

	it("Not updates table props when prev, next or both header.sortOptions are undefined", () => {
		const elements = [
			{ id: "1", column1: "test11", column2: "test12" },
			{ id: "2", column1: "test21", column2: "test22" },
		];

		const initialColumnDefs = [
			{
				fieldName: "column1",
				label: "column1",
			},
		];

		let { headers, rows } = buildHeaderAndRowFromConfig(initialColumnDefs, elements);

		const updatedColumnHeaders = cloneDeep(headers);

		const mountedComponent = mount(<Table headers={headers} rows={rows} />);

		let mountedHeaderColumnDefinition = mountedComponent.prop("headers")[0].cellElement.props.columnDefinition;

		expect(mountedHeaderColumnDefinition, "to equal", headers[0].cellElement.props.columnDefinition);

		mountedComponent.setProps({ headers: updatedColumnHeaders });

		expect(mountedHeaderColumnDefinition, "to equal", headers[0].cellElement.props.columnDefinition);
	});

	it("Updates table props when changed and deep comparation enabled", () => {
		const elements = [
			{ id: "1", column1: "test11", column2: "test12" },
			{ id: "2", column1: "test21", column2: "test22" },
		];

		const initialColumnDefs = [
			{
				fieldName: "column1",
				label: "column1",
			},
			{
				fieldName: "column2",
				label: "column2",
			},
		];

		let { headers, rows } = buildHeaderAndRowFromConfig(initialColumnDefs, elements);

		const updatedColumnRows = cloneDeep(rows);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.deepPropsComparation, true);

		const mountedComponent = mount(<Table headers={headers} rows={rows} tableProps={tableProps} />);

		let mountedRow1 = mountedComponent.prop("rows")[0].element;
		let mountedRow2 = mountedComponent.prop("rows")[1].element;

		expect(mountedRow1, "to equal", elements[0]);
		expect(mountedRow2, "to equal", elements[1]);

		const elementsExpected = [
			{ id: "1", column1: "newTest11", column2: "test12" },
			{ id: "2", column1: "test21", column2: "newTest22" },
		];

		updatedColumnRows[0].element.column1 = "newTest11";
		updatedColumnRows[1].element.column2 = "newTest22";

		mountedComponent.setProps({ rows: updatedColumnRows });

		let mountedRow1New = mountedComponent.prop("rows")[0].element;
		let mountedRow2New = mountedComponent.prop("rows")[1].element;

		expect(mountedRow1New, "to equal", elementsExpected[0]);
		expect(mountedRow2New, "to equal", elementsExpected[1]);
	});

	it("Updates table props when not changed and deep comparation enabled", () => {
		const elements = [
			{ id: "1", column1: "test11", column2: "test12" },
			{ id: "2", column1: "test21", column2: "test22" },
		];

		const initialColumnDefs = [
			{
				fieldName: "column1",
				label: "column1",
			},
			{
				fieldName: "column2",
				label: "column2",
			},
		];

		let { headers, rows } = buildHeaderAndRowFromConfig(initialColumnDefs, elements);

		const updatedColumnRows = cloneDeep(rows);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.deepPropsComparation, true);

		const mountedComponent = mount(<Table headers={headers} rows={rows} tableProps={tableProps} />);

		let mountedRow1 = mountedComponent.prop("rows")[0].element;
		let mountedRow2 = mountedComponent.prop("rows")[1].element;

		expect(mountedRow1, "to equal", elements[0]);
		expect(mountedRow2, "to equal", elements[1]);

		mountedComponent.setProps({ rows: updatedColumnRows });

		let mountedRow1New = mountedComponent.prop("rows")[0].element;
		let mountedRow2New = mountedComponent.prop("rows")[1].element;

		expect(mountedRow1New, "to equal", elements[0]);
		expect(mountedRow2New, "to equal", elements[1]);
	});

	it("Updates table props when columns amount changed and deep comparation enabled", () => {
		const elements = [
			{ id: "1", column1: "test11", column2: "test12" },
			{ id: "2", column1: "test21", column2: "test22" },
		];

		const initialColumnDefs = [
			{
				fieldName: "column1",
				label: "column1",
			},
			{
				fieldName: "column2",
				label: "column2",
			},
		];

		let { headers, rows } = buildHeaderAndRowFromConfig(initialColumnDefs, elements);

		const updatedColumnRows = cloneDeep(rows);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.deepPropsComparation, true);

		const mountedComponent = mount(<Table headers={headers} rows={rows} tableProps={tableProps} />);

		let mountedRow1 = mountedComponent.prop("rows")[0].element;
		let mountedRow2 = mountedComponent.prop("rows")[1].element;

		expect(mountedRow1, "to equal", elements[0]);
		expect(mountedRow2, "to equal", elements[1]);

		const elementsExpected = [
			{ id: "1", column1: "test11", column2: "test12", column3: "test13" },
			{ id: "2", column1: "test21", column2: "test22", column3: "test23" },
		];

		updatedColumnRows[0].element.column3 = "test13";
		updatedColumnRows[1].element.column3 = "test23";

		mountedComponent.setProps({ rows: updatedColumnRows });

		let mountedRow1New = mountedComponent.prop("rows")[0].element;
		let mountedRow2New = mountedComponent.prop("rows")[1].element;

		expect(mountedRow1New, "to equal", elementsExpected[0]);
		expect(mountedRow2New, "to equal", elementsExpected[1]);
	});
});

describe("Table", () => {
	const headerLabels = {
		column1: "Column One",
		column2: "Column Two",
	};

	const elements = [
		{ id: "1", a1: "test11", a2: "test12" },
		{ id: "2", a1: "test21", a2: "test22" },
	];

	const config = [
		{ fieldName: "a1", label: headerLabels.column1 },
		{ fieldName: "a2", label: headerLabels.column2 },
	];

	it("Fails if tableProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <Table rows={[]} headers={[]} tableProps="Wrong type" />;
			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "tableProps property is not of type TableProps");
			});
		});
	});

	it("Renders Table", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const component = <Table rows={rows} headers={headers} />;

		const expectedTableRows = (
			<>
				<MemoTableRow>
					<td>{<TooltippedTypography noWrap children={elements[0].a1} titleValue={elements[0].a1} />}</td>
					<td>{<TooltippedTypography noWrap children={elements[0].a2} titleValue={elements[0].a2} />}</td>
				</MemoTableRow>
				<MemoTableRow>
					<td>{<TooltippedTypography noWrap children={elements[1].a1} titleValue={elements[1].a1} />}</td>
					<td>{<TooltippedTypography noWrap children={elements[1].a2} titleValue={elements[1].a2} />}</td>
				</MemoTableRow>
			</>
		);

		const expectedHeader = (
			<TableHead>
				<TableRow>
					<th>{headerLabels.column1}</th>
					<th>{headerLabels.column2}</th>
				</TableRow>
			</TableHead>
		);

		const expected = (
			<TableContainer>
				<div>
					<ResizeDetector />
					<TableMui>
						{expectedHeader}
						<MemoTableBody dataRows={rows} tableRows={expectedTableRows} />
					</TableMui>
				</div>
			</TableContainer>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Table in editing mode", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements, false);

		const component = <Table rows={rows} headers={headers} isEditingMode={true} />;

		const expectedTableRows = (
			<>
				<MemoTableRow>
					<td>{<TooltippedTypography noWrap children={elements[0].a1} titleValue={elements[0].a1} />}</td>
					<td>{<TooltippedTypography noWrap children={elements[0].a2} titleValue={elements[0].a2} />}</td>
				</MemoTableRow>
				<MemoTableRow>
					<td>{<TooltippedTypography noWrap children={elements[1].a1} titleValue={elements[1].a1} />}</td>
					<td>{<TooltippedTypography noWrap children={elements[1].a2} titleValue={elements[1].a2} />}</td>
				</MemoTableRow>
			</>
		);

		const expectedHeader = (
			<TableHead>
				<TableRow>
					<th>{headerLabels.column1}</th>
					<th>{headerLabels.column2}</th>
				</TableRow>
			</TableHead>
		);

		const expected = (
			<TableContainer>
				<div>
					<ResizeDetector />
					<TableMui>
						{expectedHeader}
						<MemoTableBody dataRows={rows} tableRows={expectedTableRows} />
					</TableMui>
				</div>
			</TableContainer>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Table with enabled sticky header", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.stickyHeader, true);

		const component = <Table rows={rows} headers={headers} tableProps={tableProps} />;

		const expectedTableRows = (
			<>
				<MemoTableRow>
					<td>{<TooltippedTypography noWrap children={elements[0].a1} titleValue={elements[0].a1} />}</td>
					<td>{<TooltippedTypography noWrap children={elements[0].a2} titleValue={elements[0].a2} />}</td>
				</MemoTableRow>
				<MemoTableRow>
					<td>{<TooltippedTypography noWrap children={elements[1].a1} titleValue={elements[1].a1} />}</td>
					<td>{<TooltippedTypography noWrap children={elements[1].a2} titleValue={elements[1].a2} />}</td>
				</MemoTableRow>
			</>
		);

		const expectedHeader = (
			<TableHead>
				<TableRow>
					<th>{headerLabels.column1}</th>
					<th>{headerLabels.column2}</th>
				</TableRow>
			</TableHead>
		);

		const expected = (
			<TableContainer>
				<div>
					<TableMui>{expectedHeader}</TableMui>
					<div />
				</div>
				<div>
					<ResizeDetector />
					<TableMui>
						{expectedHeader}
						<MemoTableBody dataRows={rows} tableRows={expectedTableRows} />
					</TableMui>
				</div>
			</TableContainer>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Table with enabled sticky header and select mode", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.selectMode, true);
		tableProps.set(TableProps.propNames.stickyHeader, true);

		const component = <Table rows={rows} headers={headers} tableProps={tableProps} />;

		const expectedTableRows = (
			<>
				<MemoTableRow>
					<td>
						<CheckboxMui />
					</td>
					<td>{<TooltippedTypography noWrap children={elements[0].a1} titleValue={elements[0].a1} />}</td>
					<td>{<TooltippedTypography noWrap children={elements[0].a2} titleValue={elements[0].a2} />}</td>
				</MemoTableRow>
				<MemoTableRow>
					<td>
						<CheckboxMui />
					</td>
					<td>{<TooltippedTypography noWrap children={elements[1].a1} titleValue={elements[1].a1} />}</td>
					<td>{<TooltippedTypography noWrap children={elements[1].a2} titleValue={elements[1].a2} />}</td>
				</MemoTableRow>
			</>
		);

		const expectedHeader = (
			<TableHead>
				<TableRow>
					<th>
						<CheckboxMui />
					</th>
					<th>{headerLabels.column1}</th>
					<th>{headerLabels.column2}</th>
				</TableRow>
			</TableHead>
		);

		const expected = (
			<TableContainer>
				<div>
					<TableMui>{expectedHeader}</TableMui>
					<div />
				</div>
				<div>
					<ResizeDetector />
					<TableMui>
						{expectedHeader}
						<MemoTableBody dataRows={rows} tableRows={expectedTableRows} />
					</TableMui>
				</div>
			</TableContainer>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Table with selection enabled", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.selectMode, true);

		const component = <Table rows={rows} headers={headers} tableProps={tableProps} />;

		const expectedTableRows = (
			<>
				<MemoTableRow>
					<td>
						<CheckboxMui />
					</td>
					<td>{<TooltippedTypography noWrap children={elements[0].a1} titleValue={elements[0].a1} />}</td>
					<td>{<TooltippedTypography noWrap children={elements[0].a2} titleValue={elements[0].a2} />}</td>
				</MemoTableRow>
				<MemoTableRow>
					<td>
						<CheckboxMui />
					</td>
					<td>{<TooltippedTypography noWrap children={elements[1].a1} titleValue={elements[1].a1} />}</td>
					<td>{<TooltippedTypography noWrap children={elements[1].a2} titleValue={elements[1].a2} />}</td>
				</MemoTableRow>
			</>
		);

		const expectedHeader = (
			<TableHead>
				<TableRow>
					<th>
						<CheckboxMui />
					</th>
					<th>{headerLabels.column1}</th>
					<th>{headerLabels.column2}</th>
				</TableRow>
			</TableHead>
		);

		const expected = (
			<TableContainer>
				<div>
					<ResizeDetector />
					<TableMui>
						{expectedHeader}
						<MemoTableBody dataRows={rows} tableRows={expectedTableRows} />
					</TableMui>
				</div>
			</TableContainer>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Table with deep comparation", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.deepPropsComparation, true);

		const component = <Table rows={rows} headers={headers} tableProps={tableProps} />;
		const expectedTableRows = (
			<>
				<MemoTableRow>
					<td>{<TooltippedTypography noWrap children={elements[0].a1} titleValue={elements[0].a1} />}</td>
					<td>{<TooltippedTypography noWrap children={elements[0].a2} titleValue={elements[0].a2} />}</td>
				</MemoTableRow>
				<MemoTableRow>
					<td>{<TooltippedTypography noWrap children={elements[1].a1} titleValue={elements[1].a1} />}</td>
					<td>{<TooltippedTypography noWrap children={elements[1].a2} titleValue={elements[1].a2} />}</td>
				</MemoTableRow>
			</>
		);

		const expectedHeader = (
			<TableHead>
				<TableRow>
					<th>{headerLabels.column1}</th>
					<th>{headerLabels.column2}</th>
				</TableRow>
			</TableHead>
		);

		const expected = (
			<TableContainer>
				<div>
					<ResizeDetector />
					<TableMui>
						{expectedHeader}
						<MemoTableBody dataRows={rows} tableRows={expectedTableRows} />
					</TableMui>
				</div>
			</TableContainer>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Table row selection handler is invoked", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const selectionHandler = sinon.spy().named("selectionHandler");

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.selectMode, true);
		tableProps.set(TableProps.propNames.selectedRowsChanged, selectionHandler);

		const component = <Table rows={rows} headers={headers} tableProps={tableProps} />;

		const mountedComponent = mount(component);

		const body = mountedComponent.find("tbody");

		const checkboxes = body.find("input");
		expect(checkboxes.length, "to equal", 2);

		checkboxes.at(0).simulate("change");
		checkboxes.at(1).simulate("change");

		expect(selectionHandler, "was called twice");
	});

	it("Table header selection handler is invoked", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const selectionHandler = sinon.spy().named("selectionHandler");

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.selectMode, true);
		tableProps.set(TableProps.propNames.selectedRowsChanged, selectionHandler);

		const component = <Table rows={rows} headers={headers} tableProps={tableProps} />;

		const mountedComponent = mount(component);

		const tableHead = mountedComponent.find(TableHead);
		expect(tableHead.length, "to equal", 1);

		const checkboxes = tableHead.find("input");
		expect(checkboxes.length, "to equal", 1);

		checkboxes.at(0).simulate("change");

		expect(selectionHandler, "was called once");
	});

	it("onRowClick is invoked when clicking on a table row", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const onRowClick = sinon.spy().named("onRowClick");

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.selectMode, true);
		tableProps.set(TableProps.propNames.onRowClick, onRowClick);

		const component = <Table rows={rows} headers={headers} tableProps={tableProps} />;

		const mountedComponent = mount(component);

		const tableRows = mountedComponent.find(TableRow);
		expect(tableRows.length, "to equal", 3);

		const checkboxes = tableRows.find("input");
		expect(checkboxes.length, "to equal", 3);

		checkboxes.at(2).simulate("click");

		expect(onRowClick, "was not called");

		tableRows.at(2).simulate("click");

		expect(onRowClick, "was called once");
	});

	it("handle onresize event", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.selectMode, true);
		tableProps.set(TableProps.propNames.stickyHeader, true);

		const root = document.createElement("div");

		document.body.append(root);
		const element = <Table rows={rows} headers={headers} tableProps={tableProps} />;
		ReactDOM.render(element, root);

		const tables = root.querySelectorAll("table");
		expect(tables.length, "to equal", 2);

		const scrollDiv = tables[0].parentElement.querySelectorAll("div")[0];
		expect(getComputedStyle(scrollDiv).getPropertyValue("display"), "to equal", "none");

		act(() => {
			// XXX: This is a nasty hack of jsdom, and may break unexpectedly
			Object.defineProperty(tables[1].parentElement, "offsetHeight", {
				value: 10,
				writable: true,
			});
			Object.defineProperty(tables[1].parentElement, "scrollHeight", {
				value: 20,
				writable: true,
			});
			Object.defineProperty(tables[1].parentElement, "offsetWidth", {
				value: 20,
				writable: true,
			});
			Object.defineProperty(tables[1].parentElement, "clientWidth", {
				value: 11,
				writable: true,
			});
			window.dispatchEvent(new Event("resize"));
		});

		expect(getComputedStyle(scrollDiv).getPropertyValue("display"), "to equal", "block");
	});

	it("handle scrolling event", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.selectMode, true);

		const scrollLoader = sinon.spy().named("scrollLoader");

		const component = (
			<Table
				rows={rows}
				headers={headers}
				pageLength={2}
				latestPage={1}
				tableProps={tableProps}
				scrollLoader={scrollLoader}
			/>
		);

		const mountedComponent = mount(component);

		const scrollEvent = document.createEvent("MouseEvents");
		scrollEvent.initEvent("scroll", true, false);

		const table = mountedComponent.find(TableMui);

		table.simulate("scroll", {
			target: { scrollHeight: 1000, scrollTop: 40, offsetHeight: 100 },
		});

		expect(scrollLoader, "was not called");

		table.simulate("scroll", {
			target: { scrollHeight: 1000, scrollTop: 850, offsetHeight: 100 },
		});

		expect(scrollLoader, "to have calls satisfying", [{ args: [2] }]);
	});

	it("handle scrolling event when list has reached the end", () => {
		const elements = [
			{ id: "1", a1: "test11", a2: "test12" },
			{ id: "2", a1: "test21", a2: "test22" },
			{ id: "3", a1: "test31", a2: "test32" },
		];

		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.selectMode, true);

		const scrollLoader = sinon.spy().named("scrollLoader");

		const component = (
			<Table
				rows={rows}
				headers={headers}
				pageLength={2}
				latestPage={2}
				tableProps={tableProps}
				scrollLoader={scrollLoader}
			/>
		);

		const mountedComponent = mount(component);

		const scrollEvent = document.createEvent("MouseEvents");
		scrollEvent.initEvent("scroll", true, false);

		const table = mountedComponent.find(TableMui);

		table.simulate("scroll", {
			target: { scrollHeight: 1000, scrollTop: 850, offsetHeight: 100 },
		});

		expect(scrollLoader, "was not called");
	});

	it("Renders Table with placeholder if rows are empty", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, []);

		const placeholder = <Placeholder />;

		const component = <Table rows={rows} headers={headers} placeholder={placeholder} />;

		const mountedComponent = mount(component);

		const placeHolder = mountedComponent.find(Placeholder);
		expect(placeHolder.length, "to equal", 1);
	});

	it("Renders Table with tableInfo if provided", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, []);

		const tableInfoBar = <TableInfoBar rowsCount={1206} tableName={"someItems"} />;

		const component = <Table rows={rows} headers={headers} tableInfo={tableInfoBar} />;
		const mountedComponent = mount(component);

		const tableInfo = mountedComponent.find(TableInfoBar);
		expect(tableInfo.length, "to equal", 1);
	});
});
