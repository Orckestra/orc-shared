import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import { buildUrl } from "../utils/buildUrl";
import { cultureByDefault } from "../reducers/localeFactory";

export const GET_VERSION_INFO = "GET_VERSION_INFO";
export const RESET_VERSION_INFO = "RESET_VERSION_INFO";

export const [
	GET_VERSION_INFO_REQUEST,
	GET_VERSION_INFO_SUCCESS,
	GET_VERSION_INFO_FAILURE,
] = makeActionTypes(GET_VERSION_INFO);

export const getVersionInfo = locale =>
	makeOrcApiAction(
		GET_VERSION_INFO,
		buildUrl(["diagnostic", "versioninfo"], {
			cultureName: locale.substr(0, 2).toLowerCase() === "fr" ? locale : cultureByDefault,
		}),
	);

export const resetVersionInfo = () => ({
	type: RESET_VERSION_INFO,
});
