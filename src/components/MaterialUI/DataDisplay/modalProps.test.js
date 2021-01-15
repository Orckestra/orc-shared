import ModalProps, { isModalProps } from "./modalProps";

describe("Modal Props", () => {
  it("Contains necessary props and rules keys", () => {
    const propNames = ["open", "title", "actionPanel", "backdropClickCallback"];

    expect(ModalProps.propNames, "to have keys", propNames);
  });

  it("Puts keys in component props and rules map", () => {
    const propNames = ["open", "title", "actionPanel", "backdropClickCallback"];
    const chipProps = new ModalProps();

    const propKeys = Array.from(chipProps.componentProps.keys());

    expect(propKeys, "to equal", propNames);
  });
});

describe("isModalProps", () => {
  it("Returns true if passed value is null", () => {
    expect(isModalProps(null), "to be true");
  });

  it("Returns false if passed value is not object", () => {
    expect(isModalProps("Not object"), "to be false");
  });

  it("Returns true if passed value type is ModalProps", () => {
    expect(isModalProps(new ModalProps()), "to be true");
  });

  it("Returns true if passed value has property _isModalProps and it's true", () => {
    expect(isModalProps({ _isModalProps: true }), "to be true");
  });

  it("Returns false if passed value has property _isModalProps and it's false or missing", () => {
    expect(isModalProps({}), "to be false");
    expect(isModalProps({ _isModalProps: false }), "to be false");
  });
});