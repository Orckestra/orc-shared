import React from "react";
import { mount } from "enzyme";
import Tooltip from "./Tooltip";
import MuiTooltip from "@material-ui/core/Tooltip";

describe("Tooltip", () => {
  it("Renders Tooltip correctly", () => {
    const value = "123";
    const component = <Tooltip value={value} />;

    const expected = (
      <MuiTooltip title={value} arrow>
        <div>
          123
        </div>
      </MuiTooltip>
    );

    const mountedComponent = mount(component);

    expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
  });
});