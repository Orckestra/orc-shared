import withDeferredTooltip from "./withDeferredTooltip";
import React from "react";
import { shallow } from "enzyme"
import MuiTooltip from "@material-ui/core/Tooltip";

describe("withDeferredTooltip", () => {
  const componentContent = (
    <div>
      <p>Test</p>
    </div>
  );

  const ComponentToBeTooltipped = (title) => {
    return (componentContent)
  }

  it("Rendenrs passed component if mouse enter event wasn't triggered", () => {
    const Wrapper = (props) => <ComponentToBeTooltipped {...props} />;

    const TooltippedCompponent = withDeferredTooltip(Wrapper);

    const mountedTooltippedComponent = shallow(<TooltippedCompponent title="test" />);

    expect(mountedTooltippedComponent.containsMatchingElement(<Wrapper />), "to be true");
  });

  it("Wraps passed component in Mui tooltip if mouse enter event was triggered", () => {
    const Wrapper = (props) => <ComponentToBeTooltipped {...props} />;

    const TooltippedCompponent = withDeferredTooltip(Wrapper);

    const mountedTooltippedComponent = shallow(<TooltippedCompponent title="test" />);

    const event = {
      target: {
        offsetWidth: 100,
        scrollWidth: 110
      }
    }

    mountedTooltippedComponent.find(Wrapper).invoke("onMouseEnter")(event);

    let expected = (
      <MuiTooltip title="test">
        <Wrapper />
      </MuiTooltip>
    );

    expect(mountedTooltippedComponent.containsMatchingElement(expected), "to be true");
  });

  it("Does not wrap passed component in Mui tooltip if scrollWidth is same as offsetWidth", () => {
    const Wrapper = (props) => <ComponentToBeTooltipped {...props} />;

    const TooltippedCompponent = withDeferredTooltip(Wrapper);

    const mountedTooltippedComponent = shallow(<TooltippedCompponent title="test" />);

    const event = {
      target: {
        offsetWidth: 100,
        scrollWidth: 100
      }
    }

    mountedTooltippedComponent.find(Wrapper).invoke("onMouseEnter")(event);

    expect(mountedTooltippedComponent.containsMatchingElement(<Wrapper />), "to be true");
  });
});