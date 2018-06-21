import sinon from "sinon";
import buildStore from "./buildStore";
import Immutable from "immutable";

describe("buildStore", () => {
	let mockRoutes, mockReducers;
	beforeEach(() => {
		mockRoutes = {
			"/": { title: "test" },
		};
		mockReducers = {
			test: (state = false, action) => {
				if (action.type === "TOGGLE") {
					return !state;
				} else {
					return state;
				}
			},
		};
		global.SUPPORTED_LOCALES = undefined;
	});
	afterEach(() => {
		delete process.env.SUPPORTED_LOCALES;
	});

	it("builds a store when given routes and reducers, with hot module replacement of reducers", () =>
		expect(
			buildStore,
			"when called with",
			[mockRoutes, mockReducers],
			"to satisfy",
			{
				subscribe: expect.it("to be a function"),
				dispatch: expect.it("to be a function"),
				getState: expect.it("to be a function"),
			},
		));

	describe("functionality", () => {
		let store;
		beforeEach(() => {
			global.SUPPORTED_LOCALES = ["en-US", "fr"];
			store = buildStore(mockRoutes, mockReducers);
		});

		describe("getState", () => {
			it("gets a state Map of the right shape", () =>
				expect(
					store.getState,
					"when called",
					"to satisfy",
					Immutable.fromJS({
						router: {
							pathname: "/",
							search: "",
							hash: "",
							key: undefined,
							state: undefined,
							query: {},
							routes: { "/": { title: "test" } },
							queue: [],
						},
						locale: {
							locale: "en-US",
							supportedLocales: ["en-US", "fr"],
						},
						requests: {},
						view: {},
						test: false,
					}),
				));
		});

		describe("dispatch", () => {
			it("updates state when called with an action", () =>
				expect(store.dispatch, "when called with", [{ type: "TOGGLE" }]).then(
					() => expect(store.getState(), "to satisfy", { test: true }),
				));
		});

		describe("subscribe", () => {
			let handler;
			beforeEach(() => {
				handler = sinon.spy().named("subscribeHandler");
			});
			it("sets a callback for state updates", () =>
				expect(store.subscribe, "when called with", [handler])
					.then(() => store.dispatch({ type: "TOGGLE" }))
					.then(() => expect(handler, "was called")));
		});
	});
});
