import ChipProps from "./chipProps";

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