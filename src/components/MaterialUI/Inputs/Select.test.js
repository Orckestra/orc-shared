import React from "react";
import { mount } from "enzyme";
import Select, { SelectIconButton } from "./Select";
import SelectMUI from "@material-ui/core/Select";
import sinon from "sinon";
import { ignoreConsoleError, createMuiTheme, TestWrapper } from "../../../utils/testUtils";
import SelectProps, { sortTypeEnum } from "./SelectProps";
import TooltippedTypography from "./../DataDisplay/TooltippedElements/TooltippedTypography";
import { ListSubheader, MuiThemeProvider } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "./../DataDisplay/Icon";

describe("Select Component", () => {
	let update, container;
	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);
		update = sinon.spy().named("update");
	});
	afterEach(() => {
		document.body.removeChild(container);
		container = null;
	});

	it("Fails if selectProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = (
				<MuiThemeProvider theme={createMuiTheme()}>
					<Select selectProps="Wrong type" />
				</MuiThemeProvider>
			);

			expect(() => mount(component), "to throw a", TypeError).then(error => {
				expect(error, "to have message", "selectProps property is not of type SelectProps");
			});
		});
	});

	const theme = createMuiTheme();

	it("Renders Select component without errors", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.update, update);
		selectProps.set(SelectProps.propNames.value, "aValue");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		const ChevronDown = props => {
			return <Icon id="dropdown-chevron-down" {...props} />;
		};

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SelectMUI value="aValue" disableUnderline={true} IconComponent={ChevronDown} error={false}>
					<MenuItem key="aValue" value="aValue">
						<TooltippedTypography children="aLabel" titleValue="aLabel" />
					</MenuItem>
					<MenuItem key="anotherValue" value="anotherValue">
						<TooltippedTypography noWrap children="anotherLabel" titleValue="anotherLabel" />
					</MenuItem>
				</SelectMUI>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Select component with indent classes", () => {
		const options = [
			{ value: "aValue", label: "aLabel", level: 0 },
			{ value: "anotherValue", label: "anotherLabel", level: 1 },
			{ value: "aThirdValue", label: "aThirdLabel", level: 2 },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.update, update);
		selectProps.set(SelectProps.propNames.value, "aValue");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		const ChevronDown = props => {
			return <Icon id="dropdown-chevron-down" {...props} />;
		};

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SelectMUI value="aValue" disableUnderline={true} IconComponent={ChevronDown} error={false}>
					<MenuItem key="aValue" value="aValue">
						<TooltippedTypography children="aLabel" titleValue="aLabel" />
					</MenuItem>
					<MenuItem key="anotherValue" value="anotherValue" className="makeStyles-level1">
						<TooltippedTypography noWrap children="anotherLabel" titleValue="anotherLabel" />
					</MenuItem>
					<MenuItem key="aThirdValue" value="aThirdValue" className="makeStyles-level2">
						<TooltippedTypography noWrap children="aThirdLabel" titleValue="aThirdLabel" />
					</MenuItem>
				</SelectMUI>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Select component correctly if Group header is False, null or undefined", () => {
		const options = [
			{ value: "aValue", label: "aLabel", level: 0 },
			{ value: "anotherValue", label: "anotherLabel", level: 1, isGroupHeader: false },
			{ value: "aThirdValue", label: "aThirdLabel", level: 2, isGroupHeader: null },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.update, update);
		selectProps.set(SelectProps.propNames.value, "aValue");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		const ChevronDown = props => {
			return <Icon id="dropdown-chevron-down" {...props} />;
		};

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SelectMUI value="aValue" disableUnderline={true} IconComponent={ChevronDown} error={false}>
					<MenuItem key="aValue" value="aValue">
						<TooltippedTypography children="aLabel" titleValue="aLabel" />
					</MenuItem>
					<MenuItem key="anotherValue" value="anotherValue" className="makeStyles-level1">
						<TooltippedTypography noWrap children="anotherLabel" titleValue="anotherLabel" />
					</MenuItem>
					<MenuItem key="aThirdValue" value="aThirdValue" className="makeStyles-level2">
						<TooltippedTypography noWrap children="aThirdLabel" titleValue="aThirdLabel" />
					</MenuItem>
				</SelectMUI>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Select component with Group Header", () => {
		const options = [
			{ value: "aValue", label: "aLabel", level: 0 },
			{ value: "aHeaderValue", label: "aHeaderValue", level: 1, isGroupHeader: true },
			{ value: "aThirdValue", label: "aThirdLabel", level: 2 },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.update, update);
		selectProps.set(SelectProps.propNames.value, "aValue");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		const ChevronDown = props => {
			return <Icon id="dropdown-chevron-down" {...props} />;
		};

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SelectMUI value="aValue" disableUnderline={true} IconComponent={ChevronDown} error={false}>
					<MenuItem key="aValue" value="aValue">
						<TooltippedTypography children="aLabel" titleValue="aLabel" />
					</MenuItem>
					<ListSubheader key="aHeaderValue" value="aHeaderValue" className="makeStyles-level1">
						aHeaderValue
					</ListSubheader>
					<MenuItem key="aThirdValue" value="aThirdValue" className="makeStyles-level2">
						<TooltippedTypography noWrap children="aThirdLabel" titleValue="aThirdLabel" />
					</MenuItem>
				</SelectMUI>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Select component with disabled options", () => {
		const options = [
			{ value: "aValue", label: "aLabel", level: 0, disabled: false },
			{ value: "anotherValue", label: "anotherLabel", level: 1, isGroupHeader: true },
			{ value: "aThirdValue", label: "aThirdLabel", level: 2, disabled: true },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.update, update);
		selectProps.set(SelectProps.propNames.value, "aValue");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		const ChevronDown = props => {
			return <Icon id="dropdown-chevron-down" {...props} />;
		};

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SelectMUI value="aValue" disableUnderline={true} IconComponent={ChevronDown} error={false}>
					<MenuItem key="aValue" value="aValue">
						<TooltippedTypography children="aLabel" titleValue="aLabel" />
					</MenuItem>
					<ListSubheader key="anotherValue" value="anotherValue" className="makeStyles-level1">
						anotherLabel
					</ListSubheader>
					<MenuItem key="aThirdValue" disabled={true} value="aThirdValue" className="makeStyles-level2">
						<TooltippedTypography noWrap children="aThirdLabel" titleValue="aThirdLabel" />
					</MenuItem>
				</SelectMUI>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Select component with an error message", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.update, update);
		selectProps.set(SelectProps.propNames.value, "aValue");
		selectProps.set(SelectProps.propNames.error, "an error message");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		const ChevronDown = props => {
			return <Icon id="dropdown-chevron-down" {...props} />;
		};

		const expected = (
			<div>
				<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
					<SelectMUI value="aValue" disableUnderline={true} IconComponent={ChevronDown} error={true}>
						<MenuItem key="aValue" value="aValue">
							<TooltippedTypography children="aLabel" titleValue="aLabel" />
						</MenuItem>
						<MenuItem key="anotherValue" value="anotherValue">
							<TooltippedTypography noWrap children="anotherLabel" titleValue="anotherLabel" />
						</MenuItem>
					</SelectMUI>
				</TestWrapper>
				<div>an error message</div>
			</div>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Select component with position override without errors", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const positionOverride = {
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "center",
			},
			transformOrigin: {
				vertical: "bottom",
				horizontal: "center",
			},
		};

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.update, update);
		selectProps.set(SelectProps.propNames.value, "aValue");
		selectProps.set(SelectProps.propNames.positionOverride, positionOverride);

		const theme = createMuiTheme();

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		const ChevronDown = props => {
			return <Icon id="dropdown-chevron-down" {...props} />;
		};

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SelectMUI value="aValue" disableUnderline={true} IconComponent={ChevronDown} error={false}>
					<MenuItem key="aValue" value="aValue">
						<TooltippedTypography children="aLabel" titleValue="aLabel" />
					</MenuItem>
					<MenuItem key="anotherValue" value="anotherValue">
						<TooltippedTypography noWrap children="anotherLabel" titleValue="anotherLabel" />
					</MenuItem>
				</SelectMUI>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Select component correctly with disabled prop", () => {
		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.value, "aValue");
		selectProps.set(SelectProps.propNames.disabled, true);

		const options = [{ label: "aLabel", value: "aValue" }];

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select selectProps={selectProps} options={options} />
			</TestWrapper>
		);

		const ChevronDown = props => {
			return <Icon id="dropdown-chevron-down" {...props} />;
		};

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SelectMUI value="aValue" disableUnderline={true} disabled={true} IconComponent={ChevronDown} error={false}>
					<MenuItem key="aValue" value="aValue">
						<TooltippedTypography children="aLabel" titleValue="aLabel" />
					</MenuItem>
				</SelectMUI>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Select component correctly with disabled prop without options", () => {
		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.value, "aValue");
		selectProps.set(SelectProps.propNames.disabled, true);

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select selectProps={selectProps} />
			</TestWrapper>
		);

		const ChevronDown = props => {
			return <Icon id="dropdown-chevron-down" {...props} />;
		};

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SelectMUI value="aValue" disableUnderline={true} disabled={true} IconComponent={ChevronDown} error={false} />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Renders Select component correctly without props", () => {
		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={[]} />
			</TestWrapper>
		);

		const ChevronDown = props => {
			return <Icon id="dropdown-chevron-down" {...props} />;
		};

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SelectMUI value="" disableUnderline={true} IconComponent={ChevronDown} error={false} />
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Sorts select options correctly without sorting and without showAll", () => {
		const options = [
			{ value: "c", label: "c", sortOrder: 3 },
			{ value: "a", label: "a", sortOrder: 1 },
			{ value: "b", label: "b", sortOrder: 2 },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.value, "b");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const test = mountedComponent.find(SelectMUI);

		const mountedOptions = test.props().children;

		const optionsKeys = mountedOptions.map(option => option.key);

		expect(optionsKeys, "to equal", ["c", "a", "b"]);
	});

	it("Sorts select options correctly without sorting", () => {
		const options = [
			{ value: "c", label: "c", sortOrder: 3 },
			{ value: "a", label: "a", sortOrder: 1 },
			{ value: "b", label: "b", sortOrder: 2 },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.value, "b");
		selectProps.set(SelectProps.propNames.showAllValue, "#All#");
		selectProps.set(SelectProps.propNames.showAllLabel, "Label");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const test = mountedComponent.find(SelectMUI);

		const mountedOptions = test.props().children;

		const optionsKeys = mountedOptions.map(option => option.key);

		expect(optionsKeys, "to equal", ["#All#", "c", "a", "b"]);
	});

	it("Sorts select options correctly with default sorting", () => {
		const options = [
			{ value: "c", label: "c", sortOrder: 3 },
			{ value: "a", label: "a", sortOrder: 1 },
			{ value: "b", label: "b", sortOrder: 2 },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.sortType, sortTypeEnum.default);
		selectProps.set(SelectProps.propNames.value, "b");
		selectProps.set(SelectProps.propNames.showAllValue, "#All#");
		selectProps.set(SelectProps.propNames.showAllLabel, "Label");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const test = mountedComponent.find(SelectMUI);

		const mountedOptions = test.props().children;

		const optionsKeys = mountedOptions.map(option => option.key);

		expect(optionsKeys, "to equal", ["#All#", "a", "b", "c"]);
	});

	it("Sorts select options correctly with alphabetical sorting", () => {
		const options = [
			{ value: "c", label: "c" },
			{ value: "a", label: "a" },
			{ value: "b", label: "b" },
			{ value: "d", label: "[d]" },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.sortType, sortTypeEnum.alphabetical);
		selectProps.set(SelectProps.propNames.value, "b");
		selectProps.set(SelectProps.propNames.showAllValue, "#All#");
		selectProps.set(SelectProps.propNames.showAllLabel, "Label");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const test = mountedComponent.find(SelectMUI);

		const mountedOptions = test.props().children;

		const optionsKeys = mountedOptions.map(option => option.key);

		expect(optionsKeys, "to equal", ["#All#", "d", "a", "b", "c"]);
	});

	it("Sorts select options correctly with numeric sorting", () => {
		const options = [
			{ value: "BRC-409 - BRC-PROMENADES", label: "BRC-409 - BRC-PROMENADES", sortOrder: "BRC-409 - BRC-PROMENADES" },
			{ value: "BRC-411 - BRC-CHAMPLAIN", label: "BRC-411 - BRC-CHAMPLAIN", sortOrder: "BRC-411 - BRC-CHAMPLAIN" },
			{ value: "BRC-410 - BRC-GALERIES", label: "BRC-410 - BRC-GALERIES", sortOrder: "BRC-410 - BRC-GALERIES" },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.sortType, sortTypeEnum.numeric);
		selectProps.set(SelectProps.propNames.value, "BRC-409 - BRC-PROMENADES");
		selectProps.set(SelectProps.propNames.showAllValue, "#All#");
		selectProps.set(SelectProps.propNames.showAllLabel, "Label");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const test = mountedComponent.find(SelectMUI);

		const mountedOptions = test.props().children;

		const optionsKeys = mountedOptions.map(option => option.key);

		expect(optionsKeys, "to equal", [
			"#All#",
			"BRC-409 - BRC-PROMENADES",
			"BRC-410 - BRC-GALERIES",
			"BRC-411 - BRC-CHAMPLAIN",
		]);
	});

	it("Select component handles change", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.update, update);
		selectProps.set(SelectProps.propNames.value, "aValue");

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		const selectMui = mountedComponent.find(SelectMUI);

		const event = {
			target: {
				value: "anotherValue",
			},
		};

		selectMui.invoke("onChange")(event);

		expect(update, "to have calls satisfying", [{ args: ["anotherValue"] }]);
	});

	it("Renders Icon Select component correctly", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.update, update);
		selectProps.set(SelectProps.propNames.value, "aValue");
		selectProps.set(SelectProps.propNames.iconSelect, true);

		const theme = createMuiTheme();

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		const expected = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<SelectMUI open={false} value="aValue" disableUnderline={true} IconComponent={SelectIconButton} error={false}>
					<MenuItem key="aValue" value="aValue">
						<TooltippedTypography children="aLabel" titleValue="aLabel" />
					</MenuItem>
					<MenuItem key="anotherValue" value="anotherValue">
						<TooltippedTypography noWrap children="anotherLabel" titleValue="anotherLabel" />
					</MenuItem>
				</SelectMUI>
			</TestWrapper>
		);

		expect(component, "when mounted", "to satisfy", expected);
	});

	it("Changes Icon Select open state on click", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.update, update);
		selectProps.set(SelectProps.propNames.value, "aValue");
		selectProps.set(SelectProps.propNames.iconSelect, true);

		const theme = createMuiTheme();

		const component = (
			<TestWrapper stylesProvider muiThemeProvider={{ theme }}>
				<Select options={options} selectProps={selectProps} />
			</TestWrapper>
		);

		const mountedComponent = mount(component);

		let muiSelect = mountedComponent.find(SelectMUI);

		expect(muiSelect.prop("open"), "to be false");

		muiSelect.invoke("onClick")();

		muiSelect = mountedComponent.find(SelectMUI);

		expect(muiSelect.prop("open"), "to be true");
	});
});
