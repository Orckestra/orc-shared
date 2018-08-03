import { makeActionTypes } from "./makeApiAction";

export const GET_CULTURES = "GET_CULTURES";

export const [
	GET_CULTURES_REQUEST,
	GET_CULTURES_SUCCESS,
	GET_CULTURES_FAILURE,
] = makeActionTypes(GET_CULTURES);

export const CHANGE_LOCALE = "CHANGE_LOCALE";

export const changeLocale = locale => ({
	type: CHANGE_LOCALE,
	payload: locale,
});
