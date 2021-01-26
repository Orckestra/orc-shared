import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import { buildUrl } from "../utils/buildUrl";
import { getBaseUrl } from "../buildStore";

export const GET_AUTHENTICATION_PROFILE = "GET_AUTHENTICATION_PROFILE";

export const [
	GET_AUTHENTICATION_PROFILE_REQUEST,
	GET_AUTHENTICATION_PROFILE_SUCCESS,
	GET_AUTHENTICATION_PROFILE_FAILURE,
] = makeActionTypes(GET_AUTHENTICATION_PROFILE);

export const getAuthProfile = () =>
	makeOrcApiAction(GET_AUTHENTICATION_PROFILE, buildUrl(["authentication", "profile"]));

export const SIGN_OUT = "SIGN_OUT";

export const [SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE] = makeActionTypes(SIGN_OUT);

export const signOut = () =>
	makeOrcApiAction(SIGN_OUT, buildUrl(["authentication", "signout"]), "POST", {
		body: { returnUrl: getBaseUrl() },
	});
