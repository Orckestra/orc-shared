import React from "react";
import { mount } from "enzyme";
import TooltippedIcon from "./TooltippedIcon";
import Icon from "../Icon";

describe("TooltippedIcon", () => {
	it("props should be configured correctly", () => {
		const titleValue = "tooltip title";

		const component = mount(<TooltippedIcon titleValue={titleValue} id="info" />);

		expect(component.prop("titleValue"), "to be", titleValue);

		const icon = component.find(Icon);

		expect(icon.prop("id"), "to be", "info");
	});
});
