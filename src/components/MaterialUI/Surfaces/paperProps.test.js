import PaperProps from "./paperProps";

describe("Paper Props", () => {
  it("Contains necessary rule names", () => {
    const rulesNames = ["root"];

    expect(PaperProps.ruleNames, "to have keys", rulesNames);
  });

  it("Puts keys in component classes map", () => {
    const rulesNames = ["root"];

    const paperProps = new PaperProps();

    const keys = Array.from(paperProps.componentClasses.keys());

    expect(keys, "to equal", rulesNames);
  });
});