import Immutable from "immutable";
import { SET_ROUTE, MAP_HREF, REMOVE_TAB } from "../actions/navigation";

const initialState = Immutable.fromJS({
	route: {},
	tabIndex: {},
	moduleTabs: {},
	mappedHrefs: {},
});

const navigationReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ROUTE:
			return state.withMutations(s => {
				s.set("route", Immutable.fromJS(action.payload));
				const { location, match } = action.payload;
				const href = location.pathname;
				s.setIn(
					["tabIndex", href],
					Immutable.fromJS({
						href,
						path: match.path,
						params: match.params,
					}),
				);
				const moduleName = match.path.replace(
					/^\/:scope\/(\w+)(?:\/.*)?$/,
					"$1",
				);
				const moduleList =
					s.getIn(["moduleTabs", moduleName]) || Immutable.List();
				if (!moduleList.includes(href)) {
					s.setIn(["moduleTabs", moduleName], moduleList.push(href));
				}
			});
		case MAP_HREF:
			return state.setIn(
				["mappedHrefs", action.payload.from],
				action.payload.to,
			);
		case REMOVE_TAB:
			return state.withMutations(s => {
				const list =
					s.getIn(["moduleTabs", action.payload.module]) || Immutable.List();
				const index = list.indexOf(action.payload.path);
				if (index !== -1) {
					s.deleteIn(["moduleTabs", action.payload.module, index]);
				}
				s.deleteIn(["tabIndex", action.payload.path]);
			});
		default:
			return state;
	}
};

export default navigationReducer;
