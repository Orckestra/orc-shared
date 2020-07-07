import React from "react";
import { shallow } from "enzyme";
import TooltippedTypography from "./TooltippedTypography";

describe("TooltippedTypography", () => {
  it("Passes parameters in HOC correctly", () => {
    const children = "text";
    const titleValue = "tooltip title";
    const className = "class";

    const tooltippedTypography = (
      <TooltippedTypography children={children} className={className} titleValue={titleValue} />
    );

    const mountedComponent = shallow(tooltippedTypography);

    expect(mountedComponent.prop("children"), "to be", children);
    expect(mountedComponent.prop("className"), "to be", className);

    expect(mountedComponent.prop("titleValue"), "to be", undefined);
  });
});