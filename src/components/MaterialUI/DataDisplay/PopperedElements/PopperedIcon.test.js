import React from "react";
import { shallow, mount } from "enzyme";
import PopperedIcon from "./PopperedIcon";

describe("PopperedIcon", () => {
  it("Passes parameters in HOC correctly", () => {
    const popperValue = "popper value";
    const className = "class";
    const id = "icon";

    const popperedIcon = <PopperedIcon popperValue={popperValue} className={className} id={id} />

    const mountedComponent = mount(popperedIcon);

    expect(mountedComponent.prop("popperValue"), "to be", popperValue);
    expect(mountedComponent.prop("className"), "to be", className);
    expect(mountedComponent.prop("id"), "to be", id);
  });
});
