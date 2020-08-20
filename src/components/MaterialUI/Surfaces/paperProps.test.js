import PaperProps from "./paperProps";

describe("Paper Props", () => {
  it("Contains necessary rule and prop names", () => {
    const propNames = ["elevation", "square", "variant"];
    const rulesNames = ["root"];

    expect(PaperProps.propNames, "to have keys", propNames);
    expect(PaperProps.ruleNames, "to have keys", rulesNames);
  });

  it("Puts keys in component props and classes maps", () => {
    const propNames = ["elevation", "square", "variant"];
    const rulesNames = ["root"];

    const paperProps = new PaperProps();

    const propNameKeys = Array.from(paperProps.componentProps.keys());
    const ruleNameKeys = Array.from(paperProps.componentClasses.keys());

    expect(propNameKeys, "to equal", propNames);
    expect(ruleNameKeys, "to equal", rulesNames);
  });
});