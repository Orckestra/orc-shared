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
			return state.withMutations(s => {
				if (!action.payload.result) return;
				let parentPath;
				if (safeGet(action.payload.result, "parent", "mode") === "segments") {
					parentPath = action.payload.pathname.replace(/\/[^/]*$/, "");
					s.setIn(["segmentHrefs", parentPath], action.payload.pathname);
				}
				let title, path;
				if (safeGet(action.payload.result, "parent", "mode") === "segments") {
					title = safeGet(action.payload.result, "parent", "title");
					path = parentPath;
				} else {
					title = action.payload.result.title;
					path = action.payload.pathname;
				}
				if (!title) return;
				if (title.id) {
					title.values = action.payload.params;
				}
				s.setIn(
					["tabIndex", path],
					Immutable.fromJS({
						href: path,
						label: title,
					}),
				);
				const moduleName = getModuleName(action.payload.result);
				if (moduleName) {
					const moduleList =
						s.getIn(["moduleTabs", moduleName]) || Immutable.List();
					if (!moduleList.includes(path)) {
						s.setIn(["moduleTabs", moduleName], moduleList.push(path));
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
