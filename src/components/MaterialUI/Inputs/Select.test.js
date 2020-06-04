import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import Select from "./Select";
import SelectMUI from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import sinon from "sinon";

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

	it("Renders Select component without errors", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		const component = <Select options={options} update={update} value={"aValue"} />;

		const mountedComponent = mount(component);
		const expected = (
			<SelectMUI>
				<MenuItem>aLabel</MenuItem>
				<MenuItem>anotherLabel</MenuItem>
			</SelectMUI>
		);

		expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
	});

	it("Select component hanldes change", () => {
		const options = [
			{ value: "aValue", label: "aLabel" },
			{ value: "anotherValue", label: "anotherLabel" },
		];

		ReactDOM.render(
			<Select options={options} update={update} value={"aValue"} />,
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
