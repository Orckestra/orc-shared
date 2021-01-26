import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import { buildUrl } from "../utils/buildUrl";

export const GET_CULTURES = "GET_CULTURES";

export const [GET_CULTURES_REQUEST, GET_CULTURES_SUCCESS, GET_CULTURES_FAILURE] = makeActionTypes(GET_CULTURES);

export const getCultures = () => makeOrcApiAction(GET_CULTURES, buildUrl(["cultures"]));

export const GET_MY_CULTURE = "GET_MY_CULTURE";

export const [GET_MY_CULTURE_REQUEST, GET_MY_CULTURE_SUCCESS, GET_MY_CULTURE_FAILURE] = makeActionTypes(GET_MY_CULTURE);

export const getMyCulture = () => makeOrcApiAction(GET_MY_CULTURE, buildUrl(["my", "culture"]));

export const SET_DEFAULT_LANGUAGE = "SET_DEFAULT_LANGUAGE";

export const [
	SET_DEFAULT_LANGUAGE_REQUEST,
	SET_DEFAULT_LANGUAGE_SUCCESS,
	SET_DEFAULT_LANGUAGE_FAILURE,
] = makeActionTypes(SET_DEFAULT_LANGUAGE);

export const setDefaultLanguage = lang =>
	makeOrcApiAction(SET_DEFAULT_LANGUAGE, buildUrl(["my", "culture", lang]), "POST", {
		meta: { lang },
	});

export const CHANGE_LOCALE = "CHANGE_LOCALE";

export const changeLocale = locale => ({
	type: CHANGE_LOCALE,
	payload: locale,
});
