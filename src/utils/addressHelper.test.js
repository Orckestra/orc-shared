import { buildInlineAddressFromObject } from "./addressHelper";

describe("buildInlineAddressFromObject", () => {
  it("Retrieves correct address when all used props exists in passed object", () => {
    const address = {
      line1: "Demer 26",
      line2: "Farmandstredet",
      postalCode: "3110",
      country: "Canada",
      city: "Montreal",
      regionCode: "CA-AB"
    }

    const inlineAddress = buildInlineAddressFromObject(address);

    expect(inlineAddress, "to equal", "Demer 26 Farmandstredet, Montreal, CA-AB, 3110, Canada");
  });

  it("Retrieves correct address when  not all used props exists in passed object", () => {
    const address = {
      line1: "Demer 26",
      postalCode: "3110",
      country: "Canada",
      city: "Montreal",
      regionCode: "CA-AB"
    }

    const inlineAddress = buildInlineAddressFromObject(address);

    expect(inlineAddress, "to equal", "Demer 26, Montreal, CA-AB, 3110, Canada");
  });
});