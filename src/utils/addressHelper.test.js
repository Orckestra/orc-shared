import { buildInlineAddressFromObject } from "./addressHelper";

describe("buildInlineAddressFromObject", () => {
  it("Retrieves correct address when all used props exists in passed object", () => {
    const address = {
      line1: "Demer 26",
      line2: "Farmandstredet",
      postalCode: "3110"
    }

    const inlineAddress = buildInlineAddressFromObject(address);

    expect(inlineAddress, "to equal", "Demer 26 Farmandstredet 3110");
  });

  it("Retrieves correct address when  not all used props exists in passed object", () => {
    const address = {
      line1: "Demer 26",
      postalCode: "3110"
    }

    const inlineAddress = buildInlineAddressFromObject(address);

    expect(inlineAddress, "to equal", "Demer 26 3110");
  });
});