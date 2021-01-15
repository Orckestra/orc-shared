import Immutable from "immutable";
import {
  modulesSelector,
} from "./modules";

describe("modulesSelector", () => {
  let state;
  beforeEach(() => {
    state = Immutable.fromJS({
      modules: {
        tree: "modulesTree",
      },
    });
  });

  it("Retrieves modules", () => {
    expect(modulesSelector, "when called with", [state], "to equal", "modulesTree");
  });
});