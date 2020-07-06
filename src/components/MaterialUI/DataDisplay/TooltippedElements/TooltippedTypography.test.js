import React from "react";
import { shallow } from "enzyme";
import TooltippedTypography from "./TooltippedTypography";

describe("TooltippedTypography", () => {
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