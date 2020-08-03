import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import sinon from "sinon";
import { mount } from "enzyme";
import Table, { MemoTableBody, MemoTableRow, useStyles } from "./Table";
import TableMui from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { buildHeaderAndRowFromConfig } from "./tableHelpers";
import Placeholder from "../../Placeholder";
import { staticTableSelectionMethods } from "./useTableSelection";
import { ignoreConsoleError } from "../../../utils/testUtils";
import { TableProps } from "./TableProps";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "./../../../utils/testUtils";

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
			<MuiThemeContainer
				classToTest="tableHeader"
				styleProps={{ withoutTopBorder: true, stickyHeader: true }}
			/>,
			"when mounted",
			"to have style rules satisfying",
			expect
				.it("to contain", "border-top: none")
				.and("to contain", "border-bottom: none")
				.and("to contain", "display: none"),
		);
	});

	it("build tableContainer styles as expected", () => {
		expect(
			<MuiThemeContainer classToTest="tableContainer" />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "height: calc(100% - 0px)"),
		);

		expect(
			<MuiThemeContainer
				classToTest="tableContainer"
				styleProps={{ headerHeight: 17, stickyHeader: true }}
			/>,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "height: calc(100% - 17px)"),
		);
	});

	it("build container styles as expected", () => {
		expect(
			<MuiThemeContainer classToTest="container" />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "overflow: auto"),
		);

		expect(
			<MuiThemeContainer classToTest="container" styleProps={{ stickyHeader: true }} />,
			"when mounted",
			"to have style rules satisfying",
			expect.it("to contain", "overflow: hidden"),
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
			<MuiThemeContainer classToTest="tableRow" styleProps={{ onRowClick: () => { } }} />,
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

	it("Updates table props", () => {
		const mountedComponent = mount(<Table headers={[]} rows={[]} />);

		expect(mountedComponent.prop("rows").length, "to equal", 0);

		mountedComponent.setProps({ rows: [{ key: "1", columns: [] }] });

		expect(mountedComponent.prop("rows").length, "to equal", 1);
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
			expect(() => mount(component), "to throw a", TypeError);
		});
	});

	it("Renders Table", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const mountedComponent = mount(<Table rows={rows} headers={headers} />);

		const expectedHeader = (
			<TableHead>
				<TableRow>
					<th>Column One</th>
					<th>Column Two</th>
				</TableRow>
			</TableHead>
		);

		const tableHeaders = mountedComponent.find(TableHead);
		expect(tableHeaders.length, "to equal", 1);

		const tableRows = mountedComponent.find("tbody").find(TableRow);
		expect(tableRows.length, "to equal", 2);

		let expectedCells = tableRows.at(0).find("td");
		expect(expectedCells.length, "to equal", 2);
		expect(expectedCells.at(0).matchesElement(<td>test11</td>), "to be truthy");
		expect(expectedCells.at(1).matchesElement(<td>test12</td>), "to be truthy");

		expectedCells = tableRows.at(1).find("td");
		expect(expectedCells.length, "to equal", 2);
		expect(expectedCells.at(0).matchesElement(<td>test21</td>), "to be truthy");
		expect(expectedCells.at(1).matchesElement(<td>test22</td>), "to be truthy");

		expect(mountedComponent.containsMatchingElement(expectedHeader), "to be truthy");
	});

	it("Renders Table with sticky header enabled", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.selectMode, true);
		tableProps.set(TableProps.propNames.stickyHeader, true);

		const component = <Table rows={rows} headers={headers} tableProps={tableProps} />;

		const mountedComponent = mount(component);

		const expectedHeader = (
			<TableHead>
				<TableRow>
					<th>
						<Checkbox />
					</th>
					<th>Column One</th>
					<th>Column Two</th>
				</TableRow>
			</TableHead>
		);

		const tableHeaders = mountedComponent.find(TableHead);
		expect(tableHeaders.length, "to equal", 2);
		expect(tableHeaders.at(0).find("input").length, "to equal", 1);
		expect(tableHeaders.at(1).find("input").length, "to equal", 1);

		const body = mountedComponent.find("tbody");

		const tableRows = body.find(TableRow);
		expect(tableRows.length, "to equal", 2);

		let expectedCells = tableRows.at(0).find("td");
		expect(expectedCells.length, "to equal", 3);
		expect(
			expectedCells.at(0).matchesElement(
				<td>
					<Checkbox />
				</td>,
			),
			"to be truthy",
		);
		expect(expectedCells.at(1).matchesElement(<td>test11</td>), "to be truthy");
		expect(expectedCells.at(2).matchesElement(<td>test12</td>), "to be truthy");

		expectedCells = tableRows.at(1).find("td");
		expect(expectedCells.length, "to equal", 3);
		expect(
			expectedCells.at(0).matchesElement(
				<td>
					<Checkbox />
				</td>,
			),
			"to be truthy",
		);
		expect(expectedCells.at(1).matchesElement(<td>test21</td>), "to be truthy");
		expect(expectedCells.at(2).matchesElement(<td>test22</td>), "to be truthy");

		expect(mountedComponent.containsMatchingElement(expectedHeader), "to be truthy");
	});

	it("Renders Table with selection enabled", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.selectMode, true);

		const component = <Table rows={rows} headers={headers} tableProps={tableProps} />;

		const mountedComponent = mount(component);

		const expectedHeader = (
			<TableHead>
				<TableRow>
					<th>
						<Checkbox />
					</th>
					<th>Column One</th>
					<th>Column Two</th>
				</TableRow>
			</TableHead>
		);

		const body = mountedComponent.find("tbody");

		const tableRows = body.find(TableRow);
		expect(tableRows.length, "to equal", 2);

		let expectedCells = tableRows.at(0).find("td");
		expect(expectedCells.length, "to equal", 3);
		expect(
			expectedCells.at(0).matchesElement(
				<td>
					<Checkbox />
				</td>,
			),
			"to be truthy",
		);
		expect(expectedCells.at(1).matchesElement(<td>test11</td>), "to be truthy");
		expect(expectedCells.at(2).matchesElement(<td>test12</td>), "to be truthy");

		expectedCells = tableRows.at(1).find("td");
		expect(expectedCells.length, "to equal", 3);
		expect(
			expectedCells.at(0).matchesElement(
				<td>
					<Checkbox />
				</td>,
			),
			"to be truthy",
		);
		expect(expectedCells.at(1).matchesElement(<td>test21</td>), "to be truthy");
		expect(expectedCells.at(2).matchesElement(<td>test22</td>), "to be truthy");

		expect(mountedComponent.containsMatchingElement(expectedHeader), "to be truthy");
	});

	it("Table row selection handler is invoked", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.selectMode, true);

		const component = <Table rows={rows} headers={headers} tableProps={tableProps} />;

		const mountedComponent = mount(component);

		staticTableSelectionMethods.selectionHandler = sinon.spy().named("selectionHandler");

		const body = mountedComponent.find("tbody");

		const checkboxes = body.find("input");
		expect(checkboxes.length, "to equal", 2);

		checkboxes.at(0).simulate("change");
		checkboxes.at(1).simulate("change");

		expect(staticTableSelectionMethods.selectionHandler, "was called twice");
	});

	it("Table header selection handler is invoked", () => {
		const { headers, rows } = buildHeaderAndRowFromConfig(config, elements);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.selectMode, true);

		const component = <Table rows={rows} headers={headers} tableProps={tableProps} />;

		const mountedComponent = mount(component);

		staticTableSelectionMethods.selectionHandler = sinon.spy().named("selectionHandler");

		const tableHead = mountedComponent.find(TableHead);
		expect(tableHead.length, "to equal", 1);

		const checkboxes = tableHead.find("input");
		expect(checkboxes.length, "to equal", 1);

		checkboxes.at(0).simulate("change");

		expect(staticTableSelectionMethods.selectionHandler, "was called once");
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

	it("handle onresize event TODOJOC", () => {
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
			Object.defineProperty(tables[1].parentElement, "clientHeight", {
				value: 10,
				writable: true,
			});
			Object.defineProperty(tables[1].parentElement, "clientWidth", {
				value: 11,
				writable: true,
			});
			window.dispatchEvent(new Event("resize"));
		});

		act(() => {
			// XXX: This is a nasty hack of jsdom, and may break unexpectedly
			Object.defineProperty(tables[1].parentElement, "clientHeight", {
				value: 110,
				writable: true,
			});
			Object.defineProperty(tables[1].parentElement, "clientWidth", {
				value: 111,
				writable: true,
			});
			window.dispatchEvent(new Event("resize"));
		});

		//expect(getComputedStyle(scrollDiv).getPropertyValue("display"), "to equal", "block");
	});
});
