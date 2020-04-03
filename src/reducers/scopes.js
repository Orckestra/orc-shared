import Immutable from "immutable";
import { normalize } from "normalizr";
import scopeSchema from "../schemas/scopes";
import { GET_SCOPES_SUCCESS, GET_MY_SCOPE_SUCCESS } from "../actions/scopes";

const initialState = Immutable.fromJS({ scopes: {}, defaultScope: null });

const scopeReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_SCOPES_SUCCESS: {
			const normalizedScopes = normalize(action.payload, scopeSchema);
			const scopes = state
				.get("scopes")
				.merge(Immutable.fromJS(normalizedScopes.entities.scopes));
			return state.set("scopes", scopes);
		}
		case GET_MY_SCOPE_SUCCESS:
			return state.set("defaultScope", action.payload.id);
		default:
			return state;
	}
};

export default scopeReducer;
