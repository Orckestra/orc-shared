import Immutable from "immutable";
import { GET_SCOPE_EXTENDED_CONFIGURATION_SUCCESS } from "../actions/scopes";

const initialState = Immutable.fromJS({});

const scopesExtendedConfigurationReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_SCOPE_EXTENDED_CONFIGURATION_SUCCESS: {
			return state.set(action.meta.scope, Immutable.fromJS(action.payload));
		}
		default:
			return state;
	}
};

export default scopesExtendedConfigurationReducer;
