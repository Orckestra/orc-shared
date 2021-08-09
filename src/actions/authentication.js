import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import { getBaseUrl } from "../buildStore";
import { getUserPermissionsRequest, signOutRequest } from "./requestsApi";

export const GET_AUTHENTICATION_PROFILE = "GET_AUTHENTICATION_PROFILE";

export const [
	GET_AUTHENTICATION_PROFILE_REQUEST,
	GET_AUTHENTICATION_PROFILE_SUCCESS,
	GET_AUTHENTICATION_PROFILE_FAILURE,
] = makeActionTypes(GET_AUTHENTICATION_PROFILE);

export const getAuthProfile = () => makeOrcApiAction(GET_AUTHENTICATION_PROFILE, getUserPermissionsRequest.buildUrl());

export const SIGN_OUT = "SIGN_OUT";

export const [SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE] = makeActionTypes(SIGN_OUT);

export const signOut = () =>
	makeOrcApiAction(SIGN_OUT, signOutRequest.buildUrl(), signOutRequest.verb, {
		body: { returnUrl: getBaseUrl() },
	});
