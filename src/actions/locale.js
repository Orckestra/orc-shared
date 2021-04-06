import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import { getSupportedCulturesRequest, getUserCultureRequest, saveUserCultureRequest } from "./requestsApi";

export const GET_CULTURES = "GET_CULTURES";

export const [GET_CULTURES_REQUEST, GET_CULTURES_SUCCESS, GET_CULTURES_FAILURE] = makeActionTypes(GET_CULTURES);

export const getCultures = () => makeOrcApiAction(GET_CULTURES, getSupportedCulturesRequest.buildUrl());

export const GET_MY_CULTURE = "GET_MY_CULTURE";

export const [GET_MY_CULTURE_REQUEST, GET_MY_CULTURE_SUCCESS, GET_MY_CULTURE_FAILURE] = makeActionTypes(GET_MY_CULTURE);

export const getMyCulture = () => makeOrcApiAction(GET_MY_CULTURE, getUserCultureRequest.buildUrl());

export const SET_DEFAULT_LANGUAGE = "SET_DEFAULT_LANGUAGE";

export const [
	SET_DEFAULT_LANGUAGE_REQUEST,
	SET_DEFAULT_LANGUAGE_SUCCESS,
	SET_DEFAULT_LANGUAGE_FAILURE,
] = makeActionTypes(SET_DEFAULT_LANGUAGE);

export const setDefaultLanguage = lang =>
	makeOrcApiAction(SET_DEFAULT_LANGUAGE, saveUserCultureRequest.buildUrl(lang), saveUserCultureRequest.verb, {
		meta: { lang },
	});

export const CHANGE_LOCALE = "CHANGE_LOCALE";

export const changeLocale = locale => ({
	type: CHANGE_LOCALE,
	payload: locale,
});
