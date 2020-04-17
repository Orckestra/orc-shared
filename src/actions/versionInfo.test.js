import { RSAA } from "redux-api-middleware";
import {
	GET_VERSION_INFO_FAILURE,
	GET_VERSION_INFO_REQUEST,
	GET_VERSION_INFO_SUCCESS,
	getVersionInfo,
} from "./versionInfo";

jest.mock("../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") =>
		"URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

describe("getVersionInfo", () => {
	it("creates a RSAA to get version info", () =>
		expect(getVersionInfo, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					GET_VERSION_INFO_REQUEST,
					GET_VERSION_INFO_SUCCESS,
					GET_VERSION_INFO_FAILURE,
				],
				endpoint: 'URL: diagnostic/versioninfo ""',
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
