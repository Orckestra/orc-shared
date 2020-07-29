import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import Select from "./Select";
import SelectMUI from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import sinon from "sinon";
import { ignoreConsoleError } from "../../../utils/testUtils";
import SelectProps from "./SelectProps";
import TooltippedTypography from "./../DataDisplay/TooltippedElements/TooltippedTypography";
import createThemes from "../muiThemes";
import { MuiThemeProvider } from "@material-ui/core";

describe("Select Component", () => {
	let update, container, muiTheme;
	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);
		update = sinon.spy().named("update");

		const applicationTheme = {
			primary: { main: "#1F5B7F" },
		};

		const themes = createThemes(applicationTheme, {});

		muiTheme = themes.muiTheme;
	});
	afterEach(() => {
		document.body.removeChild(container);
		container = null;
	});

	it("Fails if selectProps has wrong type", () => {
		ignoreConsoleError(() => {
			const component = <Select selectProps="Wrong type" />;
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

		ReactDOM.render(
			<MuiThemeProvider theme={muiTheme}>
				<Select options={options} selectProps={selectProps} />
			</MuiThemeProvider>,
			container,
		);

		const element = container.querySelector(".MuiSelect-root");
		expect(element, "not to be", null);
	});

	it("Select component handles change", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.update, update);
		selectProps.set(SelectProps.propNames.value, "aValue");

		ReactDOM.render(
			<MuiThemeProvider theme={muiTheme}>
				<Select options={options} selectProps={selectProps} />
			</MuiThemeProvider>,
			container,
		);

		const mousedownEvent = document.createEvent("MouseEvents");
		mousedownEvent.initEvent("mousedown", true, false);

		const clickEvent = document.createEvent("MouseEvents");
		clickEvent.initEvent("click", true, false);

		// Open the selector
		const element = container.querySelector(".MuiSelect-root");
		element.dispatchEvent(mousedownEvent);

		const menuItem = document.querySelectorAll("li")[1] || null;
		expect(menuItem, "not to be", null);

		menuItem.dispatchEvent(clickEvent);
		expect(update, "to have calls satisfying", [{ args: ["anotherValue"] }]);
	});
});
