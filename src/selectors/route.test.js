import Immutable from "immutable";
import { selectLocation } from "./route";

describe("location selector", () => {
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
});
