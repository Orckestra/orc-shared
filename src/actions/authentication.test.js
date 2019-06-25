import { RSAA } from "redux-api-middleware";
import {
	GET_AUTHENTICATION_PROFILE_REQUEST,
	GET_AUTHENTICATION_PROFILE_SUCCESS,
	GET_AUTHENTICATION_PROFILE_FAILURE,
	getAuthProfile,
	SIGN_OUT_REQUEST,
	SIGN_OUT_SUCCESS,
	SIGN_OUT_FAILURE,
	signOut,
} from "./authentication";

jest.mock("../utils/loadConfig", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") =>
		"URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

describe("getAuthProfile", () => {
	it("creates a RSAA to fetch the authentication profile of the current user", () =>
		expect(getAuthProfile, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					GET_AUTHENTICATION_PROFILE_REQUEST,
					GET_AUTHENTICATION_PROFILE_SUCCESS,
					GET_AUTHENTICATION_PROFILE_FAILURE,
				],
				endpoint: 'URL: authentication/profile ""',
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));
});

describe("signOut", () => {
	it("creates a RSAA to sign out the current user", () =>
		expect(signOut, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS, SIGN_OUT_FAILURE],
				endpoint: 'URL: authentication/signout ""',
				method: "POST",
				body: undefined,
				credentials: "include",
				bailout: expect.it("to be a function"),
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));
});
