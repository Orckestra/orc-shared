import { RSAA } from "redux-api-middleware";
import {
	GET_VERSION_INFO_FAILURE,
	GET_VERSION_INFO_REQUEST,
	GET_VERSION_INFO_SUCCESS,
	RESET_VERSION_INFO,
	getVersionInfo,
	resetVersionInfo,
} from "./versionInfo";

jest.mock("../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") =>
		"URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

describe("getVersionInfo", () => {
	it("creates a RSAA to get version info for a french culture", () =>
		expect(getVersionInfo, "when called with", ["fr-FR"], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					GET_VERSION_INFO_REQUEST,
					GET_VERSION_INFO_SUCCESS,
					GET_VERSION_INFO_FAILURE,
				],
				endpoint: 'URL: diagnostic/versioninfo {"cultureName":"fr-FR"}',
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

	it("creates a RSAA to get version info with any other languages", () =>
		expect(getVersionInfo, "when called with", ["an-ANY"], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					GET_VERSION_INFO_REQUEST,
					GET_VERSION_INFO_SUCCESS,
					GET_VERSION_INFO_FAILURE,
				],
				endpoint: 'URL: diagnostic/versioninfo {"cultureName":"en-US"}',
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

describe("resetVersionInfo", () => {
	it("defaults to 'confirm' type", () =>
		expect(resetVersionInfo, "when called", "to equal", {
			type: RESET_VERSION_INFO,
		}));
});
