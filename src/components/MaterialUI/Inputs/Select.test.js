import React from "react";
import { mount } from "enzyme";
import Select from "./Select";
import SelectMUI from "@material-ui/core/Select";
import sinon from "sinon";
import { ignoreConsoleError, createMuiTheme } from "../../../utils/testUtils";
import SelectProps from "./SelectProps";
import TooltippedTypography from "./../DataDisplay/TooltippedElements/TooltippedTypography";
import { MuiThemeProvider } from "@material-ui/core";

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
			expect(() => mount(component), "to throw a", TypeError);
		});
	});

	it("Renders Select component without errors", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.update, update);
		selectProps.set(SelectProps.propNames.value, "aValue");

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<Select options={options} selectProps={selectProps} />
			</MuiThemeProvider>
		);

		const mountedComponent = mount(component);

		const expected = <TooltippedTypography children="aLabel" noWrap titleValue="aLabel" />;

		expect(mountedComponent.containsMatchingElement(expected), "to be true");
	});

	it("Sorts select options correctly when numericSort is false", () => {
		const options = [
			{ value: "c", label: "c", sortOrder: 3 },
			{ value: "a", label: "a", sortOrder: 1 },
			{ value: "b", label: "b", sortOrder: 2 },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.numericSort, false);
		selectProps.set(SelectProps.propNames.value, "b");

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<Select options={options} selectProps={selectProps} />
			</MuiThemeProvider>
		);


		const mountedComponent = mount(component);

		const test = mountedComponent.find(SelectMUI);

		const mountedOptions = test.props().children;

		const optionsKeys = mountedOptions.map((option) => option.key);

		expect(optionsKeys, "to equal", ['#All#', 'a', 'b', 'c']);
	});

	it("Sorts select options correctly when numericSort is true", () => {
		const options = [
			{ value: "BRC-409 - BRC-PROMENADES", label: "BRC-409 - BRC-PROMENADES", sortOrder: "BRC-409 - BRC-PROMENADES" },
			{ value: "BRC-411 - BRC-CHAMPLAIN", label: "BRC-411 - BRC-CHAMPLAIN", sortOrder: "BRC-411 - BRC-CHAMPLAIN" },
			{ value: "BRC-410 - BRC-GALERIES", label: "BRC-410 - BRC-GALERIES", sortOrder: "BRC-410 - BRC-GALERIES" },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.numericSort, true);
		selectProps.set(SelectProps.propNames.value, "BRC-409 - BRC-PROMENADES");

		const component = (
			<MuiThemeProvider theme={createMuiTheme()}>
				<Select options={options} selectProps={selectProps} />
			</MuiThemeProvider>
		);

		const mountedComponent = mount(component);

		const test = mountedComponent.find(SelectMUI);

		const mountedOptions = test.props().children;

		const optionsKeys = mountedOptions.map((option) => option.key);

		expect(optionsKeys, "to equal", [
			'#All#',
			'BRC-409 - BRC-PROMENADES',
			'BRC-410 - BRC-GALERIES',
			'BRC-411 - BRC-CHAMPLAIN'
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
			<MuiThemeProvider theme={createMuiTheme()}>
				<Select options={options} selectProps={selectProps} />
			</MuiThemeProvider>
		);

		const mountedComponent = mount(component);

		const selectMui = mountedComponent.find(SelectMUI);

		const event = {
			target: {
				value: "anotherValue"
			}
		};

		selectMui.invoke("onChange")(event);

		expect(update, "to have calls satisfying", [{ args: ["anotherValue"] }]);
	});
});
