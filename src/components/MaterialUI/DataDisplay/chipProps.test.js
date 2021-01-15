import ChipProps, { isChipProps } from "./chipProps";

describe("Chip Props", () => {
  it("Contains necessary props and rules keys", () => {
    const propNames = ["avatar", "clickable", "disabled", "onDelete", "variant"];
    const ruleNames = ["root"];

    expect(ChipProps.propNames, "to have keys", propNames);
    expect(ChipProps.ruleNames, "to have keys", ruleNames);
  });

  it("Puts keys in component props and rules map", () => {
    const propNames = ["avatar", "clickable", "disabled", "onDelete", "variant"];
    const ruleNames = ["root"];

    const chipProps = new ChipProps();

    const propKeys = Array.from(chipProps.componentProps.keys());
    const ruleKeys = Array.from(chipProps.componentClasses.keys());

    expect(propKeys, "to equal", propNames);
    expect(ruleKeys, "to equal", ruleNames);
  });
});

describe("isChipProps", () => {
  it("Returns true if passed value is null", () => {
    expect(isChipProps(null), "to be true");
  });

  it("Returns false if passed value is not object", () => {
    expect(isChipProps("Not object"), "to be false");
  });

  it("Returns true if passed value type is ChipProps", () => {
    expect(isChipProps(new ChipProps()), "to be true");
  });

  it("Returns true if passed value has property _isChipProps and it's true", () => {
    expect(isChipProps({ _isChipProps: true }), "to be true");
  });

  it("Returns false if passed value has property _isChipProps and it's false or missing", () => {
    expect(isChipProps({}), "to be false");
    expect(isChipProps({ _isChipProps: false }), "to be false");
  });
});