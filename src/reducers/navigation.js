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
				const sections = href.match(/^\/[^/]+\/([^/]+.*)/) || [];
				const remainingSection = sections[1];

				if (remainingSection) {
					s.setIn(
						["tabIndex", sections[1]],
						Immutable.fromJS({
							href,
							path: match.path,
							params: match.params,
						}),
					);
					const moduleName = match.path.replace(/^\/:scope\/(\w+)(?:\/.*)?$/, "$1");
					const moduleList = s.getIn(["moduleTabs", moduleName]) || Immutable.List();

					if (!moduleList.includes(sections[1])) {
						s.setIn(["moduleTabs", moduleName], moduleList.push(sections[1]));
					}
				}
			});
		case MAP_HREF:
			const sectionsFrom = action.payload.from.match(/^\/[^/]+\/([^/]+.*)/) || [];
			const remainingSectionFrom = sectionsFrom[1];
			const sectionsTo = action.payload.to.match(/^\/[^/]+\/([^/]+.*)/) || [];
			const remainingSectionTo = sectionsTo[1];
			if (remainingSectionFrom && remainingSectionTo)
				return state.setIn(["mappedHrefs", remainingSectionFrom], remainingSectionTo);
			return state;
		case REMOVE_TAB:
			return state.withMutations(s => {
				const list = s.getIn(["moduleTabs", action.payload.module]) || Immutable.List();
				const sections = action.payload.path.match(/^\/[^/]+\/([^/]+.*)/) || [];
				const remainingSection = sections[1];

				if (remainingSection) {
					const index = list.indexOf(remainingSection);
					if (index !== -1) {
						s.deleteIn(["moduleTabs", action.payload.module, index]);
					}
					s.deleteIn(["tabIndex", remainingSection]);
				}
			});
		default:
			return state;
	}
};

export default navigationReducer;
