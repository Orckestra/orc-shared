import React from "react";
import { mount } from "enzyme";
import TitledSelect from "./TitledSelect";
import Select from "./../Select";
import SelectProps from "./../SelectProps";
import Typography from "@material-ui/core/Typography";

describe("TitledSelect", () => {
  const update = jest.fn();

  it("Renders title select properly", () => {
    const options = [
      { value: "aValue", label: "aLabel" },
      { value: "anotherValue", label: "anotherLabel" },
    ];
    const title = "title";

    const selectProps = new SelectProps();

    selectProps.set(SelectProps.propNames.update, update);
    selectProps.set(SelectProps.propNames.value, "aValue");

    const component = <TitledSelect options={options} title={title} selectProps={selectProps} />

    const expected = (
      <div>
        <Typography children={title} />
        <Select options={options} selectProps={selectProps} />
      </div>
    );

    expect(component, "when mounted", "to satisfy", expected);
  });
});