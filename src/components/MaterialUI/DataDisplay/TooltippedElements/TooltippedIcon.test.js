import React from "react";
import { shallow, mount } from "enzyme";
import TooltippedBadge from "./TooltippedIcon";

describe("TooltippedBadge", () => {
  it("Passes parameters in HOC correctly", () => {
    const children = "text";
    const titleValue = "tooltip title";
    const className = "class";
    const badge = "123";

    const tooltippedBadge = (
      <TooltippedBadge
        children={children}
        className={className}
        titleValue={titleValue}
        alwaysDisplay
        badge={badge}
      />
    );

    const mountedComponent = mount(tooltippedBadge);

    console.log(mountedComponent.debug());

    expect(mountedComponent.prop("children"), "to be", children);
    expect(mountedComponent.prop("className"), "to be", className);
    expect(mountedComponent.prop("badge"), "to be", badge);

    expect(mountedComponent.prop("titleValue"), "to be", titleValue);
  });
});
