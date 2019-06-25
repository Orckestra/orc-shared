import { RSAA } from "redux-api-middleware";
import {
	GET_APPLICATIONS_REQUEST,
	GET_APPLICATIONS_SUCCESS,
	GET_APPLICATIONS_FAILURE,
	getApplications,
	GET_MY_APPLICATION_REQUEST,
	GET_MY_APPLICATION_SUCCESS,
	GET_MY_APPLICATION_FAILURE,
	getMyApplication,
	SET_MY_APPLICATION_REQUEST,
	SET_MY_APPLICATION_SUCCESS,
	SET_MY_APPLICATION_FAILURE,
	setMyApplication,
} from "./applications";

jest.mock("../utils/loadConfig", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") =>
		"URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

describe("getApplications", () => {
	it("creates a RSAA to **DO**", () =>
		expect(getApplications, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					GET_APPLICATIONS_REQUEST,
					GET_APPLICATIONS_SUCCESS,
					GET_APPLICATIONS_FAILURE,
				],
				endpoint: 'URL: applications ""',
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

describe("getMyApplication", () => {
	it("creates a RSAA to **DO**", () =>
		expect(getMyApplication, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					GET_MY_APPLICATION_REQUEST,
					GET_MY_APPLICATION_SUCCESS,
					GET_MY_APPLICATION_FAILURE,
				],
				endpoint: 'URL: my/application ""',
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
describe("setMyApplication", () => {
	it("creates a RSAA to **DO**", () =>
		expect(
			setMyApplication,
			"when called with",
			[15],
			"to exhaustively satisfy",
			{
				[RSAA]: {
					types: [
						{ type: SET_MY_APPLICATION_REQUEST, meta: { appId: 15 } },
						{ type: SET_MY_APPLICATION_SUCCESS, meta: { appId: 15 } },
						{ type: SET_MY_APPLICATION_FAILURE, meta: { appId: 15 } },
					],
					endpoint: 'URL: my/application/15 ""',
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
			},
		));
});
