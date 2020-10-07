import RadioProps, { isRadioProps } from "./radioProps";

describe("Radio Props", () => {
  it("Contains necessary props and rules keys", () => {
    const propNames = ["checked", "disabled", "onChange", "size", "value", "inputProps"];
    const ruleNames = ["root"];

    expect(RadioProps.propNames, "to have keys", propNames);
    expect(RadioProps.ruleNames, "to have keys", ruleNames);
  });

  it("Puts keys in component props and rules map", () => {
    const propNames = ["checked", "disabled", "onChange", "size", "value", "inputProps"];
    const ruleNames = ["root"];

    const radioProps = new RadioProps();

    const propKeys = Array.from(radioProps.componentProps.keys());
    const ruleKeys = Array.from(radioProps.componentClasses.keys());

    expect(propKeys, "to equal", propNames);
    expect(ruleKeys, "to equal", ruleNames);
  });
});

describe("isRadioProps", () => {
  it("Returns true if passed value is null", () => {
    expect(isRadioProps(null), "to be true");
  });

  it("Returns false if passed value is not object", () => {
    expect(isRadioProps("Not object"), "to be false");
  });

  it("Returns true if passed value type is RadioProps", () => {
    expect(isRadioProps(new RadioProps()), "to be true");
  });

  it("Returns true if passed value has property _isRadioProps and it's true", () => {
    expect(isRadioProps({ _isRadioProps: true }), "to be true");
  });

  it("Returns false if passed value has property _isRadioProps and it's false or missing", () => {
    expect(isRadioProps({}), "to be false");
    expect(isRadioProps({ _isRadioProps: false }), "to be false");
  });
});