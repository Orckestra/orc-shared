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

  it("Uses paperProps root rule name correctly", () => {
    const paperProps = new PaperProps();

    paperProps.setStyle(PaperProps.ruleNames.root, "myclass");

    const component = <Paper paperProps={paperProps} />;

    const mountedComponent = mount(component);

    expect(mountedComponent.exists(".myclass"), "to be true");
  });
});