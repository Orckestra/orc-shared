import Immutable from "immutable";
import { LOCATION_CHANGED } from "redux-little-router";
import { REMOVE_TAB } from "../actions/navigation";
import { safeGet } from "../utils";

const initialState = Immutable.fromJS({
	tabIndex: {},
	moduleTabs: {},
	segmentHrefs: {},
});

const getModuleName = result =>
	result && (result.module || getModuleName(result.parent));

const navigationReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOCATION_CHANGED:
			if (safeGet(action, "payload", "result", "parent", "segments")) {
				const parentPath = action.payload.pathname.replace(/\/[^/]*$/, "");
				return state.setIn(
					["segmentHrefs", parentPath],
					action.payload.pathname,
				);
			}
			return state.withMutations(s => {
				if (!(action.payload.result && action.payload.result.title)) return;
				const title = action.payload.result.title;
				if (action.payload.result.title.id) {
					title.values = action.payload.params;
				}
				s.setIn(
					["tabIndex", action.payload.pathname],
					Immutable.fromJS({
						href: action.payload.pathname,
						label: title,
					}),
				);
				const moduleName = getModuleName(action.payload.result);
				if (moduleName) {
					const moduleList =
						s.getIn(["moduleTabs", moduleName]) || Immutable.List();
					if (!moduleList.includes(action.payload.pathname)) {
						s.setIn(
							["moduleTabs", moduleName],
							moduleList.push(action.payload.pathname),
						);
					}
				}
			});
		case REMOVE_TAB:
			return state.withMutations(s => {
				const list =
					s.getIn(["moduleTabs", action.payload.module]) || Immutable.List();
				s.deleteIn([
					"moduleTabs",
					action.payload.module,
					list.indexOf(action.payload.path),
				]);
				s.deleteIn(["tabIndex", action.payload.path]);
			});
		default:
			return state;
	}
};

export default navigationReducer;
