import makeOrcApiAction from "./makeOrcApiAction";
import { RSAA } from "redux-api-middleware";
import Immutable from "immutable";

describe("makeOrcApiAction", () => {
	let oldFetch;
	beforeEach(() => {
		oldFetch = window.fetch;
		window.fetch = () => Promise.resolve(true);
	});
	afterEach(() => {
		window.fetch = oldFetch;
	});

	it("creates an RSAA suited to accessing the Orckestrator API", () =>
		expect(
			makeOrcApiAction,
			"called with",
			["TEST_ACTION", "https://orc-oco.api.test/"],
			"to exhaustively satisfy",
			{
				[RSAA]: {
					types: [
						"TEST_ACTION_REQUEST",
						"TEST_ACTION_SUCCESS",
						"TEST_ACTION_FAILURE",
					],
					endpoint: "https://orc-oco.api.test/",
					method: "GET",
					headers: {
						Accept: "application/json; charset=utf-8",
						"Content-Type": "application/json",
					},
					options: {
						redirect: "follow",
					},
					bailout: expect
						.it("to be a function")
						.and(
							"when called with",
							[Immutable.fromJS({ requests: { TEST_ACTION: true } })],
							"to be true",
						),
					credentials: "include",
				},
			},
		));

	it("does not delete information unnecessarily", () =>
		expect(
			makeOrcApiAction,
			"called with",
			[
				"TEST_ACTION",
				"https://orc-oco.api.test/",
				"POST",
				{
					body: { foo: "bar" },
					headers: { Accept: "text/html", "X-Random": "Random header" },
					options: { things: true },
					bailout: state => state.get("other"),
					credentials: "none",
				},
			],
			"to exhaustively satisfy",
			{
				[RSAA]: {
					types: [
						"TEST_ACTION_REQUEST",
						"TEST_ACTION_SUCCESS",
						"TEST_ACTION_FAILURE",
					],
					endpoint: "https://orc-oco.api.test/",
					method: "POST",
					body: '{"foo":"bar"}',
					headers: {
						Accept: "application/json; charset=utf-8",
						"Content-Type": "application/json",
						"X-Random": "Random header",
					},
					credentials: "include",
					options: {
						things: true,
						redirect: "follow",
					},
					bailout: expect
						.it("to be a function")
						.and(
							"when called with",
							[Immutable.Map({ requests: {}, other: true })],
							"to be true",
						),
				},
			},
		));
});
