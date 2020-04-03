import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import { buildUrl } from "../utils/buildUrl";

export const GET_SCOPES = "GET_SCOPES";

export const [
	GET_SCOPES_REQUEST,
	GET_SCOPES_SUCCESS,
	GET_SCOPES_FAILURE,
] = makeActionTypes(GET_SCOPES);

export const getScopes = () =>
	makeOrcApiAction(
		GET_SCOPES,
		buildUrl(["my", "scope", window.overtureModuleName, "tree"], {}),
	);

export const GET_MY_SCOPE = "GET_MY_SCOPE";

export const [
	GET_MY_SCOPE_REQUEST,
	GET_MY_SCOPE_SUCCESS,
	GET_MY_SCOPE_FAILURE,
] = makeActionTypes(GET_MY_SCOPE);

export const getDefaultScope = () =>
	makeOrcApiAction(GET_MY_SCOPE, buildUrl(["my", "scope", window.overtureModuleName]));
