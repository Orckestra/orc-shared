import Immutable from "immutable";
import {
  SET_MODULES_STRUCTURE,
} from "../actions/modules";
import { infoBar } from "./../constants";

const initialState = Immutable.Map({});

const viewStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODULES_STRUCTURE: {
      const modules = action.payload;
      const modulesTree = {};
      const moduleNames = Object.keys(modules);
      for (const moduleName of moduleNames) {
        modulesTree[moduleName] = {};
        const modulePages = modules[moduleName].pages;
        if (modulePages != null) {
          modulesTree[moduleName].pages = {};
          const pagesKeys = Object.keys(modulePages);
          for (const pageKey of pagesKeys) {
            modulesTree[moduleName].pages[pageKey] = {};
            const segments = modulePages[pageKey].segments;
            if (segments != null) {
              modulesTree[moduleName].pages[pageKey][infoBar] = {};
              const segmentsKeys = Object.keys(segments);
              for (const segmentKey of segmentsKeys) {
                modulesTree[moduleName].pages[pageKey][segmentKey.replace("/", "")] = {};
              }
            }
          }
        }
      }

      return state.set("tree", Immutable.fromJS(modulesTree));
    }
    default:
      return state;
  }
};

export default viewStateReducer;
