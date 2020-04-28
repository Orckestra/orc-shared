import Immutable from "immutable";
import { GET_VERSION_INFO_SUCCESS, RESET_VERSION_INFO } from "../actions/versionInfo";

const initialState = Immutable.fromJS({
	version: null,
	defaultHelpUrl: null,
	moduleHelpUrls: [],
});

const versionInfoReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_VERSION_INFO_SUCCESS: {
			return state.withMutations(s => {
				s.set("moduleHelpUrls", action.payload.moduleHelpUrls || []);
				s.set("defaultHelpUrl", action.payload.defaultHelpUrl);
				s.set("version", action.payload.versionOCC);
			});
		}
		case RESET_VERSION_INFO: {
			return state.merge(
				Immutable.fromJS({
					version: null,
					defaultHelpUrl: null,
					moduleHelpUrls: [],
				}),
			);
		}
		default:
			return state;
	}
};

export default versionInfoReducer;
