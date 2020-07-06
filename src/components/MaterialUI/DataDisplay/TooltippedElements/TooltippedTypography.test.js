import React, { Fragment } from "react";
import { shallow, mount } from "enzyme";
import TooltippedTypography from "./TooltippedTypography";

describe("TooltippedTypography", () => {
	it("should contain the forwarded ref in the child span", () => {
		const value = "tooltip title";

		const component = mount(<TooltippedTypography value={value} />);

		expect(component.prop("value"), "to be", value);
	});

	it("Passes parameters in HOC correctly", () => {
		const children = "text";
		const value = "tooltip title";
		const className = "class";

		const tooltippedTypography = (
			<TooltippedTypography children={children} className={className} value={value} />
		);

		const mountedComponent = shallow(tooltippedTypography);

		expect(mountedComponent.prop("children"), "to be", children);
		expect(mountedComponent.prop("value"), "to be", value);
		expect(mountedComponent.prop("className"), "to be", className);
	});
});
