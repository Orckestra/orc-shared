import { makeActionTypes } from "./makeApiAction";
import makeOrcApiAction from "./makeOrcApiAction";
import { buildUrl } from "../utils/buildUrl";

export const GET_APPLICATIONS = "GET_APPLICATIONS";

export const [
	GET_APPLICATIONS_REQUEST,
	GET_APPLICATIONS_SUCCESS,
	GET_APPLICATIONS_FAILURE,
] = makeActionTypes(GET_APPLICATIONS);

export const getApplications = () =>
	makeOrcApiAction(GET_APPLICATIONS, buildUrl(["applications"]));

export const GET_MY_APPLICATION = "GET_MY_APPLICATION";

export const [
	GET_MY_APPLICATION_REQUEST,
	GET_MY_APPLICATION_SUCCESS,
	GET_MY_APPLICATION_FAILURE,
] = makeActionTypes(GET_MY_APPLICATION);

export const getMyApplication = () =>
	makeOrcApiAction(GET_MY_APPLICATION, buildUrl(["my", "application"]));

export const SET_MY_APPLICATION = "SET_MY_APPLICATION";

export const [
	SET_MY_APPLICATION_REQUEST,
	SET_MY_APPLICATION_SUCCESS,
	SET_MY_APPLICATION_FAILURE,
] = makeActionTypes(SET_MY_APPLICATION);

export const setMyApplication = appId =>
	makeOrcApiAction(
		SET_MY_APPLICATION,
		buildUrl(["my", "application", appId]),
		"POST",
		{ meta: { appId } },
	);
