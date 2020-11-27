import { SET_MODULES_STRUCTURE, setModulesStructure } from "./modules";

describe("setModulesStructure", () => {
  it("creates an action object", () => {
    expect(setModulesStructure, "when called with", ["modules"], "to equal", {
      type: SET_MODULES_STRUCTURE,
      payload: "modules",
    });
  });
});