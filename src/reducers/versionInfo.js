import Immutable from "immutable";
import { GET_VERSION_INFO_SUCCESS } from "../actions/versionInfo";

const initialState = Immutable.fromJS({
	version: null,
	helpUrlDefault: null,
	moduleHelpUrls: [],
});

const versionInfoReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_VERSION_INFO_SUCCESS: {
			return state.withMutations(s => {
				s.set("moduleHelpUrls", action.payload.moduleHelpUrls || []);
				s.set("helpUrlDefault", action.payload.helpUrlDefault);
				s.set("version", action.payload.versionOCC);
			});
		}
		default:
			return state;
	}
};

export default versionInfoReducer;
