import Immutable from "immutable";
import { normalize } from "normalizr";
import scopeSchema from "../schemas/scopes";
import { GET_SCOPES_SUCCESS } from "../actions/scopes";

const initialState = Immutable.fromJS({});

const scopeReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_SCOPES_SUCCESS: {
			const loadedScopes = state.toJS();
			const normalizedScopes = normalize(action.payload, scopeSchema);
			if (action.meta && action.meta.reset) {
				return Immutable.fromJS(normalizedScopes.entities.scopes);
			}

			if (Object.keys(loadedScopes).length > 0) {
				const addedScope = {};

				Object.values(normalizedScopes.entities.scopes).forEach(scope => {
					if (!loadedScopes[scope.id]) {
						loadedScopes[scope.id] = scope;
						addedScope[scope.id] = scope;
					} else if (scope.isAuthorizedScope) {
						loadedScopes[scope.id] = scope;
					}
				});

				Object.values(addedScope).forEach(scope => {
					const parentScope = loadedScopes[scope.parentScopeId];

					if (parentScope) {
						if (!parentScope.children.includes(scope.id)) {
							parentScope.children.push(scope.id);
						}
					} else {
						// Should not happen, but for safety
						delete loadedScopes[scope.id];
					}
				});

				return state.merge(Immutable.fromJS(loadedScopes));
			}

			return state.merge(Immutable.fromJS(normalizedScopes.entities.scopes));
		}
		default:
			return state;
	}
};

export default scopeReducer;
