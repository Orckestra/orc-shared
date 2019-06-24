import Immutable from "immutable";
import { normalize } from "normalizr";
import scopeSchema from "../schemas/scopes";
import { GET_SCOPES_SUCCESS } from "../actions/scopes";

const initialState = Immutable.fromJS({});

const scopeReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_SCOPES_SUCCESS: {
			const normalizedScopes = normalize(action.payload, scopeSchema);
			return state.merge(Immutable.fromJS(normalizedScopes.entities.scopes));
		}
		default:
			return state;
	}
};

export default scopeReducer;
