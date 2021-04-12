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
	validateOvertureModule,
	APPLICATION_SCOPE_HAS_CHANGED,
	applicationScopeHasChanged,
} from "./scopes";

jest.mock("../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") => "URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

describe("getScopes", () => {
	beforeEach(() => {});
	afterEach(() => {});

	it("creates a RSAA to fetch authorized scope tree", () =>
		expect(getScopes, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_SCOPES_REQUEST, GET_SCOPES_SUCCESS, GET_SCOPES_FAILURE],
				endpoint: "URL: my/scope/aModule/tree {}",
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
				endpoint: 'URL: my/scope/aModule ""',
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

	it("throws an error if no class found on DOM element", () => {
		global.OVERTURE_MODULE = "";
		expect(
			() => expect(validateOvertureModule, "when called with", []),
			"to throw",
			'"overtureModule.name" is missing in the configuration.',
		);
	});
});

describe("applicationScopeHasChanged", () => {
	it("creates an action object", () => {
		expect(applicationScopeHasChanged, "when called with", ["oldScope", "newScope"], "to equal", {
			type: APPLICATION_SCOPE_HAS_CHANGED,
			payload: {
				previousScope: "oldScope",
				newScope: "newScope",
			},
		});
	});
});
