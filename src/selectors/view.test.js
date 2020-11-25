import Immutable from "immutable";
import {
  isEntityUnderEditing,
  getModifiedSections
} from "./view";

describe("isEntityUnderEditing", () => {
  let state, stateWithEmptyEdit;
  beforeEach(() => {
    state = Immutable.fromJS({
      view: {
        edit: {
          module1: {
            id1: {
              section1: {}
            }
          }
        },
      },
      navigation: {
        route: { match: { path: "/:scope/module1/id1/section1" } },
        config: { prependPath: "/:scope/", prependHref: "/scope/" },
      }
    });
    stateWithEmptyEdit = Immutable.fromJS({
      view: {},
      navigation: {
        route: { match: { path: "/:scope/module1/id1/section1" } },
        config: { prependPath: "/:scope/", prependHref: "/scope/" },
      }
    })
  });

  it("Retrieves true if specified entity is under editing", () => {
    expect(isEntityUnderEditing, "when called with", ["id1"], "called with", [state], "to satisfy", true);
  });

  it("Retrieves false if specified entity is not under editing or not found", () => {
    expect(isEntityUnderEditing, "when called with", ["id12"], "called with", [state], "to satisfy", false);
  });

  it("Retrieves false if edit is missing from the store", () => {
    expect(isEntityUnderEditing, "when called with", ["id2"], "called with", [stateWithEmptyEdit], "to satisfy", false);
  });
});

describe("getModifiedSections", () => {
  let state, stateWithEmptyEdit;
  beforeEach(() => {
    state = Immutable.fromJS({
      view: {
        edit: {
          module1: {
            id1: {
              section1: {
                wasEdited: false
              },
              section2: {
                wasEdited: true
              }
            }
          }
        },
      },
      navigation: {
        route: { match: { path: "/:scope/module1/id1/section1" } },
        config: { prependPath: "/:scope/", prependHref: "/scope/" },
      }
    });

    stateWithEmptyEdit = Immutable.fromJS({
      view: {},
      navigation: {
        route: { match: { path: "/:scope/module1/id1/section1" } },
        config: { prependPath: "/:scope/", prependHref: "/scope/" },
      }
    })
  });

  it("Retrieves modified sections", () => {
    expect(getModifiedSections, "when called with", ["id1"], "called with", [state], "to satisfy", ["section2"]);
  });

  it("Retrieves empty array if no sections found or no sections were modified", () => {
    expect(getModifiedSections, "when called with", ["id2"], "called with", [state], "to satisfy", []);
  });

  it("Retrieves empty array if edit is missing from the store", () => {
    expect(getModifiedSections, "when called with", ["id2"], "called with", [stateWithEmptyEdit], "to satisfy", []);
  });
});