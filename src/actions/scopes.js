import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import { getUserScopeRequest, getUserScopeTreeRequest } from "./requestsApi";

export const validateOvertureModule = () => {
	if (!OVERTURE_MODULE) {
		throw new Error('"overtureModule.name" is missing in the configuration.');
	}
};

validateOvertureModule();

export const GET_SCOPES = "GET_SCOPES";

export const [GET_SCOPES_REQUEST, GET_SCOPES_SUCCESS, GET_SCOPES_FAILURE] = makeActionTypes(GET_SCOPES);

export const getScopes = () => makeOrcApiAction(GET_SCOPES, getUserScopeTreeRequest.buildUrl(OVERTURE_MODULE, {}));

export const GET_MY_SCOPE = "GET_MY_SCOPE";

export const [GET_MY_SCOPE_REQUEST, GET_MY_SCOPE_SUCCESS, GET_MY_SCOPE_FAILURE] = makeActionTypes(GET_MY_SCOPE);

export const getDefaultScope = () => makeOrcApiAction(GET_MY_SCOPE, getUserScopeRequest.buildUrl(OVERTURE_MODULE));
