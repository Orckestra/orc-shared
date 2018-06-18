import Immutable from "immutable";
import {
	routeSelector,
	resultSelector,
	paramSelector,
	getCurrentScope,
	resetLastScope,
} from "./route";

describe("route selector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			router: {
				route: "/:stuff/named/things/:withParams",
			},
		});
	});

	it("gets the current matched route", () =>
		expect(
			routeSelector,
			"when called with",
			[state],
			"to equal",
			"/:stuff/named/things/:withParams",
		));
});

describe("result selector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			router: {
				result: {
					parent: {
						route: "/:stuff/named/things",
						parent: {
							route: "/:stuff/named",
							parent: {
								route: "/:stuff",
							},
						},
					},
				},
			},
		});
	});

	it("gets the result object for the route match", () =>
		expect(
			resultSelector,
			"when called with",
			[state],
			"to equal",
			Immutable.fromJS({
				parent: {
					route: "/:stuff/named/things",
					parent: {
						route: "/:stuff/named",
						parent: {
							route: "/:stuff",
						},
					},
				},
			}),
		));

	it("gets an empty object if no result", () => {
		state = state.deleteIn(["router", "result"]);
		return expect(
			resultSelector,
			"when called with",
			[state],
			"to equal",
			Immutable.Map(),
		);
	});
});

describe("param selector", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			router: {
				params: {
					foo: "bar",
					feep: "meep",
				},
			},
		});
	});

	it("gets the current match parameters", () =>
		expect(
			paramSelector,
			"when called with",
			[state],
			"to equal",
			Immutable.fromJS({
				foo: "bar",
				feep: "meep",
			}),
		));

	it("gets empty object if no parameters", () => {
		state = state.deleteIn(["router", "params"]);
		return expect(
			paramSelector,
			"when called with",
			[state],
			"to equal",
			Immutable.Map(),
		);
	});
});

describe("getCurrentScope", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			router: {
				params: {
					scope: "thing",
				},
			},
		});
	});
	afterEach(() => {
		resetLastScope();
	});

	it("gets the current scope, if one is set", () =>
		expect(getCurrentScope, "when called with", [state], "to be", "thing"));

	it("gets the last scope, if no scope set and previous scope is known", () => {
		getCurrentScope(state);
		state = state.deleteIn(["router", "params", "scope"]);
		return expect(
			getCurrentScope,
			"when called with",
			[state],
			"to be",
			"thing",
		);
	});

	it("gets the default scope, if no scope set and no previous known", () => {
		state = state.deleteIn(["router", "params", "scope"]);
		return expect(
			getCurrentScope,
			"when called with",
			[state],
			"to be",
			"Global",
		);
	});
});
