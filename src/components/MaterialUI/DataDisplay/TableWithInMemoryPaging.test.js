import React from "react";
import sinon from "sinon";
import { mount } from "enzyme";
import Table from "./Table";
import { buildHeaderAndRowFromConfig } from "./tableHelpers";
import TableInfoBar from "./PredefinedElements/TableInfoBar";
import { extractMessages } from "../../../utils/testUtils";
import TableProps from "./TableProps";
import { createMuiTheme } from "./../../../utils/testUtils";
import { TestWrapper } from "../../../utils/testUtils";
import TableWithInMemoryPaging from "./TableWithInMemoryPaging";
import sharedMessages from "../../../sharedMessages";
import SearchControl from "../Inputs/PredefinedElements/SearchControl";
import SectionToolbar from "./PredefinedElements/SectionToolbar";
import buildStore from "../../../buildStore";
import { fireEvent, render, getByPlaceholderText, getByTestId, queryAllByRole } from "@testing-library/react";
import Placeholder from "./PredefinedElements/Placeholder";

const messages = extractMessages(sharedMessages);

const getColumnDefs = () => [
	{
		fieldName: "name",
		label: "name",
		placeholder: "t",
	},
];

const standardListRecords = Array.from(Array(50).keys()).map(k => ({ name: "n" + k, id: k }));

