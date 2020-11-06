import Immutable from "immutable";
import { SET_ROUTE, MAP_HREF, REMOVE_TAB, SET_HREF_CONFIG } from "../actions/navigation";
import { unwrapImmutable } from "../utils";
import { getAllAfterPrependHref } from "../utils/parseHelper";

const initialState = Immutable.fromJS({
	route: {},
	tabIndex: {},
	moduleTabs: {},
	mappedHrefs: {},
	config: {},
});

const navigationReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ROUTE:
			return state.withMutations(s => {
				const { prependPath, prependHref } = unwrapImmutable(s.get("config"));

				s.set("route", Immutable.fromJS(action.payload));
				const {
					location: { pathname: href },
					match: { path, params },
				} = action.payload;
				const remainingSection = getAllAfterPrependHref(prependHref, href);

				if (remainingSection) {
					s.setIn(
						["tabIndex", remainingSection],
						Immutable.fromJS({
							href,
							path,
							params,
						}),
					);
					const moduleName = path.replace(new RegExp(`^${prependPath}(\\w+)(?:/.*)?$`), "$1");
					const moduleList = s.getIn(["moduleTabs", moduleName]) || Immutable.List();

					if (!moduleList.includes(remainingSection)) {
						s.setIn(["moduleTabs", moduleName], moduleList.push(remainingSection));
					}
				}
			});
		case MAP_HREF:
			const prependHref = state.getIn(["config", "prependHref"]);
			const { from, to } = action.payload;
			const remainingSectionFrom = getAllAfterPrependHref(prependHref, from);
			const remainingSectionTo = getAllAfterPrependHref(prependHref, to);
			if (remainingSectionFrom && remainingSectionTo)
				return state.setIn(["mappedHrefs", remainingSectionFrom], remainingSectionTo);
			return state;
		case REMOVE_TAB:
			return state.withMutations(s => {
				const prependHref = s.getIn(["config", "prependHref"]);
				const { module, path } = action.payload;
				const list = s.getIn(["moduleTabs", module]) || Immutable.List();
				const remainingSection = getAllAfterPrependHref(prependHref, path);

				if (remainingSection) {
					const index = list.indexOf(remainingSection);
					if (index !== -1) {
						s.deleteIn(["moduleTabs", module, index]);
					}
					s.deleteIn(["tabIndex", remainingSection]);
				}
			});
		case SET_HREF_CONFIG:
			return state.withMutations(s => {
				s.set("config", Immutable.fromJS(action.payload));
			});
		default:
			return state;
	}
};

export default navigationReducer;
