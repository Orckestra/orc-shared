import CollapsableListProps, { isCollapsableListProps } from "./collapsableListProps";

describe("Collapsable List Props", () => {
  it("Contains necessary props and rules keys", () => {
    const propNames = ["isExpanded", "hasMessage", "openMessage", "closeMessage", "expandPosition"];

    expect(CollapsableListProps.propNames, "to have keys", propNames);
  });

  it("Puts keys in component props and rules map", () => {
    const propNames = ["isExpanded", "hasMessage", "openMessage", "closeMessage", "expandPosition"];

    const collapsableListProps = new CollapsableListProps();

    const propKeys = Array.from(collapsableListProps.componentProps.keys());

    expect(propKeys, "to equal", propNames);
  });
});

describe("isCollapsableListProps", () => {
  it("Returns true if passed value is null", () => {
    expect(isCollapsableListProps(null), "to be true");
  });

  it("Returns false if passed value is not object", () => {
    expect(isCollapsableListProps("Not object"), "to be false");
  });

  it("Returns true if passed value type is CollapsableListProps", () => {
    expect(isCollapsableListProps(new CollapsableListProps()), "to be true");
  });

  it("Returns true if passed value has property _isCollapsableListProps and it's true", () => {
    expect(isCollapsableListProps({ _isCollapsableListProps: true }), "to be true");
  });

  it("Returns false if passed value has property _isChipProps and it's false or missing", () => {
    expect(isCollapsableListProps({}), "to be false");
    expect(isCollapsableListProps({ _isChipProps: false }), "to be false");
  });
});