import sinon from "sinon";
import { getJSONWithValidBody, makeActionTypes, makeApiAction, makeFailureActionType } from "./makeApiAction";
import { RSAA, ApiError } from "redux-api-middleware";

const getTestResponse = (extra = {}, contentType = null) => ({
	headers: {
		"Content-Type": contentType ?? "application/json",
		get: function (key) {
			return this[key];
		},
	},
	json: () => ({ key1: "value1", key2: "value2" }),
	text: () => '{"key1": "value1", "key2": "value2"}',
	status: 200,
	statusText: "a status text",
	message: "a Message",
	...extra,
});

describe("makeActionTypes", () => {
	it("returns an array with three action types in the form used by RSAAs", () =>
		expect(makeActionTypes, "when called with", ["ACTION_NAME"], "to satisfy", [
			"ACTION_NAME_REQUEST",
			"ACTION_NAME_SUCCESS",
			"ACTION_NAME_FAILURE",
		]));
});

describe("makeFailureActionType", () => {
	it("returns a failure action type with a payload override", () =>
		expect(makeFailureActionType, "when called with", ["ACTION_NAME_FAILURE"], "to satisfy", {
			type: "ACTION_NAME_FAILURE",
			payload: expect.it("to be a function"),
		}));

	it("handles failure payload function", async () => {
		const actionType = makeFailureActionType("ACTION_NAME_FAILURE");

		const testResponse = getTestResponse();

		const apiError = new ApiError(testResponse.status, testResponse.statusText, testResponse.json());

		const result = await actionType.payload("ACTION_NAME_FAILURE", {}, testResponse);

		expect(result, "to equal", apiError);
	});
});

describe("getJSONWithValidBody", () => {
	it("return a resolved promise by default when called with basic response", async () => {
		const result = await getJSONWithValidBody(getTestResponse());

		expect(result, "to equal", { key1: "value1", key2: "value2" });
	});

	it("return a resolved promise by default when called with 404 response, a body and another content type", async () => {
		const result = await getJSONWithValidBody(getTestResponse({ status: 404 }, "fakeContentType"));

		expect(result, "to be", undefined);
	});

	it("return a resolved promise by default when called with 404 response and a body", async () => {
		const result = await getJSONWithValidBody(getTestResponse({ status: 404 }));

		expect(result, "to equal", { key1: "value1", key2: "value2" });
	});

	it("return a resolved promise by default when called with 404 response and null body", async () => {
		const result = await getJSONWithValidBody(getTestResponse({ status: 404, text: () => null }));

		expect(result, "to equal", null);
	});

	it("return a resolved promise by default when called with 404 response and undefined body", async () => {
		const result = await getJSONWithValidBody(getTestResponse({ status: 404, text: () => undefined }));

		expect(result, "to equal", undefined);
	});

	it("return a resolved promise by default when called with 404 response and empty body", async () => {
		const result = await getJSONWithValidBody(getTestResponse({ status: 404, text: () => "" }));

		expect(result, "to equal", "");
	});
});

describe("makeApiActions", () => {
	it("creates a basic RSAA", () =>
		expect(makeApiAction, "when called with", ["TEST_ACTION", "/mock/endpoint"], "to equal", {
			[RSAA]: {
				types: makeActionTypes("TEST_ACTION"),
				endpoint: "/mock/endpoint",
				method: "GET",
			},
		}));

	it("handles POST and bodies", () =>
		expect(
			makeApiAction,
			"when called with",
			["TEST_ACTION", "/mock/endpoint", "POST", { body: { test: true, someText: "This is a text value" } }],
			"to equal",
			{
				[RSAA]: {
					types: makeActionTypes("TEST_ACTION"),
					endpoint: "/mock/endpoint",
					method: "POST",
					body: '{"test":true,"someText":"This is a text value"}',
				},
			},
		));

	it("handles headers and credentials", () =>
		expect(
			makeApiAction,
			"when called with",
			[
				"TEST_ACTION",
				"/mock/endpoint",
				"GET",
				{
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				},
			],
			"to equal",
			{
				[RSAA]: {
					types: makeActionTypes("TEST_ACTION"),
					endpoint: "/mock/endpoint",
					method: "GET",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				},
			},
		));

	it("handles options and bailout", () => {
		let bailout = sinon.spy().named("bailout");
		return expect(
			makeApiAction,
			"when called with",
			["TEST_ACTION", "/mock/endpoint", "GET", { options: { redirect: "follow" }, bailout }],
			"to equal",
			{
				[RSAA]: {
					types: makeActionTypes("TEST_ACTION"),
					endpoint: "/mock/endpoint",
					method: "GET",
					options: { redirect: "follow" },
					bailout,
				},
			},
		).then(() => expect(bailout, "was not called"));
	});

	it("handles action metadata", () =>
		expect(
			makeApiAction,
			"when called with",
			["TEST_ACTION", "/mock/endpoint", "GET", { meta: { test: true } }],
			"to equal",
			{
				[RSAA]: {
					types: [
						{ type: "TEST_ACTION_REQUEST", meta: { test: true } },
						{ type: "TEST_ACTION_SUCCESS", meta: { test: true } },
						{ type: "TEST_ACTION_FAILURE", meta: { test: true } },
					],
					endpoint: "/mock/endpoint",
					method: "GET",
				},
			},
		));
});
