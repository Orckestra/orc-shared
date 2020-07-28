import React from "react";
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
		const titleValue = "tooltip title";
		const className = "class";

		const tooltippedTypography = (
			<TooltippedTypography
				children={children}
				className={className}
				titleValue={titleValue}
			/>
		);

		const mountedComponent = shallow(tooltippedTypography);

		expect(mountedComponent.prop("children"), "to be", children);
		expect(mountedComponent.prop("className"), "to be", className);

		expect(mountedComponent.prop("titleValue"), "to be", undefined);
	});
});
