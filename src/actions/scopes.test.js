import { RSAA } from "redux-api-middleware";
import {
	GET_SCOPES_REQUEST,
	GET_SCOPES_SUCCESS,
	GET_SCOPES_FAILURE,
	getScopes,
	GET_MY_SCOPE_REQUEST,
	GET_MY_SCOPE_SUCCESS,
	GET_MY_SCOPE_FAILURE,
	getDefaultScope,
} from "./scopes";

jest.mock("../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") =>
		"URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

describe("getScopes", () => {
	beforeEach(() => {
		window.overtureModuleName = "moduleXYZ";
	});
	afterEach(() => {
		delete window.overtureModuleName;
	});

	it("creates a RSAA to fetch authorized scope tree", () =>
		expect(getScopes, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_SCOPES_REQUEST, GET_SCOPES_SUCCESS, GET_SCOPES_FAILURE],
				endpoint: "URL: my/scope/moduleXYZ/tree {}",
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

	it("creates a RSAA to fetch default user scope", () =>
		expect(getDefaultScope, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_MY_SCOPE_REQUEST, GET_MY_SCOPE_SUCCESS, GET_MY_SCOPE_FAILURE],
				endpoint: 'URL: my/scope/moduleXYZ ""',
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
