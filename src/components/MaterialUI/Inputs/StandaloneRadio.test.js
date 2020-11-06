import React from "react";
import { mount, shallow } from "enzyme";
import StandaloneRadio from "./StandaloneRadio";
import RadioProps from "./standaloneRadioProps";
import { ignoreConsoleError, generateClassName, createMuiTheme } from "~/utils/testUtils";
import RadioMui from '@material-ui/core/Radio';
import sinon from "sinon";
import ReactDOM from "react-dom";
import { StylesProvider } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core";

describe("Radio", () => {
  it("Throws an error if radioProps has wrong type", () => {
    ignoreConsoleError(() => {
      const component = <StandaloneRadio radioProps="Wrong Type" />;
      expect(() => mount(component), "to throw a", TypeError).then((error) => {
        expect(error, "to have message", "radioProps property is not of type RadioProps")
      });
    });
  });

  it("Renders Radio propely", () => {
    const component = <StandaloneRadio />;

    const mountedComponent = mount(component);
    const expected = <RadioMui />

    expect(mountedComponent.containsMatchingElement(expected), "to be true");
  });

  it("Uses passed checked for checked property", () => {
    const radioProps = new RadioProps();
    radioProps.set(RadioProps.propNames.checked, true);
    const component = <StandaloneRadio radioProps={radioProps} />;

    const mountedComponent = mount(component);

    const radioMui = mountedComponent.find(RadioMui);

    expect(radioMui.prop("checked"), "to be true");
  });

  it("Uses passed disabled for disabled property", () => {
    const radioProps = new RadioProps();
    radioProps.set(RadioProps.propNames.disabled, true);
    const component = <StandaloneRadio radioProps={radioProps} />;

    const mountedComponent = mount(component);

    const radioMui = mountedComponent.find(RadioMui);

    expect(radioMui.prop("disabled"), "to be true");
  });

  it("Uses passed onChange for onChange property", () => {
    const radioProps = new RadioProps();

    let onChange = sinon.spy().named("onChange");
    radioProps.set(RadioProps.propNames.onChange, onChange);
    radioProps.set(RadioProps.propNames.name, "name");
    radioProps.set(RadioProps.propNames.value, "value");

    const component = <StandaloneRadio radioProps={radioProps} />;

    let container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(component, container);

    const click = document.createEvent("MouseEvents");
    click.initEvent("click", true, false);

    let element = container.querySelector(`span.MuiIconButton-label input[value="value"]`);
    element.dispatchEvent(click);
    expect(onChange, "to have calls satisfying", [{ args: ["value", "name"] }]);
  });

  it("Uses passed value for value property", () => {
    const radioProps = new RadioProps();
    const value = "value";
    radioProps.set(RadioProps.propNames.value, value);
    const component = <StandaloneRadio radioProps={radioProps} />;

    const mountedComponent = mount(component);

    const radioMui = mountedComponent.find(RadioMui);

    expect(radioMui.prop("value"), "to equal", value);
  });

  it("Uses passed name for name property", () => {
    const radioProps = new RadioProps();
    const name = "name";
    radioProps.set(RadioProps.propNames.name, name);
    const component = <StandaloneRadio radioProps={radioProps} />;

    const mountedComponent = mount(component);

    const radioMui = mountedComponent.find(RadioMui);

    expect(radioMui.prop("name"), "to equal", name);
  });

  it("Uses passed size for size property", () => {
    const radioProps = new RadioProps();
    const size = "small";
    radioProps.set(RadioProps.propNames.size, size);
    const component = <StandaloneRadio radioProps={radioProps} />;

    const mountedComponent = mount(component);

    const radioMui = mountedComponent.find(RadioMui);

    expect(radioMui.prop("size"), "to equal", size);
  });

  it("Uses passed inputProps for inputProps property", () => {
    const radioProps = new RadioProps();
    const inputProps = { prop: "value" };
    radioProps.set(RadioProps.propNames.inputProps, inputProps);
    const component = <StandaloneRadio radioProps={radioProps} />;

    const mountedComponent = mount(component);

    const radioMui = mountedComponent.find(RadioMui);

    expect(radioMui.prop("inputProps"), "to equal", inputProps);
  });

  it("Uses passed class for root ruleName", () => {
    const radioProps = new RadioProps();
    const testClassRoot = "testClassRoot";
    radioProps.setStyle(RadioProps.ruleNames.root, testClassRoot);
    const component = <StandaloneRadio radioProps={radioProps} />;

    const mountedComponent = mount(component);

    expect(mountedComponent.exists(".testClassRoot"), "to be true");
  });

  it("Uses fallback values if poperties are not passed", () => {
    const component = <StandaloneRadio />;
    const mountedComponent = shallow(component);

    expect(mountedComponent.prop("checked"), "to equal", false);
    expect(mountedComponent.prop("disabled"), "to equal", false);
    expect(mountedComponent.prop("onChange"), "to equal", null);
    expect(mountedComponent.prop("size"), "to equal", "medium");
    expect(mountedComponent.prop("value"), "to equal", undefined);
    expect(mountedComponent.prop("inputProps"), "to equal", null);
    expect(mountedComponent.prop("name"), "to equal", null);
  });

  it("Use proper class if radio is not read only and checked", () => {
    const radioProps = new RadioProps();
    radioProps.set(RadioProps.propNames.readOnly, false);
    radioProps.set(RadioProps.propNames.checked, true);
    const component =
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={createMuiTheme()}>
          <StandaloneRadio radioProps={radioProps} />
        </MuiThemeProvider>
      </StylesProvider>

    const mountedComponent = mount(component);

    expect(mountedComponent.exists(".makeStyles-radioIconChecked"), "to be true");
  });

  it("Use proper class if radio is read only and checked", () => {
    const radioProps = new RadioProps();
    radioProps.set(RadioProps.propNames.readOnly, true);
    radioProps.set(RadioProps.propNames.checked, true);
    const component =
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={createMuiTheme()}>
          <StandaloneRadio radioProps={radioProps} />
        </MuiThemeProvider>
      </StylesProvider>

    const mountedComponent = mount(component);

    expect(mountedComponent.exists(".makeStyles-radioReadOnlyChecked"), "to be true");
  });

  it("Use proper class if radio is not read only and not checked", () => {
    const radioProps = new RadioProps();
    radioProps.set(RadioProps.propNames.readOnly, false);
    radioProps.set(RadioProps.propNames.checked, false);
    const component =
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={createMuiTheme()}>
          <StandaloneRadio radioProps={radioProps} />
        </MuiThemeProvider>
      </StylesProvider>

    const mountedComponent = mount(component);

    expect(mountedComponent.exists(".makeStyles-radioIcon"), "to be true");
  });

  it("Use proper class if radio is read only and not checked", () => {
    const radioProps = new RadioProps();
    radioProps.set(RadioProps.propNames.readOnly, true);
    radioProps.set(RadioProps.propNames.checked, false);
    const component =
      <StylesProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={createMuiTheme()}>
          <StandaloneRadio radioProps={radioProps} />
        </MuiThemeProvider>
      </StylesProvider>

    const mountedComponent = mount(component);

    expect(mountedComponent.exists(".makeStyles-radioReadOnly"), "to be true");
  });
});