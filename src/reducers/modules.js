import Immutable from "immutable";
import {
	INITIALIZE_FIRST_MODULE_SCOPE,
	SET_MODULE_AS_VISIBLE,
	SET_MODULES_STRUCTURE,
	SET_ROUTING_PERFORMED,
} from "../actions/modules";
import { infoBar } from "./../constants";
import { APPLICATION_SCOPE_HAS_CHANGED } from "../actions/scopes";

const initialState = Immutable.fromJS({
	tree: {},
	visibleModules: [],
	lastScopeAndModuleSelection: {
		scope: null,
		moduleName: null,
		routingPerformed: true,
	},
});

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

		case INITIALIZE_FIRST_MODULE_SCOPE: {
			return state.setIn(["lastScopeAndModuleSelection", "scope"], action.payload);
		}

		case SET_MODULE_AS_VISIBLE: {
			const visibleModules = state.get("visibleModules").toJS();
			visibleModules.push(action.payload);

			return state.set("visibleModules", Immutable.fromJS(visibleModules));
		}

		case APPLICATION_SCOPE_HAS_CHANGED: {
			const lastScopeAndModuleSelection = state.get("lastScopeAndModuleSelection").toJS();

			if (action.payload.newScope !== lastScopeAndModuleSelection.scope) {
				state = state.set("visibleModules", Immutable.fromJS([]));
			}

			return state.set(
				"lastScopeAndModuleSelection",
				Immutable.fromJS({
					moduleName: action.payload.moduleName,
					scope: action.payload.newScope,
					routingPerformed: false,
				}),
			);
		}

		case SET_ROUTING_PERFORMED:
			return state.setIn(["lastScopeAndModuleSelection", "routingPerformed"], true);

		default:
			return state;
	}
};

export default viewStateReducer;
