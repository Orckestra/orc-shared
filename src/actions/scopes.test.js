import { RSAA } from "redux-api-middleware";
import {
	GET_SCOPES_REQUEST,
	GET_SCOPES_SUCCESS,
	GET_SCOPES_FAILURE,
	getScopes,
} from "./scopes";

jest.mock("../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") =>
		"URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

describe("getScopes", () => {
	it("creates a RSAA to fetch available cultures", () =>
		expect(getScopes, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_SCOPES_REQUEST, GET_SCOPES_SUCCESS, GET_SCOPES_FAILURE],
				endpoint: "URL: my/scope/Order/tree {}",
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
