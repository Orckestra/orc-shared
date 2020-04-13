import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import { buildUrl } from "../utils/buildUrl";
import { VIEW_SET_FIELD } from "./view";

export const GET_VERSION_INFO = "GET_VERSION_INFO";

export const [
	GET_VERSION_INFO_REQUEST,
	GET_VERSION_INFO_SUCCESS,
	GET_VERSION_INFO_FAILURE,
] = makeActionTypes(GET_VERSION_INFO);

export const getVersionInfo = () =>
	makeOrcApiAction(GET_VERSION_INFO, buildUrl(["diagnostic/versioninfo"]));
