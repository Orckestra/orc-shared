import React from "react";
import TableHeaderCell from "./TableHeaderCell";
import { mount } from "enzyme";
import Icon from "./Icon";
import { IntlProvider } from "react-intl";
import { ignoreConsoleError } from "~/utils/testUtils";
import sinon from "sinon";
import { TestWrapper, createMuiTheme } from "./../../../utils/testUtils";

describe("TableHeaderCell", () => {
	const theme = createMuiTheme();

	it("Retrieves label if column definition is not an object and sortOptions are not specified", () => {
		const columnDefinition = {
			label: "String",
		};

		const component = <TableHeaderCell columnDefinition={columnDefinition} />;

		expect(component, "when mounted", "to satisfy", columnDefinition.label);
	});

	it("Retrieves label if column definition is an object and sortOptions are not specified", () => {
		const messages = {
			cell: { id: "cell.name", defaultMessage: "a cell" },
		};

		const columnDefinition = {
			label: messages.cell,
		};

		const component = (
			<IntlProvider locale="en" messages={messages}>
				<TableHeaderCell columnDefinition={columnDefinition} />
			</IntlProvider>
		);

		expect(component, "when mounted", "to satisfy", messages.cell.defaultMessage);
	});

	it("Throws error if sortOptions are specified but, direction has a wrong value", () => {
		const columnDefinition = {
			label: "Cell",
			sortOptions: {
				sortField: true,
				direction: "Asc",
				propertyName: "cell",
			},
			sortCallback: jest.fn(),
		};

		const component = <TableHeaderCell columnDefinition={columnDefinition} />;

		ignoreConsoleError(() => {
			expect(() => mount(component), "to throw a", Error);
		});
	});

	it("Throws error if sortOptions are specified but, propertyName is missing", () => {
		const columnDefinition = {
			label: "Cell",
			sortOptions: {
				sortField: true,
				direction: "Ascending",
			},
			sortCallback: jest.fn(),
		};

		const component = <TableHeaderCell columnDefinition={columnDefinition} />;

		ignoreConsoleError(() => {
			expect(() => mount(component), "to throw a", Error);
		});
	});

	it("Throws error if sortOptions are specified but, sortCallback is missing", () => {
		const columnDefinition = {
			label: "Cell",
			sortOptions: {
				sortField: true,
				direction: "Ascending",
				propertyName: "cell",
			},
		};

		const component = <TableHeaderCell columnDefinition={columnDefinition} />;

		ignoreConsoleError(() => {
			expect(() => mount(component), "to throw a", Error);
		});
	});

	it("Renders TableHeaderCell correctly when sortOptions are specifed and direction is Ascending", () => {
		const columnDefinition = {
			label: "Cell",
			sortOptions: {
				sortField: true,
				direction: "Ascending",
				propertyName: "cell",
			},
			sortCallback: jest.fn(),
		};

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<TableHeaderCell columnDefinition={columnDefinition} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					{columnDefinition.label}
					<Icon id="caret-up" />
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders TableHeaderCell correctly when sortOptions are specifed and direction is Descending", () => {
		const columnDefinition = {
			label: "Cell",
			sortOptions: {
				sortField: true,
				direction: "Descending",
				propertyName: "cell",
			},
			sortCallback: jest.fn(),
		};

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<TableHeaderCell columnDefinition={columnDefinition} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					{columnDefinition.label}
					<Icon id="caret-down" />
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders TableHeaderCell correctly when sortOptions are specifed and sortField is true", () => {
		const columnDefinition = {
			label: "Cell",
			sortOptions: {
				sortField: true,
				direction: "Descending",
				propertyName: "cell",
			},
			sortCallback: jest.fn(),
		};

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<TableHeaderCell columnDefinition={columnDefinition} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					{columnDefinition.label}
					<Icon id="caret-down" color="primary" />
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders TableHeaderCell correctly when sortOptions are specifed and sortField is false", () => {
		const columnDefinition = {
			label: "Cell",
			sortOptions: {
				sortField: false,
				direction: "Descending",
				propertyName: "cell",
			},
			sortCallback: jest.fn(),
		};

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<TableHeaderCell columnDefinition={columnDefinition} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<div>
					{columnDefinition.label}
					<Icon id="caret-down" color="disabled" />
				</div>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Calls back passed callback function when sort icon was clicked", () => {
		const sortCallback = sinon.spy();

		const columnDefinition = {
			label: "Cell",
			sortOptions: {
				sortField: false,
				direction: "Descending",
				propertyName: "cell",
			},
			sortCallback: sortCallback,
		};

		const component = <TableHeaderCell columnDefinition={columnDefinition} />;

		const mountedComponent = mount(component);

		mountedComponent.simulate("click");

		expect(sortCallback, "to have a call satisfying", [columnDefinition.sortOptions.propertyName]);
	});
});
