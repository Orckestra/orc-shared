import React from "react";
import { mount, shallow } from "enzyme";
import Chip from "./Chip";
import ChipProps from "./chipProps";
import { ignoreConsoleError } from "~/utils/testUtils";
import ChipMui from '@material-ui/core/Chip';

describe("Chip", () => {
  it("Throws an error if chipProps has wrong type", () => {
    ignoreConsoleError(() => {
      const component = <Chip chipProps="Wrong Type" />;
      expect(() => shallow(component), "to throw a", TypeError);
    });
  });

  it("Renders Chip propely", () => {
    const component = <Chip />;

    const mountedComponent = mount(component);
    const expected = <ChipMui />

    expect(mountedComponent.containsMatchingElement(expected), "to be true");
  });

  it("Uses passed avatar for avatar property", () => {
    const chipProps = new ChipProps();
    const avatar = <p>avatar</p>;
    chipProps.set(ChipProps.propNames.avatar, avatar);
    const component = <Chip chipProps={chipProps} />;

    const mountedComponent = mount(component);

    const chipMui = mountedComponent.find(ChipMui);

    expect(chipMui.containsMatchingElement(avatar), "to be true");
  });

  it("Uses passed clickable for clickable property", () => {
    const chipProps = new ChipProps();
    chipProps.set(ChipProps.propNames.clickable, true);
    const component = <Chip chipProps={chipProps} />;

    const mountedComponent = mount(component);

    const chipMui = mountedComponent.find(ChipMui);

    expect(chipMui.prop("clickable"), "to be true");
  });

  it("Uses passed disabled for disabled property", () => {
    const chipProps = new ChipProps();
    chipProps.set(ChipProps.propNames.disabled, true);
    const component = <Chip chipProps={chipProps} />;

    const mountedComponent = mount(component);

    const chipMui = mountedComponent.find(ChipMui);

    expect(chipMui.prop("disabled"), "to be true");
  });

  it("Uses passed onDelete for onDelete property", () => {
    const chipProps = new ChipProps();
    const onDelete = jest.fn();
    chipProps.set(ChipProps.propNames.onDelete, onDelete);
    const component = <Chip chipProps={chipProps} />;

    const mountedComponent = mount(component);

    const chipMui = mountedComponent.find(ChipMui);

    expect(chipMui.prop("onDelete"), "to equal", onDelete);
  });

  it("Uses passed variant for variant property", () => {
    const chipProps = new ChipProps();
    const variant = 'outlined';
    chipProps.set(ChipProps.propNames.variant, variant);
    const component = <Chip chipProps={chipProps} />;

    const mountedComponent = mount(component);

    const chipMui = mountedComponent.find(ChipMui);

    expect(chipMui.prop("variant"), "to equal", variant);
  });

  it("Uses passed class for root ruleName", () => {
    const chipProps = new ChipProps();
    const testClassRoot = "testClassRoot";
    chipProps.setStyle(ChipProps.ruleNames.root, testClassRoot);
    const component = <Chip chipProps={chipProps} />;

    const mountedComponent = mount(component);

    expect(mountedComponent.exists(".testClassRoot"), "to be true");
  });

  it("Uses fallback values if poperties are not passed", () => {
    const component = <Chip />;
    const mountedComponent = shallow(component);

    expect(mountedComponent.prop("avatar"), "to equal", null);
    expect(mountedComponent.prop("clickable"), "to equal", false);
    expect(mountedComponent.prop("disabled"), "to equal", false);
    expect(mountedComponent.prop("onDelete"), "to equal", null);
    expect(mountedComponent.prop("variant"), "to equal", "default");
  });
});