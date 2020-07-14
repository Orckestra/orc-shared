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

		const component = <Select options={options} selectProps={selectProps} />;

		const mountedComponent = mount(component);
		const expected = (
			<SelectMUI>
				<MenuItem><TooltippedTypography children="aLabel" noWrap titleValue="aLabel" /></MenuItem>
				<MenuItem><TooltippedTypography children="anotherLabel" noWrap titleValue="anotherLabel" /></MenuItem>
			</SelectMUI>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Select component handles change", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const selectProps = new SelectProps();

		selectProps.set(SelectProps.propNames.update, update);
		selectProps.set(SelectProps.propNames.value, "aValue");

		ReactDOM.render(<Select options={options} selectProps={selectProps} />, container);

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
