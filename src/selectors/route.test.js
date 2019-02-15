import Immutable from "immutable";
import { selectLocation, selectPathname } from "./route";

describe("selectLocation", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			router: {
				location: { pathname: "/Scope/named/things/" },
			},
		});
	});

	it("gets the current matched route", () =>
		expect(
			selectLocation,
			"when called with",
			[state],
			"to equal",
			Immutable.fromJS({ pathname: "/Scope/named/things/" }),
		));

	it("handles missing information", () =>
		expect(
			selectLocation,
			"when called with",
			[state.deleteIn(["router", "location"])],
			"to equal",
			Immutable.Map(),
		));
});

describe("selectPathname", () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS({
			router: {
				location: { pathname: "/Scope/named/things/" },
			},
		});
	});

	it("gets the current matched route", () =>
		expect(
			selectPathname,
			"when called with",
			[state],
			"to equal",
			"/Scope/named/things/",
		));

	it("handles missing information", () =>
		expect(
			selectPathname,
			"when called with",
			[state.deleteIn(["router", "location"])],
			"to equal",
			"",
		));
});
