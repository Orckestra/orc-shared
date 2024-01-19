import { RSAA } from "redux-api-middleware";
import {
	getScopes,
	GET_MY_SCOPE_REQUEST,
	GET_MY_SCOPE_SUCCESS,
	GET_MY_SCOPE_FAILURE,
	getDefaultScope,
	validateOvertureApplication,
	APPLICATION_SCOPE_HAS_CHANGED,
	applicationScopeHasChanged,
	getAppModules,
	GET_APPLICATION_MODULES_REQUEST,
	GET_APPLICATION_MODULES_SUCCESS,
	GET_APPLICATION_MODULES_FAILURE,
	getScopeExtendedConfiguration,
} from "./scopes";

jest.mock("../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") => "URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

describe("getAppModules", () => {
	it("creates a RSAA to fetch application modules", () => {
		expect(getAppModules, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_APPLICATION_MODULES_REQUEST, GET_APPLICATION_MODULES_SUCCESS, GET_APPLICATION_MODULES_FAILURE],
				endpoint: 'URL: modules/byApplicationName/anApplication ""',
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
		});
	});
});

describe("getScopes", () => {
	let originalApplication;

	beforeEach(() => {
		originalApplication = global.OVERTURE_APPLICATION;
	});

	afterEach(() => {
		global.OVERTURE_APPLICATION = originalApplication;
	});

	it("creates a RSAA to fetch authorized scope tree", () =>
		expect(getScopes, "when called with", ["aModule"], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: "GET_SCOPES_REQUEST", meta: { module: "aModule" } },
					{ type: "GET_SCOPES_SUCCESS", meta: { module: "aModule" } },
					{ type: "GET_SCOPES_FAILURE", meta: { module: "aModule" } },
				],
				endpoint: "URL: my/scope/aModule/tree {}",
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: false,
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));

	it("creates a RSAA to fetch authorized scope tree for system module", () =>
		expect(getScopes, "when called with", ["System"], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: "GET_SCOPES_REQUEST", meta: { module: "System" } },
					{ type: "GET_SCOPES_SUCCESS", meta: { module: "System" } },
					{ type: "GET_SCOPES_FAILURE", meta: { module: "System" } },
				],
				endpoint: "URL: my/scope/Order/tree {}",
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: false,
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));

	it("creates a RSAA to fetch default user scope", () =>
		expect(getDefaultScope, "when called with", ["aModule"], "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_MY_SCOPE_REQUEST, GET_MY_SCOPE_SUCCESS, GET_MY_SCOPE_FAILURE],
				endpoint: 'URL: my/scope/aModule ""',
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: false,
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));

	it("creates a RSAA to fetch default user scope for System module", () =>
		expect(getDefaultScope, "when called with", ["System"], "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_MY_SCOPE_REQUEST, GET_MY_SCOPE_SUCCESS, GET_MY_SCOPE_FAILURE],
				endpoint: 'URL: my/scope/Order ""',
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: false,
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		}));

	it("throws an error if no class found on DOM element", () => {
		global.OVERTURE_APPLICATION = "";
		expect(
			() => expect(validateOvertureApplication, "when called with", []),
			"to throw",
			'"overtureApplication.name" is missing in the configuration.',
		);
	});
});

describe("applicationScopeHasChanged", () => {
	it("creates an action object", () => {
		expect(applicationScopeHasChanged, "when called with", ["oldScope", "newScope", "module"], "to equal", {
			type: APPLICATION_SCOPE_HAS_CHANGED,
			payload: {
				previousScope: "oldScope",
				newScope: "newScope",
				moduleName: "module",
			},
		});
	});
});

describe("getScopeExtendedConfiguration", () => {
	it("creates a RSAA to fetch a scope extended configuration", () => {
		expect(getScopeExtendedConfiguration, "when called with", ["zeScope"], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{
						type: "GET_SCOPE_EXTENDED_CONFIGURATION_REQUEST",
						meta: { scope: "zeScope" },
					},
					{
						type: "GET_SCOPE_EXTENDED_CONFIGURATION_SUCCESS",
						meta: { scope: "zeScope" },
					},
					{
						type: "GET_SCOPE_EXTENDED_CONFIGURATION_FAILURE",
						meta: { scope: "zeScope" },
					},
				],
				endpoint: 'URL: scopes/zeScope/extendedConfiguration ""',
				method: "GET",
				body: undefined,
				credentials: "include",
				bailout: false,
				headers: {
					Accept: "application/json; charset=utf-8",
					"Content-Type": "application/json",
				},
				options: { redirect: "follow" },
			},
		});
	});
});
