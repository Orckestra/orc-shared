import React from "react";
import { mount, shallow } from "enzyme";
import Radio from "./Radio";
import RadioProps from "./radioProps";
import { ignoreConsoleError } from "~/utils/testUtils";
import RadioMui from '@material-ui/core/Radio';

describe("Radio", () => {
  it("Throws an error if radioProps has wrong type", () => {
    ignoreConsoleError(() => {
      const component = <Radio radioProps="Wrong Type" />;
      expect(() => mount(component), "to throw a", TypeError).then((error) => {
        expect(error, "to have message", "radioProps property is not of type RadioProps")
      });
    });
  });

  it("Renders Radio propely", () => {
    const component = <Radio />;

    const mountedComponent = mount(component);
    const expected = <RadioMui />

    expect(mountedComponent.containsMatchingElement(expected), "to be true");
  });

  it("Uses passed checked for checked property", () => {
    const radioProps = new RadioProps();
    radioProps.set(RadioProps.propNames.checked, true);
    const component = <Radio radioProps={radioProps} />;

    const mountedComponent = mount(component);

    const radioMui = mountedComponent.find(RadioMui);

    expect(radioMui.prop("checked"), "to be true");
  });

  it("Uses passed disabled for disabled property", () => {
    const radioProps = new RadioProps();
    radioProps.set(RadioProps.propNames.disabled, true);
    const component = <Radio radioProps={radioProps} />;

    const mountedComponent = mount(component);

    const radioMui = mountedComponent.find(RadioMui);

    expect(radioMui.prop("disabled"), "to be true");
  });

  it("Uses passed onDelete for onDelete property", () => {
    const radioProps = new RadioProps();
    const onChange = jest.fn();
    radioProps.set(RadioProps.propNames.onChange, onChange);
    const component = <Radio radioProps={radioProps} />;

    const mountedComponent = mount(component);

    const radioMui = mountedComponent.find(RadioMui);

    expect(radioMui.prop("onChange"), "to equal", onChange);
  });

  it("Uses passed value for value property", () => {
    const radioProps = new RadioProps();
    const value = "value";
    radioProps.set(RadioProps.propNames.value, value);
    const component = <Radio radioProps={radioProps} />;

    const mountedComponent = mount(component);

    const radioMui = mountedComponent.find(RadioMui);

    expect(radioMui.prop("value"), "to equal", value);
  });

  it("Uses passed size for size property", () => {
    const radioProps = new RadioProps();
    const size = "small";
    radioProps.set(RadioProps.propNames.size, size);
    const component = <Radio radioProps={radioProps} />;

    const mountedComponent = mount(component);

    const radioMui = mountedComponent.find(RadioMui);

    expect(radioMui.prop("size"), "to equal", size);
  });

  it("Uses passed inputProps for inputProps property", () => {
    const radioProps = new RadioProps();
    const inputProps = { prop: "value" };
    radioProps.set(RadioProps.propNames.inputProps, inputProps);
    const component = <Radio radioProps={radioProps} />;

    const mountedComponent = mount(component);

    const radioMui = mountedComponent.find(RadioMui);

    expect(radioMui.prop("inputProps"), "to equal", inputProps);
  });

  it("Uses passed class for root ruleName", () => {
    const radioProps = new RadioProps();
    const testClassRoot = "testClassRoot";
    radioProps.setStyle(RadioProps.ruleNames.root, testClassRoot);
    const component = <Radio radioProps={radioProps} />;

    const mountedComponent = mount(component);

    expect(mountedComponent.exists(".testClassRoot"), "to be true");
  });

  it("Uses fallback values if poperties are not passed", () => {
    const component = <Radio />;
    const mountedComponent = shallow(component);

    expect(mountedComponent.prop("checked"), "to equal", false);
    expect(mountedComponent.prop("disabled"), "to equal", false);
    expect(mountedComponent.prop("onChange"), "to equal", null);
    expect(mountedComponent.prop("size"), "to equal", "medium");
    expect(mountedComponent.prop("value"), "to equal", undefined);
    expect(mountedComponent.prop("inputProps"), "to equal", null);
  });
});