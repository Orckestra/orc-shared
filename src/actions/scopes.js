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
	makeOrcApiAction(GET_SCOPES, buildUrl(["my", "scope", "Order", "tree"], {}));
