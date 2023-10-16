import Immutable from "immutable";
import { getScopeChangeInProgress } from "./scopeRouteState";

describe("getScopeChangeInProgress", () => {
	it("return the value from the store", () => {
		const state = Immutable.fromJS({
			scopeRouteState: {
				scopeChangeInProgress: true,
			},
		});
		return expect(getScopeChangeInProgress, "called with", [state], "to equal", true);
	});
});
