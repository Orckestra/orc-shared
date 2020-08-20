import React from "react";
import MuiPaper from '@material-ui/core/Paper';
import PaperProps from "./paperProps";
import Paper from "./Paper";
import { ignoreConsoleError } from "../../../utils/testUtils";
import { shallow, mount } from "enzyme";

describe("Paper", () => {
  it("Renders paper with passed content", () => {
    const content = (
      <div>
        <p>Hello</p>
      </div>
    );

    const paper = <Paper content={content} />;

    const mountedPaper = shallow(paper);

    const expected = (
      <MuiPaper>
        {content}
      </MuiPaper>
    );

    expect(mountedPaper.containsMatchingElement(expected), "to be true");
  });

  it("Fails if paperProps has wrong type", () => {
    ignoreConsoleError(() => {
      const component = <Paper paperProps="Wrong type" />;
      expect(() => shallow(component), "to throw a", TypeError);
    });
  });

  it("Uses elevation prop correctly when it's passed", () => {
    const paperProps = new PaperProps();

    paperProps.set(PaperProps.propNames.elevation, 16);

    const component = <Paper paperProps={paperProps} />;

    const mountedComponent = mount(component);

    const muiPaper = mountedComponent.find(MuiPaper);

    expect(muiPaper.prop("elevation"), "to equal", 16);
  });

  it("Uses elevation prop correctly when it's not passed", () => {
    const component = <Paper />;

    const mountedComponent = mount(component);

    const muiPaper = mountedComponent.find(MuiPaper);

    expect(muiPaper.prop("elevation"), "to equal", 0);
  });

  it("Uses square prop correctly when it's passed", () => {
    const paperProps = new PaperProps();

    paperProps.set(PaperProps.propNames.square, true);

    const component = <Paper paperProps={paperProps} />;

    const mountedComponent = mount(component);

    const muiPaper = mountedComponent.find(MuiPaper);

    expect(muiPaper.prop("square"), "to be true");
  });

  it("Uses square prop correctly when it's not passed", () => {
    const component = <Paper />;

    const mountedComponent = mount(component);

    const muiPaper = mountedComponent.find(MuiPaper);

    expect(muiPaper.prop("square"), "to be false");
  });

  it("Uses variant prop correctly when it's passed", () => {
    const paperProps = new PaperProps();

    paperProps.set(PaperProps.propNames.variant, "elevation");

    const component = <Paper paperProps={paperProps} />;

    const mountedComponent = mount(component);

    const muiPaper = mountedComponent.find(MuiPaper);

    expect(muiPaper.prop("variant"), "to equal", "elevation");
  });

  it("Uses variant prop correctly when it's not passed", () => {
    const component = <Paper />;

    const mountedComponent = mount(component);

    const muiPaper = mountedComponent.find(MuiPaper);

    expect(muiPaper.prop("variant"), "to equal", "outlined");
  });

  it("Uses root rule name correctly", () => {
    const paperProps = new PaperProps();

    paperProps.setStyle(PaperProps.ruleNames.root, "myclass");

    const component = <Paper paperProps={paperProps} />;

    const mountedComponent = mount(component);

    expect(mountedComponent.exists(".myclass"), "to be true");
  });
});