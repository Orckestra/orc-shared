import { RSAA } from "redux-api-middleware";
import {
	CHANGE_LOCALE,
	changeLocale,
	GET_CULTURES_REQUEST,
	GET_CULTURES_SUCCESS,
	GET_CULTURES_FAILURE,
	getCultures,
	GET_MY_CULTURE_REQUEST,
	GET_MY_CULTURE_SUCCESS,
	GET_MY_CULTURE_FAILURE,
	getMyCulture,
	SET_DEFAULT_LANGUAGE_REQUEST,
	SET_DEFAULT_LANGUAGE_SUCCESS,
	SET_DEFAULT_LANGUAGE_FAILURE,
	setDefaultLanguage,
} from "./locale";

jest.mock("../utils/buildUrl", () => {
	const modExport = {};
	modExport.loadConfig = () => Promise.resolve({});
	modExport.buildUrl = (path = [], params = "") =>
		"URL: " + path.join("/") + " " + JSON.stringify(params);
	return modExport;
});

describe("getCultures", () => {
	it("creates a RSAA to fetch available cultures", () =>
		expect(getCultures, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_CULTURES_REQUEST, GET_CULTURES_SUCCESS, GET_CULTURES_FAILURE],
				endpoint: 'URL: cultures ""',
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

describe("getMyCulture", () => {
	it("creates a RSAA to get currently selected culture", () =>
		expect(getMyCulture, "when called", "to exhaustively satisfy", {
			[RSAA]: {
				types: [GET_MY_CULTURE_REQUEST, GET_MY_CULTURE_SUCCESS, GET_MY_CULTURE_FAILURE],
				endpoint: 'URL: my/culture ""',
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

describe("getMyCulture", () => {
	it("creates a RSAA to set currently selected culture", () =>
		expect(setDefaultLanguage, "when called with", ["en-US"], "to exhaustively satisfy", {
			[RSAA]: {
				types: [
					{ type: SET_DEFAULT_LANGUAGE_REQUEST, meta: { lang: "en-US" } },
					{ type: SET_DEFAULT_LANGUAGE_SUCCESS, meta: { lang: "en-US" } },
					{ type: SET_DEFAULT_LANGUAGE_FAILURE, meta: { lang: "en-US" } },
				],
				endpoint: 'URL: my/culture/en-US ""',
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

describe("changeLocale", () => {
	it("creates a Flux Standard Action with the given locale as payload", () =>
		expect(changeLocale, "when called with", ["en-GB"], "to equal", {
			type: CHANGE_LOCALE,
			payload: "en-GB",
		}));
});