describe("TableWithInMemoryPaging", () => {
	const theme = createMuiTheme();

	let store;

	beforeEach(() => {
		global.SUPPORTED_LOCALES = undefined;
		store = buildStore([]); // use the real reducers
	});

	afterEach(() => {
		delete process.env.SUPPORTED_LOCALES;
	});

	it("Renders TableWithInMemoryPaging", () => {
		const configDefs = getColumnDefs();
		const { headers, rows } = buildHeaderAndRowFromConfig(configDefs, standardListRecords.slice(0, 20));

		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TableWithInMemoryPaging
					sortedRows={standardListRecords}
					tableName={"StateName"}
					columnDefs={configDefs}
					pageSize={20}
				/>
			</TestWrapper>
		);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.stickyHeader, true);
		tableProps.set(TableProps.propNames.withoutTopBorder, true);
		tableProps.set(TableProps.propNames.deepPropsComparation, true);
		tableProps.set(TableProps.propNames.saveScrollbarPosition, true);
		tableProps.set(TableProps.propNames.tableName, "StateName");

		const expected = (
			<TestWrapper provider={{ store }} memoryRouter intlProvider stylesProvider>
				<Table rows={rows} headers={headers} tableProps={tableProps} />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders TableWithInMemoryPaging with onItemClick", () => {
		const configDefs = getColumnDefs();
		const onItemClick = sinon.spy().named("onItemClick");

		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<TableWithInMemoryPaging
					sortedRows={standardListRecords}
					tableName={"StateName"}
					columnDefs={configDefs}
					pageSize={20}
					onItemClick={onItemClick}
				/>
			</TestWrapper>
		);

		const mountedComponent = mount(component);
		const row = mountedComponent.find("td").first();

		row.simulate("click");
		expect(onItemClick, "was called once");
	});

	it("Renders TableWithInMemoryPaging with right toolbar", () => {
		const configDefs = getColumnDefs();
		const { headers, rows } = buildHeaderAndRowFromConfig(configDefs, standardListRecords.slice(0, 20));

		const toolbarRightContent = <div>hello</div>;

		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<TableWithInMemoryPaging
						sortedRows={standardListRecords}
						tableName={"StateName"}
						columnDefs={configDefs}
						toolbarRightContent={toolbarRightContent}
						pageSize={20}
					/>
				</div>
			</TestWrapper>
		);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.stickyHeader, true);
		tableProps.set(TableProps.propNames.withoutTopBorder, true);
		tableProps.set(TableProps.propNames.deepPropsComparation, true);
		tableProps.set(TableProps.propNames.saveScrollbarPosition, true);
		tableProps.set(TableProps.propNames.tableName, "StateName");

		const expected = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<SectionToolbar rightContent={toolbarRightContent}></SectionToolbar>
					<Table rows={rows} headers={headers} tableProps={tableProps} />
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders TableWithInMemoryPaging with search", () => {
		const configDefs = getColumnDefs();
		const { headers, rows } = buildHeaderAndRowFromConfig(configDefs, standardListRecords.slice(0, 20));

		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<TableWithInMemoryPaging
						sortedRows={standardListRecords}
						tableName={"StateName"}
						columnDefs={configDefs}
						pageSize={20}
						searchProperties={["name"]}
					/>
				</div>
			</TestWrapper>
		);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.stickyHeader, true);
		tableProps.set(TableProps.propNames.withoutTopBorder, true);
		tableProps.set(TableProps.propNames.deepPropsComparation, true);
		tableProps.set(TableProps.propNames.saveScrollbarPosition, true);
		tableProps.set(TableProps.propNames.tableName, "StateName");

		const expected = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<SectionToolbar>
						<SearchControl placeholder="Search" />
					</SectionToolbar>
					<Table rows={rows} headers={headers} tableProps={tableProps} />
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders TableWithInMemoryPaging with search and right toolbar", () => {
		const configDefs = getColumnDefs();
		const { headers, rows } = buildHeaderAndRowFromConfig(configDefs, standardListRecords.slice(0, 20));
		const toolbarRightContent = <div>hello</div>;

		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<TableWithInMemoryPaging
						sortedRows={standardListRecords}
						tableName={"StateName"}
						columnDefs={configDefs}
						searchProperties={["name"]}
						toolbarRightContent={toolbarRightContent}
					/>
				</div>
			</TestWrapper>
		);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.stickyHeader, true);
		tableProps.set(TableProps.propNames.withoutTopBorder, true);
		tableProps.set(TableProps.propNames.deepPropsComparation, true);
		tableProps.set(TableProps.propNames.saveScrollbarPosition, true);
		tableProps.set(TableProps.propNames.tableName, "StateName");

		const expected = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<SectionToolbar rightContent={toolbarRightContent}>
						<SearchControl placeholder="Search" />
					</SectionToolbar>
					<Table rows={rows} headers={headers} tableProps={tableProps} />
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders TableWithInMemoryPaging search for something", () => {
		const configDefs = getColumnDefs();

		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<TableWithInMemoryPaging
						sortedRows={standardListRecords}
						tableName={"StateName"}
						columnDefs={configDefs}
						searchProperties={["name"]}
					/>
				</div>
			</TestWrapper>
		);

		const { container } = render(component);

		const searchInput = getByPlaceholderText(container, "Search");
		const searchButton = getByTestId(container, "searchButton");

		const beforeTableRowCount = queryAllByRole(container, "cell").length;
		expect(beforeTableRowCount, "not to be", 0);

		fireEvent.change(searchInput, {
			target: {
				value: "invalid text",
			},
		});
		fireEvent.click(searchButton);

		const afterTableRowCount = queryAllByRole(container, "getAllByRole").length;

		expect(beforeTableRowCount, "not to be", afterTableRowCount);
		expect(afterTableRowCount, "to be", 0);
	});

	it("Renders TableWithInMemoryPaging with filled count bar", () => {
		const configDefs = getColumnDefs();
		const { headers, rows } = buildHeaderAndRowFromConfig(configDefs, standardListRecords.slice(0, 20));

		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<TableWithInMemoryPaging
						sortedRows={standardListRecords}
						tableName={"StateName"}
						columnDefs={configDefs}
						totalCountLabelId={sharedMessages.about}
						noRowsTotalCountLabelId={sharedMessages.help}
					/>
				</div>
			</TestWrapper>
		);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.stickyHeader, true);
		tableProps.set(TableProps.propNames.withoutTopBorder, true);
		tableProps.set(TableProps.propNames.deepPropsComparation, true);
		tableProps.set(TableProps.propNames.saveScrollbarPosition, true);
		tableProps.set(TableProps.propNames.tableName, "StateName");

		const tableInfo = <TableInfoBar tableLabel={"About"} />;

		const expected = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<Table rows={rows} headers={headers} tableProps={tableProps} tableInfo={tableInfo} />
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders TableWithInMemoryPaging with empty count bar and with placeholder", () => {
		const configDefs = getColumnDefs();
		const { headers, rows } = buildHeaderAndRowFromConfig(configDefs, []);

		const component = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<TableWithInMemoryPaging
						sortedRows={[]}
						tableName={"StateName"}
						columnDefs={configDefs}
						totalCountLabelId={sharedMessages.about}
						noRowsTotalCountLabelId={sharedMessages.help}
					/>
				</div>
			</TestWrapper>
		);

		const tableProps = new TableProps();

		tableProps.set(TableProps.propNames.stickyHeader, true);
		tableProps.set(TableProps.propNames.withoutTopBorder, true);
		tableProps.set(TableProps.propNames.deepPropsComparation, true);
		tableProps.set(TableProps.propNames.saveScrollbarPosition, true);
		tableProps.set(TableProps.propNames.tableName, "StateName");

		const tableInfo = <TableInfoBar tableLabel={"Help"} />;

		const placeholder = <Placeholder cellList={configDefs.map(col => col.placeholder)} />;

		const expected = (
			<TestWrapper
				provider={{ store }}
				memoryRouter
				intlProvider={{ messages }}
				stylesProvider
				muiThemeProvider={{ theme }}
			>
				<div>
					<Table
						rows={rows}
						headers={headers}
						tableProps={tableProps}
						tableInfo={tableInfo}
						placeholder={placeholder}
					/>
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});
});
