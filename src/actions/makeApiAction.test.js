import sinon from "sinon";
import { makeActionTypes, makeApiAction } from "./makeApiAction";
import { RSAA } from "redux-api-middleware";

describe("makeActionTypes", () => {
	it("returns an array with three action types in the form used by RSAAs", () =>
		expect(makeActionTypes, "when called with", ["ACTION_NAME"], "to equal", [
			"ACTION_NAME_REQUEST",
			"ACTION_NAME_SUCCESS",
			"ACTION_NAME_FAILURE",
		]));
});

describe("makeApiActions", () => {
	it("creates a basic RSAA", () =>
		expect(
			makeApiAction,
			"when called with",
			["TEST_ACTION", "/mock/endpoint"],
			"to equal",
			{
				[RSAA]: {
					types: makeActionTypes("TEST_ACTION"),
					endpoint: "/mock/endpoint",
					method: "GET",
				},
			},
		));

	it("handles POST and bodies", () =>
		expect(
			makeApiAction,
			"when called with",
			[
				"TEST_ACTION",
				"/mock/endpoint",
				"POST",
				{ body: { test: true, someText: "This is a text value" } },
			],
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
			[
				"TEST_ACTION",
				"/mock/endpoint",
				"GET",
				{ options: { redirect: "follow" }, bailout },
			],
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
