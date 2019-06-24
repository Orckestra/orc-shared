import { makeActionTypes } from "./makeApiAction";

export const GET_SCOPES = "GET_SCOPES";

export const [
	GET_SCOPES_REQUEST,
	GET_SCOPES_SUCCESS,
	GET_SCOPES_FAILURE,
] = makeActionTypes(GET_SCOPES);
