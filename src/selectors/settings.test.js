import Immutable from "immutable";
import { defaultAppId, defaultScopeSelector } from "./settings";

describe("defaultAppId", () => {
	it("gets the id of the default app", () =>
		expect(defaultAppId, "called with", [Immutable.fromJS({ settings: { defaultApp: 12 } })], "to equal", 12));

	it("gets the the default scope", () =>
		expect(
			defaultScopeSelector,
			"called with",
			[Immutable.fromJS({ settings: { defaultScope: "myPrecious" } })],
			"to equal",
			"myPrecious",
		));
});
