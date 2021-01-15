import Immutable from "immutable";
import { setModulesStructure } from "../actions/modules";
import modulesReducer from "./modules";

describe("View state reducer", () => {
  it("behaves as a reducer should", () =>
    expect(modulesReducer, "to be a reducer with initial state", {}));

  it("Sets module structure correctly", () => {
    const oldState = Immutable.Map({});

    const modules = {
      module1: {
        pages: {
          ':id1': {
            segments: {
              section11: {},
              section12: {}
            }
          }
        }
      },
      module2: {
        pages: {
          ':id2': {
            segments: {
              section21: {},
              section22: {},
              section23: {}
            }
          }
        }
      }
    };

    const expected = {
      module1: {
        pages: {
          ':id1': {
            infoBar: {},
            section11: {},
            section12: {}
          }
        }
      },
      module2: {
        pages: {
          ':id2': {
            infoBar: {},
            section21: {},
            section22: {},
            section23: {}
          }
        }
      }
    }

    const action = setModulesStructure(modules);
    const newState = modulesReducer(oldState, action);
    return expect(newState, "not to be", oldState).and(
      "to equal",
      Immutable.fromJS({ tree: expected })
    );
  });

  it("Sets module structure correctly with no pages", () => {
    const oldState = Immutable.Map({});

    const modules = {
      module1: {},
      module2: {}
    };

    const action = setModulesStructure(modules);
    const newState = modulesReducer(oldState, action);
    return expect(newState, "not to be", oldState).and(
      "to equal",
      Immutable.fromJS({ tree: modules })
    );
  });

  it("Sets module structure correctly with no segments", () => {
    const oldState = Immutable.Map({});

    const modules = {
      module1: {
        pages: {
          ':id1': {
          }
        }
      },
      module2: {
        pages: {
          ':id2': {
          }
        }
      }
    };

    const action = setModulesStructure(modules);
    const newState = modulesReducer(oldState, action);
    return expect(newState, "not to be", oldState).and(
      "to equal",
      Immutable.fromJS({ tree: modules })
    );
  });
});

