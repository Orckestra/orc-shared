import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import { buildUrl } from "../utils/buildUrl";

// TODOJOC : To be removed depending on my PR on "ORC-SCRIPTS"
global.OVERTURE_MODULE = "aModule";

if (!OVERTURE_MODULE) {
	throw new Error('"overtureModule.name" is missing in the configuration.');
}

export const GET_SCOPES = "GET_SCOPES";

export const [
	GET_SCOPES_REQUEST,
	GET_SCOPES_SUCCESS,
	GET_SCOPES_FAILURE,
] = makeActionTypes(GET_SCOPES);

export const getScopes = () =>
	makeOrcApiAction(GET_SCOPES, buildUrl(["my", "scope", OVERTURE_MODULE, "tree"], {}));

export const GET_MY_SCOPE = "GET_MY_SCOPE";

export const [
	GET_MY_SCOPE_REQUEST,
	GET_MY_SCOPE_SUCCESS,
	GET_MY_SCOPE_FAILURE,
] = makeActionTypes(GET_MY_SCOPE);

export const getDefaultScope = () =>
	makeOrcApiAction(GET_MY_SCOPE, buildUrl(["my", "scope", OVERTURE_MODULE]));
