import Immutable from "immutable";
import { defaultAppId } from "./settings";

describe("defaultAppId", () => {
	it("gets the id of the default app", () =>
		expect(
			defaultAppId,
			"called with",
			[Immutable.fromJS({ settings: { defaultApp: 12 } })],
			"to equal",
			12,
		));
});
