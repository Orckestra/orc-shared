import { parseGuid } from "./parseHelper";

describe("parseGuid", () => {
  it("Retrieves parsed guid if passed string is correct guid", () => {
    const guid = "9d447e3eb6f14082b1847a1b1854e78f";

    const parsedGuid = parseGuid(guid);

    const expectedParsedGuid = "9d447e3e-b6f1-4082-b184-7a1b1854e78f"

    expect(parsedGuid, "to be", expectedParsedGuid);
  });

  it("Retrieves empty string if passed string is not correct guid", () => {
    const guid = "Not guid";

    const parsedGuid = parseGuid(guid);

    expect(parsedGuid, "to be", "");
  });
});