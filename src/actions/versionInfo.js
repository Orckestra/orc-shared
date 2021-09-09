import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import { cultureByDefault } from "../reducers/localeFactory";
import { getVersionInfoRequest } from "./requestsApi";

export const GET_VERSION_INFO = "GET_VERSION_INFO";
export const RESET_VERSION_INFO = "RESET_VERSION_INFO";

export const [GET_VERSION_INFO_REQUEST, GET_VERSION_INFO_SUCCESS, GET_VERSION_INFO_FAILURE] =
	makeActionTypes(GET_VERSION_INFO);

export const getVersionInfo = locale =>
	makeOrcApiAction(
		GET_VERSION_INFO,
		getVersionInfoRequest.buildUrl({
			cultureName: (locale || cultureByDefault).substr(0, 2).toLowerCase() === "fr" ? locale : cultureByDefault,
		}),
	);

export const resetVersionInfo = () => ({
	type: RESET_VERSION_INFO,
});
