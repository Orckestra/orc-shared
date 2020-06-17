import React from "react";
import { mount } from "enzyme";
import Tooltip from "./Tooltip";
import MuiTooltip from "@material-ui/core/Tooltip";

describe("Tooltip", () => {
  it("Renders Tooltip correctly", () => {
    const value = <p>123</p>;
    const title = "123";
    const component = <Tooltip value={value} title={title} />;

    const expected = (
      <MuiTooltip title={title} arrow>
        <div>
          {value}
        </div>
      </MuiTooltip>
    );

    const mountedComponent = mount(component);

    expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
  });

  it("Renders Tooltip correctly if no value was passed", () => {
    const component = <Tooltip />;

    const empty = "";

    const expected = (
      <MuiTooltip title={empty} arrow>
        <div>
          {empty}
        </div>
      </MuiTooltip>
    );

    const mountedComponent = mount(component);

    expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
  });

  it("Renders Tooltip correctly if no value was passed", () => {
    const component = <Tooltip />;

    const empty = "";

    const expected = (
      <MuiTooltip title={empty} arrow>
        <div>
          {empty}
        </div>
      </MuiTooltip>
    );

    const mountedComponent = mount(component);

    expect(mountedComponent.containsMatchingElement(expected), "to be truthy");
  });
});